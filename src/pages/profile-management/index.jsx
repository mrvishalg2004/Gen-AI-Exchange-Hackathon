import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ChatWidget from '../../components/ui/ChatWidget';
import ProfileProgress from '../../components/ui/ProfileProgress';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PersonalInfoTab from './components/PersonalInfoTab';
import SkillsExperienceTab from './components/SkillsExperienceTab';
import CareerPreferencesTab from './components/CareerPreferencesTab';
import AccountSettingsTab from './components/AccountSettingsTab';
import ResumeUploadSection from './components/ResumeUploadSection';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    location: 'san-francisco',
    dateOfBirth: '1995-03-15',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    githubUrl: 'https://github.com/sarahjohnson',
    portfolioUrl: 'https://sarahjohnson.dev',
    bio: `Passionate full-stack developer with 4+ years of experience building scalable web applications. 
Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.`,
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    lastUpdated: new Date(2025, 7, 25),
    
    skills: [
      { id: 1, name: 'JavaScript', level: 'advanced', category: 'technical', verified: true, addedDate: new Date(2025, 6, 15) },
      { id: 2, name: 'React', level: 'advanced', category: 'technical', verified: true, addedDate: new Date(2025, 6, 15) },
      { id: 3, name: 'Node.js', level: 'intermediate', category: 'technical', verified: false, addedDate: new Date(2025, 6, 20) },
      { id: 4, name: 'Python', level: 'intermediate', category: 'technical', verified: false, addedDate: new Date(2025, 7, 1) },
      { id: 5, name: 'Team Leadership', level: 'intermediate', category: 'soft', verified: false, addedDate: new Date(2025, 7, 10) }
    ],
    
    experiences: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechFlow Solutions',
        startDate: '2023-01-15',
        endDate: '',
        current: true,
        description: `Leading the development of customer-facing web applications using React and TypeScript. 
Collaborated with design and backend teams to deliver high-quality user experiences. 
Mentored junior developers and established coding standards for the frontend team.`,
        addedDate: new Date(2025, 6, 15)
      },
      {
        id: 2,
        title: 'Frontend Developer',
        company: 'Digital Innovations Inc.',
        startDate: '2021-06-01',
        endDate: '2022-12-31',
        current: false,
        description: `Developed responsive web applications using React and modern JavaScript. 
Worked closely with UX designers to implement pixel-perfect designs. 
Optimized application performance and improved loading times by 40%.`,
        addedDate: new Date(2025, 6, 15)
      }
    ],
    
    certifications: [
      { id: 1, name: 'AWS Certified Developer Associate', uploadDate: new Date(2025, 5, 10), verified: true },
      { id: 2, name: 'React Professional Certificate', uploadDate: new Date(2025, 4, 20), verified: true }
    ],
    
    salaryExpectation: { min: '85000', max: '120000', currency: 'USD' },
    workType: ['full-time', 'contract'],
    industries: ['technology', 'finance', 'healthcare'],
    jobLevels: ['senior', 'lead'],
    locationPreference: 'hybrid',
    relocationWillingness: false,
    travelWillingness: 'minimal',
    companySize: ['medium', 'large'],
    benefits: ['health-insurance', 'retirement-401k', 'flexible-hours', 'remote-work', 'professional-development'],
    careerGoals: `Short-term: Advance to a senior technical leadership role where I can mentor teams and drive architectural decisions.
Long-term: Transition into a CTO role at a growing tech company, focusing on building scalable products and leading engineering teams.`,
    availability: 'immediately',
    
    notifications: {
      email: true,
      push: true,
      sms: false,
      careerUpdates: true,
      learningReminders: true,
      jobAlerts: false
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analyticsTracking: true,
      thirdPartyIntegrations: false
    },
    language: 'en',
    timezone: 'America/Los_Angeles',
    theme: 'system',
    
    currentResume: {
      fileName: 'Sarah_Johnson_Resume_2025.pdf',
      uploadDate: new Date(2025, 6, 10)
    }
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'skills', label: 'Skills & Experience', icon: 'Briefcase' },
    { id: 'preferences', label: 'Career Preferences', icon: 'Target' },
    { id: 'resume', label: 'Resume Upload', icon: 'FileText' },
    { id: 'settings', label: 'Account Settings', icon: 'Settings' }
  ];

  // Calculate profile completion percentage
  const calculateCompletionPercentage = () => {
    let completed = 0;
    let total = 10;

    if (profileData?.firstName && profileData?.lastName) completed++;
    if (profileData?.email) completed++;
    if (profileData?.phone) completed++;
    if (profileData?.location) completed++;
    if (profileData?.bio && profileData?.bio?.length > 50) completed++;
    if (profileData?.skills && profileData?.skills?.length >= 5) completed++;
    if (profileData?.experiences && profileData?.experiences?.length >= 1) completed++;
    if (profileData?.salaryExpectation?.min && profileData?.salaryExpectation?.max) completed++;
    if (profileData?.industries && profileData?.industries?.length >= 2) completed++;
    if (profileData?.currentResume) completed++;

    return Math.round((completed / total) * 100);
  };

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave this tab?');
      if (!confirmLeave) return;
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
  };

  const handleDataUpdate = (newData) => {
    setProfileData(prev => ({
      ...prev,
      ...newData,
      lastUpdated: new Date()
    }));
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
  };

  const handleResumeUpdate = (resumeData) => {
    setProfileData(prev => ({
      ...prev,
      currentResume: {
        fileName: resumeData?.fileName,
        uploadDate: resumeData?.uploadDate
      }
    }));
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (hasUnsavedChanges) {
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [hasUnsavedChanges]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoTab
            profileData={profileData}
            onUpdate={handleDataUpdate}
          />
        );
      case 'skills':
        return (
          <SkillsExperienceTab
            profileData={profileData}
            onUpdate={handleDataUpdate}
          />
        );
      case 'preferences':
        return (
          <CareerPreferencesTab
            profileData={profileData}
            onUpdate={handleDataUpdate}
          />
        );
      case 'resume':
        return (
          <ResumeUploadSection
            currentResume={profileData?.currentResume}
            onResumeUpdate={handleResumeUpdate}
          />
        );
      case 'settings':
        return (
          <AccountSettingsTab
            profileData={profileData}
            onUpdate={handleDataUpdate}
          />
        );
      default:
        return null;
    }
  };

  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <BreadcrumbTrail className="mb-4" />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Profile Management</h1>
              <p className="text-muted-foreground">
                Keep your profile updated to get the most accurate career recommendations
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <ProfileProgress 
                completionPercentage={completionPercentage}
                showInHeader={true}
              />
              <Link to="/career-dashboard">
                <Button variant="outline" iconName="ArrowLeft" iconPosition="left">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile Completion Alert */}
          {completionPercentage < 80 && (
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your profile is {completionPercentage}% complete. Add more information to get better career recommendations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Auto-save Status */}
          {hasUnsavedChanges && (
            <div className="bg-muted border border-border rounded-lg p-3 mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Unsaved changes - Auto-save in progress...
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Tab Navigation */}
            <div className="hidden lg:block">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <h3 className="font-medium text-foreground mb-3">Profile Sections</h3>
                <nav className="space-y-1">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-soft text-left ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <ProfileProgress completionPercentage={completionPercentage} />
                </div>
              </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="lg:hidden mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">Profile Sections</h3>
                <div className="grid grid-cols-2 gap-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`flex flex-col items-center space-y-1 p-3 text-xs rounded-md transition-soft ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span className="text-center leading-tight">{tab?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="animate-fade-in">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
};

export default ProfileManagement;