import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CareerPreferencesTab = ({ profileData, onUpdate }) => {
  const [preferences, setPreferences] = useState({
    salaryExpectation: profileData?.salaryExpectation || { min: '', max: '', currency: 'USD' },
    workType: profileData?.workType || [],
    industries: profileData?.industries || [],
    jobLevels: profileData?.jobLevels || [],
    locationPreference: profileData?.locationPreference || 'hybrid',
    relocationWillingness: profileData?.relocationWillingness || false,
    travelWillingness: profileData?.travelWillingness || 'none',
    companySize: profileData?.companySize || [],
    benefits: profileData?.benefits || [],
    careerGoals: profileData?.careerGoals || '',
    availability: profileData?.availability || 'immediately'
  });

  const workTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'nonprofit', label: 'Non-profit' },
    { value: 'government', label: 'Government' }
  ];

  const jobLevelOptions = [
    { value: 'entry', label: 'Entry Level' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid Level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead/Principal' },
    { value: 'manager', label: 'Manager' },
    { value: 'director', label: 'Director' },
    { value: 'executive', label: 'Executive' }
  ];

  const locationOptions = [
    { value: 'remote', label: 'Remote Only' },
    { value: 'onsite', label: 'On-site Only' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const travelOptions = [
    { value: 'none', label: 'No Travel' },
    { value: 'minimal', label: 'Minimal (0-25%)' },
    { value: 'moderate', label: 'Moderate (25-50%)' },
    { value: 'frequent', label: 'Frequent (50%+)' }
  ];

  const companySizeOptions = [
    { value: 'startup', label: 'Startup (1-50)' },
    { value: 'small', label: 'Small (51-200)' },
    { value: 'medium', label: 'Medium (201-1000)' },
    { value: 'large', label: 'Large (1000+)' },
    { value: 'enterprise', label: 'Enterprise (5000+)' }
  ];

  const benefitOptions = [
    { value: 'health-insurance', label: 'Health Insurance' },
    { value: 'dental-vision', label: 'Dental & Vision' },
    { value: 'retirement-401k', label: '401(k) / Retirement Plan' },
    { value: 'flexible-hours', label: 'Flexible Working Hours' },
    { value: 'remote-work', label: 'Remote Work Options' },
    { value: 'professional-development', label: 'Professional Development' },
    { value: 'paid-time-off', label: 'Generous PTO' },
    { value: 'parental-leave', label: 'Parental Leave' },
    { value: 'stock-options', label: 'Stock Options/Equity' },
    { value: 'wellness-programs', label: 'Wellness Programs' }
  ];

  const availabilityOptions = [
    { value: 'immediately', label: 'Immediately' },
    { value: '2-weeks', label: 'Within 2 weeks' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '2-months', label: 'Within 2 months' },
    { value: '3-months', label: 'Within 3+ months' }
  ];

  const handleSalaryChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      salaryExpectation: {
        ...prev?.salaryExpectation,
        [field]: value
      }
    }));
  };

  const handleMultiSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: prev?.[field]?.includes(value)
        ? prev?.[field]?.filter(item => item !== value)
        : [...prev?.[field], value]
    }));
  };

  const handleSingleSelectChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate(preferences);
  };

  const formatSalaryRange = () => {
    const { min, max, currency } = preferences?.salaryExpectation;
    if (!min && !max) return 'Not specified';
    if (min && max) return `$${parseInt(min)?.toLocaleString()} - $${parseInt(max)?.toLocaleString()}`;
    if (min) return `$${parseInt(min)?.toLocaleString()}+`;
    return 'Not specified';
  };

  return (
    <div className="space-y-6">
      {/* Salary Expectations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Salary Expectations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            label="Minimum Salary"
            type="number"
            value={preferences?.salaryExpectation?.min}
            onChange={(e) => handleSalaryChange('min', e?.target?.value)}
            placeholder="50000"
          />
          <Input
            label="Maximum Salary"
            type="number"
            value={preferences?.salaryExpectation?.max}
            onChange={(e) => handleSalaryChange('max', e?.target?.value)}
            placeholder="80000"
          />
          <Select
            label="Currency"
            options={[
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
              { value: 'GBP', label: 'GBP (£)' }
            ]}
            value={preferences?.salaryExpectation?.currency}
            onChange={(value) => handleSalaryChange('currency', value)}
          />
        </div>
        
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">
              Expected Range: {formatSalaryRange()}
            </span>
          </div>
        </div>
      </div>
      {/* Work Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Work Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Work Type (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {workTypeOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={preferences?.workType?.includes(option?.value)}
                  onChange={() => handleMultiSelectChange('workType', option?.value)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Location Preference"
              options={locationOptions}
              value={preferences?.locationPreference}
              onChange={(value) => handleSingleSelectChange('locationPreference', value)}
            />
            
            <Select
              label="Travel Willingness"
              options={travelOptions}
              value={preferences?.travelWillingness}
              onChange={(value) => handleSingleSelectChange('travelWillingness', value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              label="Open to relocation"
              checked={preferences?.relocationWillingness}
              onChange={(e) => handleSingleSelectChange('relocationWillingness', e?.target?.checked)}
            />
          </div>

          <Select
            label="Availability"
            options={availabilityOptions}
            value={preferences?.availability}
            onChange={(value) => handleSingleSelectChange('availability', value)}
          />
        </div>
      </div>
      {/* Industry & Role Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Industry & Role Preferences</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Preferred Industries
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {industryOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={preferences?.industries?.includes(option?.value)}
                  onChange={() => handleMultiSelectChange('industries', option?.value)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Job Levels
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {jobLevelOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={preferences?.jobLevels?.includes(option?.value)}
                  onChange={() => handleMultiSelectChange('jobLevels', option?.value)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company Size Preference
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {companySizeOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={preferences?.companySize?.includes(option?.value)}
                  onChange={() => handleMultiSelectChange('companySize', option?.value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Benefits & Perks */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Important Benefits & Perks</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {benefitOptions?.map((option) => (
            <Checkbox
              key={option?.value}
              label={option?.label}
              checked={preferences?.benefits?.includes(option?.value)}
              onChange={() => handleMultiSelectChange('benefits', option?.value)}
            />
          ))}
        </div>
      </div>
      {/* Career Goals */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Career Goals</h3>
        
        <div className="space-y-2">
          <textarea
            value={preferences?.careerGoals}
            onChange={(e) => handleSingleSelectChange('careerGoals', e?.target?.value)}
            placeholder="Describe your short-term and long-term career goals..."
            rows={4}
            className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <p className="text-sm text-muted-foreground">
            Share your aspirations to help us provide better recommendations
          </p>
        </div>
      </div>
      {/* Preference Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">AI Recommendation Impact</h4>
            <p className="text-sm text-muted-foreground">
              Your preferences help our AI provide more accurate career matches and learning recommendations. 
              The more detailed your preferences, the better we can tailor suggestions to your goals.
            </p>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          iconName="Save"
          iconPosition="left"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default CareerPreferencesTab;