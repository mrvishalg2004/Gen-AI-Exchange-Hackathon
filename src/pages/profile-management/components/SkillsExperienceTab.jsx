import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SkillsExperienceTab = ({ profileData, onUpdate }) => {
  const [skills, setSkills] = useState(profileData?.skills || []);
  const [experiences, setExperiences] = useState(profileData?.experiences || []);
  const [certifications, setCertifications] = useState(profileData?.certifications || []);
  const [newSkill, setNewSkill] = useState({ name: '', level: 'beginner', category: 'technical' });
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const skillCategories = [
    { value: 'technical', label: 'Technical Skills' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'language', label: 'Languages' },
    { value: 'tools', label: 'Tools & Software' }
  ];

  const skillLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const handleAddSkill = () => {
    if (!newSkill?.name?.trim()) return;
    
    const skill = {
      id: Date.now(),
      name: newSkill?.name,
      level: newSkill?.level,
      category: newSkill?.category,
      verified: false,
      addedDate: new Date()
    };
    
    setSkills(prev => [...prev, skill]);
    setNewSkill({ name: '', level: 'beginner', category: 'technical' });
  };

  const handleRemoveSkill = (skillId) => {
    setSkills(prev => prev?.filter(skill => skill?.id !== skillId));
  };

  const handleSkillLevelChange = (skillId, newLevel) => {
    setSkills(prev => prev?.map(skill => 
      skill?.id === skillId ? { ...skill, level: newLevel } : skill
    ));
  };

  const handleAddExperience = () => {
    if (!newExperience?.title?.trim() || !newExperience?.company?.trim()) return;
    
    const experience = {
      id: Date.now(),
      ...newExperience,
      addedDate: new Date()
    };
    
    setExperiences(prev => [...prev, experience]);
    setNewExperience({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };

  const handleRemoveExperience = (expId) => {
    setExperiences(prev => prev?.filter(exp => exp?.id !== expId));
  };

  const handleCertificationUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const certification = {
      id: Date.now(),
      name: file?.name,
      uploadDate: new Date(),
      verified: false
    };
    
    setCertifications(prev => [...prev, certification]);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'expert': return 'bg-success text-success-foreground';
      case 'advanced': return 'bg-primary text-primary-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical': return 'Code';
      case 'soft': return 'Users';
      case 'language': return 'Globe';
      case 'tools': return 'Wrench';
      default: return 'Tag';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const handleSave = () => {
    onUpdate({
      skills,
      experiences,
      certifications
    });
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Skills</h3>
          <span className="text-sm text-muted-foreground">
            {skills?.length} skills added
          </span>
        </div>

        {/* Add New Skill */}
        <div className="bg-muted rounded-lg p-4 mb-4">
          <h4 className="font-medium text-foreground mb-3">Add New Skill</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Skill name"
              value={newSkill?.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e?.target?.value }))}
            />
            <Select
              options={skillCategories}
              value={newSkill?.category}
              onChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
              placeholder="Category"
            />
            <Select
              options={skillLevels}
              value={newSkill?.level}
              onChange={(value) => setNewSkill(prev => ({ ...prev, level: value }))}
              placeholder="Level"
            />
            <Button
              variant="default"
              onClick={handleAddSkill}
              iconName="Plus"
              iconPosition="left"
              disabled={!newSkill?.name?.trim()}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-3">
          {skills?.map((skill) => (
            <div key={skill?.id} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={getCategoryIcon(skill?.category)} size={16} className="text-muted-foreground" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{skill?.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(skill?.level)}`}>
                      {skill?.level}
                    </span>
                    {skill?.verified && (
                      <Icon name="CheckCircle" size={14} className="text-success" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">{skill?.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select
                  options={skillLevels}
                  value={skill?.level}
                  onChange={(value) => handleSkillLevelChange(skill?.id, value)}
                  className="w-32"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => handleRemoveSkill(skill?.id)}
                  className="text-muted-foreground hover:text-error"
                />
              </div>
            </div>
          ))}
          
          {skills?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Plus" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No skills added yet. Add your first skill above.</p>
            </div>
          )}
        </div>
      </div>
      {/* Experience Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
          <span className="text-sm text-muted-foreground">
            {experiences?.length} experiences
          </span>
        </div>

        {/* Add New Experience */}
        <div className="bg-muted rounded-lg p-4 mb-4">
          <h4 className="font-medium text-foreground mb-3">Add Work Experience</h4>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                placeholder="Job title"
                value={newExperience?.title}
                onChange={(e) => setNewExperience(prev => ({ ...prev, title: e?.target?.value }))}
              />
              <Input
                placeholder="Company name"
                value={newExperience?.company}
                onChange={(e) => setNewExperience(prev => ({ ...prev, company: e?.target?.value }))}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                type="date"
                label="Start Date"
                value={newExperience?.startDate}
                onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e?.target?.value }))}
              />
              <Input
                type="date"
                label="End Date"
                value={newExperience?.endDate}
                onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e?.target?.value }))}
                disabled={newExperience?.current}
              />
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="current-role"
                  checked={newExperience?.current}
                  onChange={(e) => setNewExperience(prev => ({ 
                    ...prev, 
                    current: e?.target?.checked,
                    endDate: e?.target?.checked ? '' : prev?.endDate
                  }))}
                  className="rounded border-border"
                />
                <label htmlFor="current-role" className="text-sm text-foreground">
                  Current role
                </label>
              </div>
            </div>
            
            <textarea
              placeholder="Describe your role and achievements..."
              value={newExperience?.description}
              onChange={(e) => setNewExperience(prev => ({ ...prev, description: e?.target?.value }))}
              rows={3}
              className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            
            <Button
              variant="default"
              onClick={handleAddExperience}
              iconName="Plus"
              iconPosition="left"
              disabled={!newExperience?.title?.trim() || !newExperience?.company?.trim()}
            >
              Add Experience
            </Button>
          </div>
        </div>

        {/* Experience List */}
        <div className="space-y-4">
          {experiences?.map((exp) => (
            <div key={exp?.id} className="p-4 bg-background border border-border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">{exp?.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp?.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(exp?.startDate)} - {exp?.current ? 'Present' : formatDate(exp?.endDate)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => handleRemoveExperience(exp?.id)}
                  className="text-muted-foreground hover:text-error"
                />
              </div>
              {exp?.description && (
                <p className="text-sm text-muted-foreground mt-2">{exp?.description}</p>
              )}
            </div>
          ))}
          
          {experiences?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Briefcase" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No work experience added yet.</p>
            </div>
          )}
        </div>
      </div>
      {/* Certifications Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
          <span className="text-sm text-muted-foreground">
            {certifications?.length} certificates
          </span>
        </div>

        {/* Upload Certification */}
        <div className="mb-4">
          <input
            type="file"
            id="certification-upload"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleCertificationUpload}
            className="hidden"
          />
          <label htmlFor="certification-upload">
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              asChild
            >
              <span className="cursor-pointer">Upload Certificate</span>
            </Button>
          </label>
          <p className="text-sm text-muted-foreground mt-2">
            PDF, JPG, or PNG files accepted
          </p>
        </div>

        {/* Certifications List */}
        <div className="space-y-3">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="flex items-center justify-between p-3 bg-background border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Award" size={16} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">{cert?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded {cert?.uploadDate?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {cert?.verified ? (
                  <span className="px-2 py-1 text-xs bg-success text-success-foreground rounded-full">
                    Verified
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs bg-warning text-warning-foreground rounded-full">
                    Pending
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  className="text-muted-foreground hover:text-error"
                />
              </div>
            </div>
          ))}
          
          {certifications?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Award" size={32} className="mx-auto mb-2 opacity-50" />
              <p>No certifications uploaded yet.</p>
            </div>
          )}
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

export default SkillsExperienceTab;