import React, { useState } from 'react';
import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';

const InterestsStep = ({ formData, updateFormData, errors }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const interestCategories = {
    'Technology': [
      'Artificial Intelligence', 'Machine Learning', 'Web Development', 'Mobile Development',
      'Data Science', 'Cybersecurity', 'Cloud Computing', 'DevOps', 'Blockchain',
      'IoT', 'Robotics', 'Game Development', 'AR/VR', 'Software Architecture'
    ],
    'Business & Finance': [
      'Entrepreneurship', 'Investment', 'Marketing', 'Sales', 'Consulting',
      'Project Management', 'Business Strategy', 'Financial Analysis', 'E-commerce',
      'Digital Marketing', 'Brand Management', 'Operations', 'Supply Chain'
    ],
    'Creative & Design': [
      'Graphic Design', 'UX/UI Design', 'Photography', 'Video Production',
      'Content Creation', 'Writing', 'Animation', 'Fashion Design', 'Interior Design',
      'Music Production', 'Digital Art', 'Branding', 'Illustration'
    ],
    'Healthcare & Science': [
      'Medicine', 'Nursing', 'Research', 'Biotechnology', 'Psychology',
      'Public Health', 'Pharmacy', 'Physical Therapy', 'Mental Health',
      'Environmental Science', 'Chemistry', 'Biology', 'Genetics'
    ],
    'Education & Social': [
      'Teaching', 'Training', 'Curriculum Development', 'Educational Technology',
      'Social Work', 'Non-profit', 'Community Development', 'Public Policy',
      'Human Resources', 'Counseling', 'Child Development', 'Adult Education'
    ],
    'Engineering & Manufacturing': [
      'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering',
      'Chemical Engineering', 'Manufacturing', 'Quality Control', 'Product Design',
      'Automation', 'Renewable Energy', 'Construction', 'Aerospace', 'Automotive'
    ]
  };

  const workEnvironmentPreferences = [
    { id: 'remote', label: 'Remote Work', icon: 'Home' },
    { id: 'office', label: 'Office Environment', icon: 'Building' },
    { id: 'hybrid', label: 'Hybrid Work', icon: 'Shuffle' },
    { id: 'travel', label: 'Travel Opportunities', icon: 'Plane' },
    { id: 'flexible', label: 'Flexible Hours', icon: 'Clock' },
    { id: 'collaborative', label: 'Team Collaboration', icon: 'Users' },
    { id: 'independent', label: 'Independent Work', icon: 'User' },
    { id: 'fast-paced', label: 'Fast-Paced Environment', icon: 'Zap' }
  ];

  const careerGoals = [
    { id: 'leadership', label: 'Leadership Roles', icon: 'Crown' },
    { id: 'technical-expert', label: 'Technical Expertise', icon: 'Code' },
    { id: 'entrepreneurship', label: 'Start Own Business', icon: 'Rocket' },
    { id: 'work-life-balance', label: 'Work-Life Balance', icon: 'Scale' },
    { id: 'high-salary', label: 'High Compensation', icon: 'DollarSign' },
    { id: 'job-security', label: 'Job Security', icon: 'Shield' },
    { id: 'creativity', label: 'Creative Expression', icon: 'Palette' },
    { id: 'social-impact', label: 'Social Impact', icon: 'Heart' }
  ];

  const addInterest = (interest) => {
    const currentInterests = formData?.interests || [];
    if (!currentInterests?.includes(interest)) {
      updateFormData('interests', [...currentInterests, interest]);
    }
  };

  const removeInterest = (interest) => {
    const currentInterests = formData?.interests || [];
    updateFormData('interests', currentInterests?.filter(item => item !== interest));
  };

  const togglePreference = (preferenceId, type) => {
    const currentPreferences = formData?.[type] || [];
    const isSelected = currentPreferences?.includes(preferenceId);
    
    if (isSelected) {
      updateFormData(type, currentPreferences?.filter(item => item !== preferenceId));
    } else {
      updateFormData(type, [...currentPreferences, preferenceId]);
    }
  };

  const filteredInterests = Object.entries(interestCategories)?.reduce((acc, [category, interests]) => {
    const filtered = interests?.filter(interest =>
      interest?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
    if (filtered?.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  const selectedInterests = formData?.interests || [];
  const selectedWorkPreferences = formData?.workEnvironmentPreferences || [];
  const selectedCareerGoals = formData?.careerGoals || [];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Career Interests & Goals</h2>
        <p className="text-muted-foreground">Help us understand what motivates you and what you're passionate about</p>
      </div>
      {/* Career Interests */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Heart" size={20} />
          <span>Career Interests</span>
          <span className="text-sm text-muted-foreground">({selectedInterests?.length} selected)</span>
        </h3>

        <Input
          type="text"
          placeholder="Search interests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-6"
        />

        {selectedInterests?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Selected Interests:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedInterests?.map((interest) => (
                <div
                  key={interest}
                  className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <span>{interest}</span>
                  <button
                    onClick={() => removeInterest(interest)}
                    className="hover:text-primary/70"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(filteredInterests)?.map(([category, interests]) => (
            <div key={category}>
              <h4 className="font-medium text-foreground mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {interests?.map((interest) => {
                  const isSelected = selectedInterests?.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => isSelected ? removeInterest(interest) : addInterest(interest)}
                      className={`px-3 py-2 rounded-lg text-sm transition-soft ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Work Environment Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Building" size={20} />
          <span>Work Environment Preferences</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {workEnvironmentPreferences?.map((preference) => {
            const isSelected = selectedWorkPreferences?.includes(preference?.id);
            return (
              <button
                key={preference?.id}
                onClick={() => togglePreference(preference?.id, 'workEnvironmentPreferences')}
                className={`p-4 rounded-lg border transition-soft text-center ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                <Icon name={preference?.icon} size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">{preference?.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Career Goals */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Target" size={20} />
          <span>Career Goals</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {careerGoals?.map((goal) => {
            const isSelected = selectedCareerGoals?.includes(goal?.id);
            return (
              <button
                key={goal?.id}
                onClick={() => togglePreference(goal?.id, 'careerGoals')}
                className={`p-4 rounded-lg border transition-soft text-center ${
                  isSelected
                    ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                <Icon name={goal?.icon} size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">{goal?.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Salary Expectations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="DollarSign" size={20} />
          <span>Salary Expectations</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Minimum Expected Salary (USD)"
            type="number"
            placeholder="e.g., 50000"
            value={formData?.minSalary || ''}
            onChange={(e) => updateFormData('minSalary', e?.target?.value)}
          />
          
          <Input
            label="Desired Salary (USD)"
            type="number"
            placeholder="e.g., 75000"
            value={formData?.desiredSalary || ''}
            onChange={(e) => updateFormData('desiredSalary', e?.target?.value)}
          />
        </div>
        
        <p className="text-sm text-muted-foreground mt-3">
          Salary expectations help us recommend careers that match your financial goals
        </p>
      </div>
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-2">How This Helps Your Career Journey</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Your interests guide us to careers you'll find fulfilling</li>
          <li>• Work preferences help match you with suitable company cultures</li>
          <li>• Career goals ensure recommendations align with your aspirations</li>
          <li>• Salary expectations help filter opportunities within your range</li>
        </ul>
      </div>
    </div>
  );
};

export default InterestsStep;