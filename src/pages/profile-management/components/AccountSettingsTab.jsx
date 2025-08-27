import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AccountSettingsTab = ({ profileData, onUpdate }) => {
  const [settings, setSettings] = useState({
    notifications: {
      email: profileData?.notifications?.email ?? true,
      push: profileData?.notifications?.push ?? true,
      sms: profileData?.notifications?.sms ?? false,
      careerUpdates: profileData?.notifications?.careerUpdates ?? true,
      learningReminders: profileData?.notifications?.learningReminders ?? true,
      jobAlerts: profileData?.notifications?.jobAlerts ?? false
    },
    privacy: {
      profileVisibility: profileData?.privacy?.profileVisibility || 'private',
      dataSharing: profileData?.privacy?.dataSharing ?? false,
      analyticsTracking: profileData?.privacy?.analyticsTracking ?? true,
      thirdPartyIntegrations: profileData?.privacy?.thirdPartyIntegrations ?? false
    },
    language: profileData?.language || 'en',
    timezone: profileData?.timezone || 'America/New_York',
    theme: profileData?.theme || 'system'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteSection, setShowDeleteSection] = useState(false);

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' }
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public - Visible to everyone' },
    { value: 'private', label: 'Private - Only visible to you' },
    { value: 'recruiters', label: 'Recruiters Only - Visible to verified recruiters' }
  ];

  const handleNotificationChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev?.privacy,
        [key]: value
      }
    }));
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordUpdate = () => {
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData?.newPassword?.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // Simulate password update
    alert('Password updated successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleExportData = () => {
    // Simulate data export
    const exportData = {
      profile: profileData,
      settings: settings,
      exportDate: new Date()?.toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'careerpath-profile-data.json';
    link?.click();
    
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== 'DELETE') {
      alert('Please type "DELETE" to confirm account deletion');
      return;
    }
    
    // Simulate account deletion
    alert('Account deletion request submitted. You will receive a confirmation email.');
    setDeleteConfirmation('');
    setShowDeleteSection(false);
  };

  const handleSave = () => {
    onUpdate(settings);
  };

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Checkbox
              label="Email Notifications"
              description="Receive updates via email"
              checked={settings?.notifications?.email}
              onChange={(e) => handleNotificationChange('email', e?.target?.checked)}
            />
            <Checkbox
              label="Push Notifications"
              description="Browser push notifications"
              checked={settings?.notifications?.push}
              onChange={(e) => handleNotificationChange('push', e?.target?.checked)}
            />
            <Checkbox
              label="SMS Notifications"
              description="Text message alerts"
              checked={settings?.notifications?.sms}
              onChange={(e) => handleNotificationChange('sms', e?.target?.checked)}
            />
          </div>
          
          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-foreground mb-3">Content Preferences</h4>
            <div className="space-y-3">
              <Checkbox
                label="Career Updates"
                description="New career recommendations and insights"
                checked={settings?.notifications?.careerUpdates}
                onChange={(e) => handleNotificationChange('careerUpdates', e?.target?.checked)}
              />
              <Checkbox
                label="Learning Reminders"
                description="Reminders about your learning progress"
                checked={settings?.notifications?.learningReminders}
                onChange={(e) => handleNotificationChange('learningReminders', e?.target?.checked)}
              />
              <Checkbox
                label="Job Alerts"
                description="Relevant job opportunities"
                checked={settings?.notifications?.jobAlerts}
                onChange={(e) => handleNotificationChange('jobAlerts', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Privacy Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Privacy & Data</h3>
        
        <div className="space-y-4">
          <Select
            label="Profile Visibility"
            description="Control who can see your profile information"
            options={visibilityOptions}
            value={settings?.privacy?.profileVisibility}
            onChange={(value) => handlePrivacyChange('profileVisibility', value)}
          />
          
          <div className="space-y-3">
            <Checkbox
              label="Data Sharing for Improvements"
              description="Help improve our AI recommendations by sharing anonymized data"
              checked={settings?.privacy?.dataSharing}
              onChange={(e) => handlePrivacyChange('dataSharing', e?.target?.checked)}
            />
            <Checkbox
              label="Analytics Tracking"
              description="Allow usage analytics to improve your experience"
              checked={settings?.privacy?.analyticsTracking}
              onChange={(e) => handlePrivacyChange('analyticsTracking', e?.target?.checked)}
            />
            <Checkbox
              label="Third-party Integrations"
              description="Allow connections with external career platforms"
              checked={settings?.privacy?.thirdPartyIntegrations}
              onChange={(e) => handlePrivacyChange('thirdPartyIntegrations', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Localization Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Language & Region</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Language"
            options={languageOptions}
            value={settings?.language}
            onChange={(value) => handleSettingChange('language', value)}
          />
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={settings?.timezone}
            onChange={(value) => handleSettingChange('timezone', value)}
            searchable
          />
          <Select
            label="Theme"
            options={themeOptions}
            value={settings?.theme}
            onChange={(value) => handleSettingChange('theme', value)}
          />
        </div>
      </div>
      {/* Password Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Password & Security</h3>
        
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData?.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData?.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
            placeholder="Enter new password"
            description="Must be at least 8 characters long"
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData?.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
            placeholder="Confirm new password"
          />
          
          <Button
            variant="outline"
            onClick={handlePasswordUpdate}
            iconName="Lock"
            iconPosition="left"
            disabled={!passwordData?.currentPassword || !passwordData?.newPassword || !passwordData?.confirmPassword}
          >
            Update Password
          </Button>
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Export Your Data</h4>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your profile data and settings
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
            >
              Export Data
            </Button>
          </div>
          
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">Delete Account</h4>
              <Button
                variant="ghost"
                size="sm"
                iconName={showDeleteSection ? "ChevronUp" : "ChevronDown"}
                onClick={() => setShowDeleteSection(!showDeleteSection)}
                className="text-muted-foreground"
              >
                {showDeleteSection ? 'Hide' : 'Show'}
              </Button>
            </div>
            
            {showDeleteSection && (
              <div className="bg-error/5 border border-error/20 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-4">
                  <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                  <div>
                    <h5 className="font-medium text-error">Permanent Account Deletion</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      This action cannot be undone. All your data, including profile information, 
                      career recommendations, and learning progress will be permanently deleted.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Input
                    label="Type 'DELETE' to confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e?.target?.value)}
                    placeholder="DELETE"
                  />
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    iconName="Trash2"
                    iconPosition="left"
                    disabled={deleteConfirmation !== 'DELETE'}
                  >
                    Delete Account Permanently
                  </Button>
                </div>
              </div>
            )}
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
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AccountSettingsTab;