import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EducationStep = ({ formData, updateFormData, errors }) => {
  const educationLevels = [
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD/Doctorate' },
    { value: 'bootcamp', label: 'Coding Bootcamp' },
    { value: 'certification', label: 'Professional Certification' },
    { value: 'other', label: 'Other' }
  ];

  const fieldOfStudyOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'design', label: 'Design' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'liberal-arts', label: 'Liberal Arts' },
    { value: 'other', label: 'Other' }
  ];

  const graduationYears = [];
  const currentYear = new Date()?.getFullYear();
  for (let year = currentYear + 4; year >= currentYear - 30; year--) {
    graduationYears?.push({ value: year?.toString(), label: year?.toString() });
  }

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      level: '',
      fieldOfStudy: '',
      institution: '',
      graduationYear: '',
      gpa: ''
    };
    
    const currentEducation = formData?.education || [];
    updateFormData('education', [...currentEducation, newEducation]);
  };

  const updateEducation = (id, field, value) => {
    const currentEducation = formData?.education || [];
    const updatedEducation = currentEducation?.map(edu => 
      edu?.id === id ? { ...edu, [field]: value } : edu
    );
    updateFormData('education', updatedEducation);
  };

  const removeEducation = (id) => {
    const currentEducation = formData?.education || [];
    const filteredEducation = currentEducation?.filter(edu => edu?.id !== id);
    updateFormData('education', filteredEducation);
  };

  const educationList = formData?.education || [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Education Background</h2>
        <p className="text-muted-foreground">Share your educational qualifications to help us understand your foundation</p>
      </div>
      {educationList?.length === 0 && (
        <div className="text-center py-8 bg-muted/30 border border-dashed border-border rounded-lg">
          <Icon name="GraduationCap" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No education entries added yet</p>
          <Button variant="outline" onClick={addEducation} iconName="Plus" iconPosition="left">
            Add Education
          </Button>
        </div>
      )}
      {educationList?.map((education, index) => (
        <div key={education?.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Education #{index + 1}</h3>
            {educationList?.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education?.id)}
                iconName="Trash2"
                iconSize={16}
                className="text-error hover:text-error"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Education Level"
              placeholder="Select education level"
              options={educationLevels}
              value={education?.level}
              onChange={(value) => updateEducation(education?.id, 'level', value)}
              required
            />

            <Select
              label="Field of Study"
              placeholder="Select field of study"
              options={fieldOfStudyOptions}
              value={education?.fieldOfStudy}
              onChange={(value) => updateEducation(education?.id, 'fieldOfStudy', value)}
              searchable
              required
            />
          </div>

          <Input
            label="Institution Name"
            type="text"
            placeholder="Enter institution name"
            value={education?.institution}
            onChange={(e) => updateEducation(education?.id, 'institution', e?.target?.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Graduation Year"
              placeholder="Select graduation year"
              options={graduationYears}
              value={education?.graduationYear}
              onChange={(value) => updateEducation(education?.id, 'graduationYear', value)}
              searchable
              required
            />

            <Input
              label="GPA (Optional)"
              type="text"
              placeholder="e.g., 3.8/4.0"
              value={education?.gpa}
              onChange={(e) => updateEducation(education?.id, 'gpa', e?.target?.value)}
            />
          </div>
        </div>
      ))}
      {educationList?.length > 0 && (
        <div className="text-center">
          <Button variant="outline" onClick={addEducation} iconName="Plus" iconPosition="left">
            Add Another Education
          </Button>
        </div>
      )}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-2">Education Impact on Recommendations</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Your degree level helps us suggest appropriate career entry points</li>
          <li>• Field of study influences relevant career path recommendations</li>
          <li>• Recent graduation dates help tailor advice for your career stage</li>
        </ul>
      </div>
    </div>
  );
};

export default EducationStep;