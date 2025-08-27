import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoStep = ({ formData, updateFormData, errors }) => {
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' },
    { value: 'sg', label: 'Singapore' },
    { value: 'jp', label: 'Japan' },
    { value: 'other', label: 'Other' }
  ];

  const ageRangeOptions = [
    { value: '18-22', label: '18-22 years' },
    { value: '23-27', label: '23-27 years' },
    { value: '28-32', label: '28-32 years' },
    { value: '33-37', label: '33-37 years' },
    { value: '38-42', label: '38-42 years' },
    { value: '43-47', label: '43-47 years' },
    { value: '48+', label: '48+ years' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Tell us about yourself to get personalized career recommendations</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName || ''}
          onChange={(e) => updateFormData('firstName', e?.target?.value)}
          error={errors?.firstName}
          required
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName || ''}
          onChange={(e) => updateFormData('lastName', e?.target?.value)}
          error={errors?.lastName}
          required
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        description="We'll use this to send you career updates and recommendations"
        value={formData?.email || ''}
        onChange={(e) => updateFormData('email', e?.target?.value)}
        error={errors?.email}
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter your phone number"
        value={formData?.phone || ''}
        onChange={(e) => updateFormData('phone', e?.target?.value)}
        error={errors?.phone}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Age Range"
          placeholder="Select your age range"
          options={ageRangeOptions}
          value={formData?.ageRange || ''}
          onChange={(value) => updateFormData('ageRange', value)}
          error={errors?.ageRange}
          required
        />

        <Select
          label="Country"
          placeholder="Select your country"
          options={countryOptions}
          value={formData?.country || ''}
          onChange={(value) => updateFormData('country', value)}
          error={errors?.country}
          searchable
          required
        />
      </div>
      <Input
        label="City"
        type="text"
        placeholder="Enter your city"
        value={formData?.city || ''}
        onChange={(e) => updateFormData('city', e?.target?.value)}
        error={errors?.city}
        required
      />
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-2">Why do we need this information?</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Location helps us show relevant job markets and salary data</li>
          <li>• Age range helps tailor career recommendations to your life stage</li>
          <li>• Contact info enables personalized career guidance and updates</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfoStep;