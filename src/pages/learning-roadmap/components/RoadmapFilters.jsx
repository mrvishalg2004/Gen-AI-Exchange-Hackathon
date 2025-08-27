import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RoadmapFilters = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const skillCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technical', label: 'Technical Skills' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'data', label: 'Data & Analytics' }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const timeCommitments = [
    { value: 'all', label: 'Any Duration' },
    { value: '1-5', label: '1-5 hours' },
    { value: '6-20', label: '6-20 hours' },
    { value: '21-50', label: '21-50 hours' },
    { value: '50+', label: '50+ hours' }
  ];

  const platforms = [
    { value: 'all', label: 'All Platforms' },
    { value: 'coursera', label: 'Coursera' },
    { value: 'udemy', label: 'Udemy' },
    { value: 'edx', label: 'edX' },
    { value: 'linkedin', label: 'LinkedIn Learning' },
    { value: 'pluralsight', label: 'Pluralsight' },
    { value: 'youtube', label: 'YouTube' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: '0-50', label: '$0 - $50' },
    { value: '51-100', label: '$51 - $100' },
    { value: '101-200', label: '$101 - $200' },
    { value: '200+', label: '$200+' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value
    };
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: 'all',
      difficulty: 'all',
      timeCommitment: 'all',
      platform: 'all',
      priceRange: 'all'
    };
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => value && value !== 'all')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`p-4 space-y-4 ${!isExpanded ? 'hidden md:block' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Skill Category */}
          <Select
            label="Skill Category"
            options={skillCategories}
            value={activeFilters?.category || 'all'}
            onChange={(value) => handleFilterChange('category', value)}
            className="w-full"
          />

          {/* Difficulty Level */}
          <Select
            label="Difficulty Level"
            options={difficultyLevels}
            value={activeFilters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
            className="w-full"
          />

          {/* Time Commitment */}
          <Select
            label="Time Commitment"
            options={timeCommitments}
            value={activeFilters?.timeCommitment || 'all'}
            onChange={(value) => handleFilterChange('timeCommitment', value)}
            className="w-full"
          />

          {/* Platform */}
          <Select
            label="Platform"
            options={platforms}
            value={activeFilters?.platform || 'all'}
            onChange={(value) => handleFilterChange('platform', value)}
            className="w-full"
          />

          {/* Price Range */}
          <Select
            label="Price Range"
            options={priceRanges}
            value={activeFilters?.priceRange || 'all'}
            onChange={(value) => handleFilterChange('priceRange', value)}
            className="w-full"
          />
        </div>

        {/* Quick Filter Tags */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Quick Filters</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilters?.priceRange === 'free' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('priceRange', activeFilters?.priceRange === 'free' ? 'all' : 'free')}
            >
              Free Courses
            </Button>
            <Button
              variant={activeFilters?.difficulty === 'beginner' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('difficulty', activeFilters?.difficulty === 'beginner' ? 'all' : 'beginner')}
            >
              Beginner Friendly
            </Button>
            <Button
              variant={activeFilters?.timeCommitment === '1-5' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('timeCommitment', activeFilters?.timeCommitment === '1-5' ? 'all' : '1-5')}
            >
              Quick Learn
            </Button>
            <Button
              variant={activeFilters?.category === 'technical' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('category', activeFilters?.category === 'technical' ? 'all' : 'technical')}
            >
              Technical Skills
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapFilters;