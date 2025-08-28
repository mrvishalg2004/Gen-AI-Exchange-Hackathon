import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import resumeParsingService from '../../../services/resumeParsingService';

const ResumeUploadStep = ({ formData, updateFormData, errors, onDataExtracted }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractionStatus, setExtractionStatus] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const fileInputRef = useRef(null);

  const acceptedFileTypes = ['.pdf', '.doc', '.docx', '.txt'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  const handleFileSelect = async (files) => {
    const file = files?.[0];
    if (!file) return;

    // Validate file type
    const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
    if (!acceptedFileTypes?.includes(fileExtension)) {
      updateFormData('resumeError', 'Please upload a PDF, DOC, DOCX, or TXT file');
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
    setExtractionStatus('Uploading file...');

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 50) {
          clearInterval(uploadInterval);
          return 50;
        }
        return prev + 10;
      });
    }, 200);

    try {
      updateFormData('resumeFile', file);
      
      // Start parsing process with file-type specific messaging
      const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
      if (fileExtension === '.pdf') {
        setExtractionStatus('Processing PDF file - extracting text from pages...');
      } else {
        setExtractionStatus('Analyzing resume content...');
      }
      setUploadProgress(60);
      
      const parseResult = await resumeParsingService.parseResume(file);
      
      setUploadProgress(90);
      
      if (parseResult.success) {
        setExtractionStatus('Extracting information with AI...');
        const profileData = resumeParsingService.convertToProfileFormat(parseResult.data);
        
        setParsedData(parseResult.data);
        setUploadProgress(100);
        setExtractionStatus('Resume parsed successfully!');
        
        // Show success and extracted data
        setTimeout(() => {
          setIsProcessing(false);
          
          // Callback to parent component to fill form data
          if (onDataExtracted) {
            onDataExtracted(profileData, parseResult.data);
          }
        }, 1000);
        
      } else {
        throw new Error(parseResult.error || 'Failed to parse resume');
      }
      
    } catch (error) {
      console.error('Resume processing error:', error);
      setUploadProgress(0);
      setIsProcessing(false);
      setExtractionStatus('');
      updateFormData('resumeError', error.message || 'Failed to process resume. Please try again.');
    }
  };

  const handleApplyExtractedData = () => {
    if (parsedData && onDataExtracted) {
      const profileData = resumeParsingService.convertToProfileFormat(parsedData);
      onDataExtracted(profileData, parsedData);
    }
    setParsedData(null);
    setExtractionStatus('');
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
            <p>Supported formats: PDF, DOC, DOCX, TXT</p>
            <p>Maximum file size: 5MB</p>
            <p className="text-xs mt-1">📄 PDF files are fully supported with AI-powered text extraction</p>
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
          {/* Upload Progress */}
          {isProcessing && (
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Processing Resume</p>
                  <p className="text-sm text-muted-foreground">{extractionStatus}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {uploadProgress}% Complete
                </p>
              </div>
            </div>
          )}

          {/* Extraction Results */}
          {parsedData && !isProcessing && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} color="white" />
                </div>
                <div>
                  <p className="font-medium text-green-800">Resume Parsed Successfully!</p>
                  <p className="text-sm text-green-600">Information extracted and ready to use</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {parsedData.personalInfo?.firstName && (
                    <div>
                      <span className="font-medium text-green-800">Name: </span>
                      <span className="text-green-700">
                        {parsedData.personalInfo.firstName} {parsedData.personalInfo.lastName}
                      </span>
                    </div>
                  )}
                  {parsedData.personalInfo?.email && (
                    <div>
                      <span className="font-medium text-green-800">Email: </span>
                      <span className="text-green-700">{parsedData.personalInfo.email}</span>
                    </div>
                  )}
                  {parsedData.experience?.length > 0 && (
                    <div>
                      <span className="font-medium text-green-800">Experience: </span>
                      <span className="text-green-700">{parsedData.experience.length} positions</span>
                    </div>
                  )}
                  {parsedData.skills?.technical?.length > 0 && (
                    <div>
                      <span className="font-medium text-green-800">Skills: </span>
                      <span className="text-green-700">{parsedData.skills.technical.length} technical skills</span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    onClick={handleApplyExtractedData}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Apply to Profile
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setParsedData(null)}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Info */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Benefits of Resume Upload</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Automatically populate your profile information</li>
              <li>• Extract skills and experience details</li>
              <li>• Save time in the profile setup process</li>
              <li>• Get more accurate career recommendations</li>
              <li>• Enhanced AI chat responses based on your background</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-3">
              Your resume is processed securely using AI. Data is only used to improve your experience.
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