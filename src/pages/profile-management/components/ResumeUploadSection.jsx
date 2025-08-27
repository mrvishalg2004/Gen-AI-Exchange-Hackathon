import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResumeUploadSection = ({ currentResume, onResumeUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parseResults, setParseResults] = useState(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const resumeFile = files?.find(file => 
      file?.type === 'application/pdf' || 
      file?.type === 'application/msword' || 
      file?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (resumeFile) {
      handleFileUpload(resumeFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    if (file?.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate parsing after upload
    setTimeout(() => {
      setUploadProgress(100);
      
      // Mock parsing results
      const mockParseResults = {
        fileName: file?.name,
        uploadDate: new Date(),
        extractedData: {
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1 (555) 123-4567",
          skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
          experience: [
            {
              title: "Senior Software Developer",
              company: "Tech Solutions Inc.",
              duration: "2021 - Present",
              description: "Led development of web applications using React and Node.js"
            },
            {
              title: "Software Developer",
              company: "Digital Innovations",
              duration: "2019 - 2021",
              description: "Developed and maintained multiple client projects"
            }
          ],
          education: [
            {
              degree: "Bachelor of Science in Computer Science",
              institution: "University of Technology",
              year: "2019"
            }
          ]
        },
        changes: [
          "Updated contact information",
          "Added 3 new skills",
          "Updated current job title",
          "Added recent project experience"
        ]
      };

      setParseResults(mockParseResults);
      setIsUploading(false);
      onResumeUpdate(mockParseResults);
    }, 2000);
  };

  const handleApplyChanges = () => {
    if (parseResults) {
      // Apply the parsed data to profile
      alert('Resume data has been applied to your profile successfully!');
      setParseResults(null);
    }
  };

  const handleDiscardChanges = () => {
    setParseResults(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Resume Upload</h3>
        {currentResume && (
          <span className="text-sm text-muted-foreground">
            Last updated: {currentResume?.uploadDate?.toLocaleDateString()}
          </span>
        )}
      </div>
      {/* Current Resume Display */}
      {currentResume && !parseResults && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">{currentResume?.fileName}</p>
                <p className="text-sm text-muted-foreground">
                  Uploaded {currentResume?.uploadDate?.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Eye">
                View
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Upload Area */}
      {!isUploading && !parseResults && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Icon name="Upload" size={32} className="mx-auto mb-4 text-muted-foreground" />
          <h4 className="text-lg font-medium text-foreground mb-2">
            {currentResume ? 'Upload New Resume' : 'Upload Your Resume'}
          </h4>
          <p className="text-muted-foreground mb-4">
            Drag and drop your resume here, or click to browse
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Supports PDF, DOC, and DOCX files up to 10MB
          </p>
          
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label htmlFor="resume-upload">
            <Button variant="default" iconName="Upload" iconPosition="left" asChild>
              <span className="cursor-pointer">Choose File</span>
            </Button>
          </label>
        </div>
      )}
      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Icon name="Loader2" size={20} className="text-primary animate-spin" />
            <span className="text-foreground">
              {uploadProgress < 90 ? 'Uploading...' : 'Parsing resume...'}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {uploadProgress < 90 
              ? `Uploading... ${uploadProgress}%`
              : 'Analyzing resume content and extracting information...'
            }
          </p>
        </div>
      )}
      {/* Parse Results */}
      {parseResults && (
        <div className="space-y-4">
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <h4 className="font-medium text-foreground">Resume Parsed Successfully!</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              We've extracted the following information from your resume:
            </p>
          </div>

          {/* Extracted Data Preview */}
          <div className="bg-background border border-border rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Extracted Information</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name:</p>
                <p className="font-medium text-foreground">{parseResults?.extractedData?.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email:</p>
                <p className="font-medium text-foreground">{parseResults?.extractedData?.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone:</p>
                <p className="font-medium text-foreground">{parseResults?.extractedData?.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Skills Found:</p>
                <p className="font-medium text-foreground">{parseResults?.extractedData?.skills?.length} skills</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-muted-foreground mb-2">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {parseResults?.extractedData?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Changes Summary */}
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-2">Profile Changes</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              {parseResults?.changes?.map((change, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="ArrowRight" size={12} />
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={handleApplyChanges}
              iconName="Check"
              iconPosition="left"
              className="flex-1"
            >
              Apply Changes to Profile
            </Button>
            <Button
              variant="outline"
              onClick={handleDiscardChanges}
              iconName="X"
              iconPosition="left"
              className="flex-1"
            >
              Discard Changes
            </Button>
          </div>
        </div>
      )}
      {/* Tips */}
      <div className="mt-6 bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <h5 className="font-medium text-foreground mb-1">Tips for Better Parsing</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use a standard resume format with clear sections</li>
              <li>• Include contact information at the top</li>
              <li>• List skills in a dedicated section</li>
              <li>• Use bullet points for experience descriptions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadSection;