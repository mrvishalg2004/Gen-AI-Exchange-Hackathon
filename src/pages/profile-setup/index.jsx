import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ChatWidget from '../../components/ui/ChatWidget';
import ProgressHeader from './components/ProgressHeader';
import PersonalInfoStep from './components/PersonalInfoStep';
import EducationStep from './components/EducationStep';
import ExperienceStep from './components/ExperienceStep';
import SkillsStep from './components/SkillsStep';
import InterestsStep from './components/InterestsStep';
import ResumeUploadStep from './components/ResumeUploadStep';
import StepNavigation from './components/StepNavigation';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    ageRange: '',
    country: '',
    city: '',
    
    // Education
    education: [],
    
    // Experience
    overallExperience: '',
    experience: [],
    
    // Skills
    skills: {
      technical: [],
      soft: [],
      tools: [],
      industry: []
    },
    
    // Interests & Goals
    interests: [],
    workEnvironmentPreferences: [],
    careerGoals: [],
    minSalary: '',
    desiredSalary: '',
    
    // Resume
    resumeFile: null,
    resumeParsed: false,
    resumeError: ''
  });
  
  const [errors, setErrors] = useState({});

  const stepTitles = [
    'Resume',
    'Personal',
    'Education',
    'Experience',
    'Skills',
    'Interests'
  ];

  const totalSteps = stepTitles?.length;

  useEffect(() => {
    // Check if user has already completed profile setup
    const profileCompleted = localStorage.getItem('profileCompleted');
    if (profileCompleted === 'true') {
      navigate('/career-dashboard');
    }
  }, [navigate]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Resume Upload - Optional
        break;
        
      case 2: // Personal Information
        if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.email?.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Email is invalid';
        if (!formData?.ageRange) newErrors.ageRange = 'Age range is required';
        if (!formData?.country) newErrors.country = 'Country is required';
        if (!formData?.city?.trim()) newErrors.city = 'City is required';
        break;
        
      case 3: // Education
        if (!formData?.education || formData?.education?.length === 0) {
          newErrors.education = 'At least one education entry is required';
        } else {
          formData?.education?.forEach((edu, index) => {
            if (!edu?.level) newErrors[`education_${index}_level`] = 'Education level is required';
            if (!edu?.fieldOfStudy) newErrors[`education_${index}_field`] = 'Field of study is required';
            if (!edu?.institution?.trim()) newErrors[`education_${index}_institution`] = 'Institution is required';
            if (!edu?.graduationYear) newErrors[`education_${index}_year`] = 'Graduation year is required';
          });
        }
        break;
        
      case 4: // Experience
        if (!formData?.overallExperience) newErrors.overallExperience = 'Overall experience level is required';
        break;
        
      case 5: // Skills
        const totalSkills = Object.values(formData?.skills || {})?.reduce(
          (total, categorySkills) => total + (categorySkills?.length || 0), 0
        );
        if (totalSkills < 3) newErrors.skills = 'Please add at least 3 skills';
        break;
        
      case 6: // Interests
        if (!formData?.interests || formData?.interests?.length < 3) {
          newErrors.interests = 'Please select at least 3 career interests';
        }
        if (!formData?.workEnvironmentPreferences || formData?.workEnvironmentPreferences?.length === 0) {
          newErrors.workEnvironmentPreferences = 'Please select at least one work environment preference';
        }
        if (!formData?.careerGoals || formData?.careerGoals?.length === 0) {
          newErrors.careerGoals = 'Please select at least one career goal';
        }
        break;
        
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = async () => {
    if (!validateStep(currentStep)) return;

    setIsCompleting(true);

    try {
      // Simulate API call to save profile data
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save completion status
      localStorage.setItem('profileCompleted', 'true');
      localStorage.setItem('profileData', JSON.stringify(formData));

      // Navigate to dashboard
      navigate('/career-dashboard');
    } catch (error) {
      console.error('Error completing profile:', error);
      setErrors({ general: 'Failed to complete profile. Please try again.' });
    } finally {
      setIsCompleting(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ResumeUploadStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <EducationStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <ExperienceStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <SkillsStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <InterestsStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    // Allow navigation without validation for resume step (optional)
    if (currentStep === 1) return false;
    
    // For other steps, check basic requirements
    switch (currentStep) {
      case 2:
        return !formData?.firstName || !formData?.lastName || !formData?.email || !formData?.country;
      case 3:
        return !formData?.education || formData?.education?.length === 0;
      case 4:
        return !formData?.overallExperience;
      case 5:
        const totalSkills = Object.values(formData?.skills || {})?.reduce(
          (total, categorySkills) => total + (categorySkills?.length || 0), 0
        );
        return totalSkills < 3;
      case 6:
        return !formData?.interests || formData?.interests?.length < 3 ||
               !formData?.workEnvironmentPreferences || formData?.workEnvironmentPreferences?.length === 0 ||
               !formData?.careerGoals || formData?.careerGoals?.length === 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <ProgressHeader
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
      />
      <main className="max-w-4xl mx-auto px-6 py-8 pb-24 md:pb-8">
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2 text-error">
              <span className="font-medium">{errors?.general}</span>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-lg shadow-soft">
          <div className="p-6 md:p-8">
            {renderCurrentStep()}
          </div>

          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <StepNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onComplete={handleComplete}
              isNextDisabled={isNextDisabled()}
              isCompleting={isCompleting}
            />
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
};

export default ProfileSetup;