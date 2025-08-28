import geminiService from './geminiService';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker - using the matching version 3.11.174
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

class ResumeParsingService {
  constructor() {
    this.supportedFormats = ['pdf', 'doc', 'docx', 'txt'];
  }

  /**
   * Parse resume file and extract structured information
   * @param {File} resumeFile - The uploaded resume file
   * @returns {Promise<Object>} Parsed resume data
   */
  async parseResume(resumeFile) {
    try {
      console.log('🔍 Starting resume parsing for:', resumeFile.name);
      
      // Validate file type
      const fileExtension = this.getFileExtension(resumeFile.name);
      if (!this.supportedFormats.includes(fileExtension)) {
        throw new Error(`Unsupported file format: ${fileExtension}. Supported formats: ${this.supportedFormats.join(', ')}`);
      }

      // Extract text from file
      const resumeText = await this.extractTextFromFile(resumeFile);
      
      if (!resumeText || resumeText.trim().length < 50) {
        throw new Error('Unable to extract sufficient text from resume. Please ensure the file is readable.');
      }

      console.log('📄 Extracted resume text length:', resumeText.length);

      // Use Gemini AI to parse and structure the resume data
      const structuredData = await this.parseWithAI(resumeText);
      
      console.log('✅ Resume parsing completed successfully');
      return {
        success: true,
        data: structuredData,
        originalText: resumeText,
        fileName: resumeFile.name,
        parsedAt: new Date()
      };

    } catch (error) {
      console.error('❌ Resume parsing error:', error);
      return {
        success: false,
        error: error.message,
        fileName: resumeFile.name
      };
    }
  }

  /**
   * Extract text content from various file formats
   * @param {File} file - The uploaded file
   * @returns {Promise<string>} Extracted text content
   */
  extractTextFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const extension = this.getFileExtension(file.name);
          
          switch (extension) {
            case 'txt':
              resolve(event.target.result);
              break;
            case 'pdf':
              try {
                const text = await this.extractTextFromPDF(event.target.result);
                resolve(text);
              } catch (pdfError) {
                reject(new Error(`PDF parsing failed: ${pdfError.message}. Please try converting to .txt format.`));
              }
              break;
            case 'doc':
            case 'docx':
              // For Word documents, still limited but with better error message
              reject(new Error('Word document parsing is not yet supported. Please convert your resume to .txt or .pdf format.'));
              break;
            default:
              reject(new Error(`Unsupported file format: ${extension}`));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (this.getFileExtension(file.name) === 'txt') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  }

  /**
   * Extract text from PDF using PDF.js
   * @param {ArrayBuffer} pdfData - PDF file data
   * @returns {Promise<string>} Extracted text
   */
  async extractTextFromPDF(pdfData) {
    try {
      console.log('📄 Starting PDF text extraction...');
      
      // Load the PDF document
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const numPages = pdf.numPages;
      console.log(`📑 PDF has ${numPages} pages`);
      
      let fullText = '';
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Combine text items into a string
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ');
        
        fullText += pageText + '\n';
        console.log(`📄 Extracted text from page ${pageNum}: ${pageText.length} characters`);
      }
      
      console.log(`✅ PDF text extraction complete. Total characters: ${fullText.length}`);
      
      if (fullText.trim().length === 0) {
        throw new Error('No readable text found in PDF. The file may be image-based or corrupted.');
      }
      
      return fullText.trim();
    } catch (error) {
      console.error('❌ PDF extraction error:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }

  /**
   * Use Gemini AI to parse resume text into structured data
   * @param {string} resumeText - Raw resume text
   * @returns {Promise<Object>} Structured resume data
   */
  async parseWithAI(resumeText) {
    const prompt = `Please analyze this resume and extract information into a structured JSON format. 
    
    Resume Text:
    ${resumeText}
    
    Extract and organize the information into the following structure (return ONLY valid JSON, no additional text):
    
    {
      "personalInfo": {
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
        "location": {
          "city": "",
          "country": ""
        },
        "linkedIn": "",
        "website": ""
      },
      "education": [
        {
          "degree": "",
          "major": "",
          "institution": "",
          "graduationYear": "",
          "gpa": "",
          "achievements": []
        }
      ],
      "experience": [
        {
          "title": "",
          "company": "",
          "location": "",
          "startDate": "",
          "endDate": "",
          "description": "",
          "responsibilities": [],
          "achievements": []
        }
      ],
      "skills": {
        "technical": [],
        "soft": [],
        "tools": [],
        "languages": [],
        "certifications": []
      },
      "interests": [],
      "summary": "",
      "overallExperience": "",
      "careerHighlights": []
    }
    
    Instructions:
    - Extract as much relevant information as possible
    - For missing information, use empty strings or empty arrays
    - Categorize skills appropriately (technical, soft skills, tools/software)
    - Calculate overall experience based on work history
    - Include any certifications, awards, or notable achievements
    - For dates, use formats like "2020-2023" or "Jan 2020 - Present"
    - Return only the JSON object, no markdown or additional formatting`;

    try {
      const response = await geminiService.generateCareerAdvice(prompt);
      
      if (!response.success) {
        throw new Error('Failed to parse resume with AI: ' + response.error);
      }

      // Try to extract JSON from the response
      let jsonString = response.content;
      
      // Remove any markdown code blocks
      jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
      
      // Find JSON object boundaries
      const jsonStart = jsonString.indexOf('{');
      const jsonEnd = jsonString.lastIndexOf('}') + 1;
      
      if (jsonStart === -1 || jsonEnd === 0) {
        throw new Error('No valid JSON found in AI response');
      }
      
      jsonString = jsonString.substring(jsonStart, jsonEnd);
      
      const parsedData = JSON.parse(jsonString);
      
      // Validate and clean the parsed data
      return this.validateAndCleanData(parsedData);
      
    } catch (error) {
      console.error('AI parsing error:', error);
      
      // Fallback: Try to extract basic information with regex
      return this.extractBasicInfo(resumeText);
    }
  }

  /**
   * Validate and clean parsed data
   * @param {Object} data - Parsed resume data
   * @returns {Object} Validated and cleaned data
   */
  validateAndCleanData(data) {
    // Ensure required structure exists
    const cleanData = {
      personalInfo: data.personalInfo || {},
      education: Array.isArray(data.education) ? data.education : [],
      experience: Array.isArray(data.experience) ? data.experience : [],
      skills: data.skills || { technical: [], soft: [], tools: [], languages: [], certifications: [] },
      interests: Array.isArray(data.interests) ? data.interests : [],
      summary: data.summary || '',
      overallExperience: data.overallExperience || '',
      careerHighlights: Array.isArray(data.careerHighlights) ? data.careerHighlights : []
    };

    // Clean up arrays to remove empty strings
    cleanData.skills.technical = cleanData.skills.technical.filter(skill => skill && skill.trim());
    cleanData.skills.soft = cleanData.skills.soft.filter(skill => skill && skill.trim());
    cleanData.skills.tools = cleanData.skills.tools.filter(skill => skill && skill.trim());
    cleanData.interests = cleanData.interests.filter(interest => interest && interest.trim());

    return cleanData;
  }

  /**
   * Fallback method to extract basic information using regex
   * @param {string} text - Resume text
   * @returns {Object} Basic extracted information
   */
  extractBasicInfo(text) {
    console.log('📋 Using fallback regex extraction');
    
    // Basic regex patterns
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /(?:\+1[-.\s]?)?(?:\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4}/g;
    
    // Extract basic information
    const emails = text.match(emailRegex) || [];
    const phones = text.match(phoneRegex) || [];
    
    // Simple skill extraction (look for common technical terms)
    const commonTechSkills = [
      'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS', 'SQL', 
      'Git', 'Docker', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'TypeScript',
      'Vue.js', 'Angular', 'Express', 'Django', 'Flask', 'Spring', 'MySQL'
    ];
    
    const foundSkills = commonTechSkills.filter(skill => 
      text.toLowerCase().includes(skill.toLowerCase())
    );

    return {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: emails[0] || '',
        phone: phones[0] || '',
        location: { city: '', country: '' }
      },
      education: [],
      experience: [],
      skills: {
        technical: foundSkills,
        soft: [],
        tools: [],
        languages: [],
        certifications: []
      },
      interests: [],
      summary: text.substring(0, 200) + '...',
      overallExperience: '',
      careerHighlights: []
    };
  }

  /**
   * Get file extension from filename
   * @param {string} filename - File name
   * @returns {string} File extension
   */
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  /**
   * Convert parsed resume data to profile form format
   * @param {Object} resumeData - Parsed resume data
   * @returns {Object} Profile form data
   */
  convertToProfileFormat(resumeData) {
    const { personalInfo, education, experience, skills, interests } = resumeData;
    
    return {
      // Personal Information
      firstName: personalInfo.firstName || '',
      lastName: personalInfo.lastName || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
      city: personalInfo.location?.city || '',
      country: personalInfo.location?.country || '',
      
      // Education
      education: education.map(edu => ({
        degree: edu.degree || '',
        major: edu.major || '',
        institution: edu.institution || '',
        graduationYear: edu.graduationYear || '',
        gpa: edu.gpa || '',
        achievements: edu.achievements || []
      })),
      
      // Experience
      overallExperience: resumeData.overallExperience || '',
      experience: experience.map(exp => ({
        title: exp.title || '',
        company: exp.company || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        description: exp.description || '',
        responsibilities: exp.responsibilities || [],
        achievements: exp.achievements || []
      })),
      
      // Skills
      skills: {
        technical: skills.technical || [],
        soft: skills.soft || [],
        tools: skills.tools || [],
        industry: [] // We can categorize some technical skills as industry-specific
      },
      
      // Interests & Goals (derived from resume)
      interests: interests || [],
      workEnvironmentPreferences: [],
      careerGoals: resumeData.careerHighlights || [],
      
      // Additional data for chat context
      resumeSummary: resumeData.summary || '',
      careerHighlights: resumeData.careerHighlights || [],
      certifications: skills.certifications || [],
      languages: skills.languages || []
    };
  }
}

// Export singleton instance
const resumeParsingService = new ResumeParsingService();
export default resumeParsingService;
