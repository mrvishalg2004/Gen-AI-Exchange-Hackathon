import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResumeUploadStep = ({ formData, updateFormData, errors }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const acceptedFileTypes = ['.pdf', '.doc', '.docx'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = (files) => {
    const file = files?.[0];
    if (!file) return;

    // Validate file type
    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    if (!acceptedFileTypes?.includes(fileExtension)) {
      updateFormData('resumeError', 'Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size
    if (file?.size > maxFileSize) {
      updateFormData('resumeError', 'File size must be less than 5MB');
      return;
    }

    // Clear any previous errors
    updateFormData('resumeError', '');
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate file upload and processing
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          processResumeData(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    updateFormData('resumeFile', file);
  };

  const processResumeData = (file) => {
    // Simulate AI parsing of resume data
    setTimeout(() => {
      const mockParsedData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        city: 'San Francisco',
        skills: {
          technical: [
            { id: 1, name: 'JavaScript', level: 'advanced' },
            { id: 2, name: 'React', level: 'advanced' },
            { id: 3, name: 'Node.js', level: 'intermediate' },
            { id: 4, name: 'Python', level: 'intermediate' }
          ],
          soft: [
            { id: 5, name: 'Leadership', level: 'advanced' },
            { id: 6, name: 'Project Management', level: 'intermediate' }
          ]
        },
        experience: [
          {
            id: 1,
            jobTitle: 'Senior Software Developer',
            company: 'Tech Solutions Inc.',
            industry: 'technology',
            employmentType: 'full-time',
            startDate: '2021-03-01',
            endDate: '2024-08-01',
            isCurrentJob: false,
            description: `Led development of web applications using React and Node.js. Managed a team of 4 developers and collaborated with cross-functional teams to deliver high-quality software solutions.`
          }
        ],
        education: [
          {
            id: 1,
            level: 'bachelor',
            fieldOfStudy: 'computer-science',
            institution: 'University of California, Berkeley',
            graduationYear: '2020',
            gpa: '3.8/4.0'
          }
        ]
      };

      // Update form data with parsed information
      Object.entries(mockParsedData)?.forEach(([key, value]) => {
        if (key !== 'skills' && key !== 'experience' && key !== 'education') {
          updateFormData(key, value);
        }
      });

      // Update complex fields
      updateFormData('skills', mockParsedData?.skills);
      updateFormData('experience', mockParsedData?.experience);
      updateFormData('education', mockParsedData?.education);
      updateFormData('overallExperience', 'senior');

      setIsProcessing(false);
      updateFormData('resumeParsed', true);
    }, 1000);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileSelect(files);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileSelect(files);
  };

  const removeResume = () => {
    updateFormData('resumeFile', null);
    updateFormData('resumeParsed', false);
    updateFormData('resumeError', '');
    setUploadProgress(0);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Resume Upload (Optional)</h2>
        <p className="text-muted-foreground">Upload your resume to automatically populate your profile information</p>
      </div>
      {!formData?.resumeFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-soft ${
            isDragOver
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Drag and drop your resume here
          </h3>
          <p className="text-muted-foreground mb-4">
            or click to browse files
          </p>
          
          <Button
            variant="outline"
            onClick={() => fileInputRef?.current?.click()}
            iconName="FileText"
            iconPosition="left"
          >
            Choose File
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes?.join(',')}
            onChange={handleFileInputChange}
            className="hidden"
          />
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Supported formats: PDF, DOC, DOCX</p>
            <p>Maximum file size: 5MB</p>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{formData?.resumeFile?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(formData?.resumeFile?.size)}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={removeResume}
              iconName="Trash2"
              iconSize={16}
              className="text-error hover:text-error"
            />
          </div>

          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Processing resume...</span>
                <span className="text-primary font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {formData?.resumeParsed && (
            <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 text-success mb-2">
                <Icon name="CheckCircle" size={16} />
                <span className="font-medium">Resume processed successfully!</span>
              </div>
              <p className="text-sm text-success/80">
                We've extracted information from your resume and pre-filled your profile. 
                Please review and update the information in the following steps.
              </p>
            </div>
          )}
        </div>
      )}
      {formData?.resumeError && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="font-medium">{formData?.resumeError}</span>
          </div>
        </div>
      )}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-2">Benefits of Resume Upload</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Automatically populate your profile information</li>
          <li>• Extract skills and experience details</li>
          <li>• Save time in the profile setup process</li>
          <li>• Get more accurate career recommendations</li>
        </ul>
        <p className="text-xs text-muted-foreground mt-3">
          Your resume is processed securely and is not stored permanently on our servers.
        </p>
      </div>
      <div className="text-center">
        <Button variant="ghost" size="sm">
          Skip Resume Upload
        </Button>
      </div>
    </div>
  );
};

export default ResumeUploadStep;