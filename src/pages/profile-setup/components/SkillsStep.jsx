import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SkillsStep = ({ formData, updateFormData, errors }) => {
  const [skillInput, setSkillInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('technical');

  const skillCategories = {
    technical: {
      label: 'Technical Skills',
      icon: 'Code',
      suggestions: [
        'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 
        'Git', 'MongoDB', 'TypeScript', 'Java', 'C++', 'HTML/CSS', 'Vue.js',
        'Angular', 'PHP', 'Ruby', 'Go', 'Kubernetes', 'Jenkins', 'GraphQL'
      ]
    },
    soft: {
      label: 'Soft Skills',
      icon: 'Users',
      suggestions: [
        'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management',
        'Critical Thinking', 'Adaptability', 'Creativity', 'Project Management',
        'Public Speaking', 'Negotiation', 'Mentoring', 'Conflict Resolution'
      ]
    },
    tools: {
      label: 'Tools & Software',
      icon: 'Settings',
      suggestions: [
        'Figma', 'Adobe Creative Suite', 'Slack', 'Jira', 'Trello', 'Notion',
        'Microsoft Office', 'Google Workspace', 'Salesforce', 'HubSpot',
        'Tableau', 'Power BI', 'Sketch', 'InVision', 'Zoom', 'Asana'
      ]
    },
    industry: {
      label: 'Industry Knowledge',
      icon: 'Building',
      suggestions: [
        'Digital Marketing', 'SEO/SEM', 'Data Analysis', 'Financial Modeling',
        'UX/UI Design', 'Agile Methodology', 'DevOps', 'Cybersecurity',
        'Machine Learning', 'Blockchain', 'E-commerce', 'Content Strategy'
      ]
    }
  };

  const addSkill = (skillName, category = selectedCategory) => {
    if (!skillName?.trim()) return;

    const currentSkills = formData?.skills || {};
    const categorySkills = currentSkills?.[category] || [];
    
    if (!categorySkills?.some(skill => skill?.name?.toLowerCase() === skillName?.toLowerCase())) {
      const newSkill = {
        id: Date.now(),
        name: skillName?.trim(),
        level: 'intermediate'
      };
      
      updateFormData('skills', {
        ...currentSkills,
        [category]: [...categorySkills, newSkill]
      });
    }
    
    setSkillInput('');
  };

  const removeSkill = (category, skillId) => {
    const currentSkills = formData?.skills || {};
    const categorySkills = currentSkills?.[category] || [];
    const updatedSkills = categorySkills?.filter(skill => skill?.id !== skillId);
    
    updateFormData('skills', {
      ...currentSkills,
      [category]: updatedSkills
    });
  };

  const updateSkillLevel = (category, skillId, level) => {
    const currentSkills = formData?.skills || {};
    const categorySkills = currentSkills?.[category] || [];
    const updatedSkills = categorySkills?.map(skill => 
      skill?.id === skillId ? { ...skill, level } : skill
    );
    
    updateFormData('skills', {
      ...currentSkills,
      [category]: updatedSkills
    });
  };

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-red-500' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
    { value: 'advanced', label: 'Advanced', color: 'bg-green-500' },
    { value: 'expert', label: 'Expert', color: 'bg-blue-500' }
  ];

  const getTotalSkillsCount = () => {
    const skills = formData?.skills || {};
    return Object.values(skills)?.reduce((total, categorySkills) => total + categorySkills?.length, 0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Skills Assessment</h2>
        <p className="text-muted-foreground">Add your skills to help us match you with the right career opportunities</p>
        <div className="mt-4 inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
          <Icon name="Target" size={16} />
          <span>{getTotalSkillsCount()} skills added</span>
        </div>
      </div>
      {/* Category Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {Object.entries(skillCategories)?.map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`p-4 rounded-lg border transition-soft text-center ${
              selectedCategory === key
                ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50'
            }`}
          >
            <Icon name={category?.icon} size={24} className="mx-auto mb-2" />
            <span className="text-sm font-medium">{category?.label}</span>
            <div className="text-xs mt-1">
              {(formData?.skills?.[key] || [])?.length} skills
            </div>
          </button>
        ))}
      </div>
      {/* Add Skill Input */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name={skillCategories?.[selectedCategory]?.icon} size={20} />
          <span>Add {skillCategories?.[selectedCategory]?.label}</span>
        </h3>
        
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder={`Enter a ${skillCategories?.[selectedCategory]?.label?.toLowerCase()} skill...`}
            value={skillInput}
            onChange={(e) => setSkillInput(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && addSkill(skillInput)}
            className="flex-1"
          />
          <Button
            variant="default"
            onClick={() => addSkill(skillInput)}
            iconName="Plus"
            iconSize={16}
            disabled={!skillInput?.trim()}
          />
        </div>

        {/* Skill Suggestions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Popular Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {skillCategories?.[selectedCategory]?.suggestions?.map((suggestion) => {
              const isAdded = (formData?.skills?.[selectedCategory] || [])?.some(skill => skill?.name?.toLowerCase() === suggestion?.toLowerCase());
              
              return (
                <button
                  key={suggestion}
                  onClick={() => !isAdded && addSkill(suggestion)}
                  disabled={isAdded}
                  className={`px-3 py-1 rounded-full text-sm transition-soft ${
                    isAdded
                      ? 'bg-success/20 text-success cursor-not-allowed' :'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {isAdded && <Icon name="Check" size={12} className="inline mr-1" />}
                  {suggestion}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* Skills Display */}
      {Object.entries(skillCategories)?.map(([categoryKey, category]) => {
        const categorySkills = formData?.skills?.[categoryKey] || [];
        if (categorySkills?.length === 0) return null;

        return (
          <div key={categoryKey} className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
              <Icon name={category?.icon} size={20} />
              <span>{category?.label} ({categorySkills?.length})</span>
            </h3>
            <div className="space-y-3">
              {categorySkills?.map((skill) => (
                <div key={skill?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-foreground">{skill?.name}</span>
                    <div className="flex items-center space-x-1">
                      {skillLevels?.map((level) => (
                        <button
                          key={level?.value}
                          onClick={() => updateSkillLevel(categoryKey, skill?.id, level?.value)}
                          className={`w-3 h-3 rounded-full transition-soft ${
                            skill?.level === level?.value ? level?.color : 'bg-muted'
                          }`}
                          title={level?.label}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground capitalize">
                      {skill?.level}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(categoryKey, skill?.id)}
                    iconName="X"
                    iconSize={14}
                    className="text-muted-foreground hover:text-error"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-2">Skill Level Guide</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {skillLevels?.map((level) => (
            <div key={level?.value} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${level?.color}`} />
              <span className="text-muted-foreground">{level?.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Click the colored dots next to each skill to set your proficiency level
        </p>
      </div>
    </div>
  );
};

export default SkillsStep;