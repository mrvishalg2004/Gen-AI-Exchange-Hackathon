import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalInfoTab = ({ profileData, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    email: profileData?.email || '',
    phone: profileData?.phone || '',
    location: profileData?.location || '',
    dateOfBirth: profileData?.dateOfBirth || '',
    linkedinUrl: profileData?.linkedinUrl || '',
    githubUrl: profileData?.githubUrl || '',
    portfolioUrl: profileData?.portfolioUrl || '',
    bio: profileData?.bio || '',
    profileImage: profileData?.profileImage || ''
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [lastSaved, setLastSaved] = useState(profileData?.lastUpdated || new Date());

  const locationOptions = [
    { value: 'new-york', label: 'New York, NY' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'denver', label: 'Denver, CO' },
    { value: 'remote', label: 'Remote' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    if (file?.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        profileImage: 'Image size must be less than 5MB'
      }));
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        profileImage: imageUrl
      }));
      setIsUploading(false);
    }, 1500);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData?.phone && !/^\+?[\d\s\-\(\)]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData?.linkedinUrl && !formData?.linkedinUrl?.includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }
    
    if (formData?.githubUrl && !formData?.githubUrl?.includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onUpdate(formData);
      setLastSaved(new Date());
    }
  };

  const formatLastSaved = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Profile Image Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-border">
              {formData?.profileImage ? (
                <Image
                  src={formData?.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-muted-foreground" />
                </div>
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={20} className="text-white animate-spin" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="profile-image">
              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
                disabled={isUploading}
                asChild
              >
                <span className="cursor-pointer">
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </span>
              </Button>
            </label>
            <p className="text-sm text-muted-foreground mt-2">
              JPG, PNG or GIF. Max size 5MB.
            </p>
            {errors?.profileImage && (
              <p className="text-sm text-error mt-1">{errors?.profileImage}</p>
            )}
          </div>
        </div>
      </div>
      {/* Basic Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          <span className="text-sm text-muted-foreground">
            Last saved: {formatLastSaved(lastSaved)}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            placeholder="Enter your first name"
          />
          
          <Input
            label="Last Name"
            type="text"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            placeholder="Enter your last name"
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
            placeholder="your.email@example.com"
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            placeholder="+1 (555) 123-4567"
          />
          
          <Select
            label="Location"
            options={locationOptions}
            value={formData?.location}
            onChange={(value) => handleInputChange('location', value)}
            placeholder="Select your location"
            searchable
          />
          
          <Input
            label="Date of Birth"
            type="date"
            value={formData?.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            placeholder="MM/DD/YYYY"
          />
        </div>
      </div>
      {/* Professional Links */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Professional Links</h3>
        
        <div className="space-y-4">
          <Input
            label="LinkedIn Profile"
            type="url"
            value={formData?.linkedinUrl}
            onChange={(e) => handleInputChange('linkedinUrl', e?.target?.value)}
            error={errors?.linkedinUrl}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          
          <Input
            label="GitHub Profile"
            type="url"
            value={formData?.githubUrl}
            onChange={(e) => handleInputChange('githubUrl', e?.target?.value)}
            error={errors?.githubUrl}
            placeholder="https://github.com/yourusername"
          />
          
          <Input
            label="Portfolio Website"
            type="url"
            value={formData?.portfolioUrl}
            onChange={(e) => handleInputChange('portfolioUrl', e?.target?.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>
      {/* Bio Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Professional Bio</h3>
        
        <div className="space-y-2">
          <textarea
            value={formData?.bio}
            onChange={(e) => handleInputChange('bio', e?.target?.value)}
            placeholder="Write a brief professional summary about yourself..."
            rows={4}
            className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <p className="text-sm text-muted-foreground">
            {formData?.bio?.length}/500 characters
          </p>
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
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;