import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExperienceStep = ({ formData, updateFormData, errors }) => {
  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'junior', label: 'Junior (2-4 years)' },
    { value: 'mid', label: 'Mid-Level (4-7 years)' },
    { value: 'senior', label: 'Senior (7-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' },
    { value: 'executive', label: 'Executive (15+ years)' }
  ];

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'nonprofit', label: 'Non-Profit' },
    { value: 'government', label: 'Government' },
    { value: 'startup', label: 'Startup' },
    { value: 'other', label: 'Other' }
  ];

  const employmentTypes = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' },
    { value: 'volunteer', label: 'Volunteer' }
  ];

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      industry: '',
      employmentType: 'full-time',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: ''
    };
    
    const currentExperience = formData?.experience || [];
    updateFormData('experience', [...currentExperience, newExperience]);
  };

  const updateExperience = (id, field, value) => {
    const currentExperience = formData?.experience || [];
    const updatedExperience = currentExperience?.map(exp => 
      exp?.id === id ? { ...exp, [field]: value } : exp
    );
    updateFormData('experience', updatedExperience);
  };

  const removeExperience = (id) => {
    const currentExperience = formData?.experience || [];
    const filteredExperience = currentExperience?.filter(exp => exp?.id !== id);
    updateFormData('experience', filteredExperience);
  };

  const experienceList = formData?.experience || [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Work Experience</h2>
        <p className="text-muted-foreground">Share your professional background to get more accurate recommendations</p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4">Overall Experience Level</h3>
        <Select
          label="How would you describe your overall experience level?"
          placeholder="Select your experience level"
          options={experienceLevels}
          value={formData?.overallExperience || ''}
          onChange={(value) => updateFormData('overallExperience', value)}
          required
        />
      </div>
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-foreground">Work History</h3>
          <Button variant="outline" onClick={addExperience} iconName="Plus" iconPosition="left" size="sm">
            Add Experience
          </Button>
        </div>

        {experienceList?.length === 0 && (
          <div className="text-center py-8 bg-muted/30 border border-dashed border-border rounded-lg">
            <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No work experience added yet</p>
            <p className="text-sm text-muted-foreground">Add your work history to get better career recommendations</p>
          </div>
        )}

        {experienceList?.map((experience, index) => (
          <div key={experience?.id} className="bg-card border border-border rounded-lg p-6 space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Experience #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience?.id)}
                iconName="Trash2"
                iconSize={16}
                className="text-error hover:text-error"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                type="text"
                placeholder="e.g., Software Developer"
                value={experience?.jobTitle}
                onChange={(e) => updateExperience(experience?.id, 'jobTitle', e?.target?.value)}
                required
              />

              <Input
                label="Company Name"
                type="text"
                placeholder="e.g., Tech Corp Inc."
                value={experience?.company}
                onChange={(e) => updateExperience(experience?.id, 'company', e?.target?.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Industry"
                placeholder="Select industry"
                options={industryOptions}
                value={experience?.industry}
                onChange={(value) => updateExperience(experience?.id, 'industry', value)}
                searchable
                required
              />

              <Select
                label="Employment Type"
                placeholder="Select employment type"
                options={employmentTypes}
                value={experience?.employmentType}
                onChange={(value) => updateExperience(experience?.id, 'employmentType', value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={experience?.startDate}
                onChange={(e) => updateExperience(experience?.id, 'startDate', e?.target?.value)}
                required
              />

              <div className="space-y-2">
                <Input
                  label="End Date"
                  type="date"
                  value={experience?.endDate}
                  onChange={(e) => updateExperience(experience?.id, 'endDate', e?.target?.value)}
                  disabled={experience?.isCurrentJob}
                />
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={experience?.isCurrentJob}
                    onChange={(e) => {
                      updateExperience(experience?.id, 'isCurrentJob', e?.target?.checked);
                      if (e?.target?.checked) {
                        updateExperience(experience?.id, 'endDate', '');
                      }
                    }}
                    className="rounded border-border"
                  />
                  <span className="text-muted-foreground">I currently work here</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Description (Optional)
              </label>
              <textarea
                placeholder="Describe your key responsibilities and achievements..."
                value={experience?.description}
                onChange={(e) => updateExperience(experience?.id, 'description', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-2">How Experience Shapes Recommendations</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Your experience level determines appropriate career advancement paths</li>
          <li>• Industry background helps suggest relevant career transitions</li>
          <li>• Job history reveals transferable skills for new opportunities</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperienceStep;