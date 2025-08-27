import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ onFilterChange, onSortChange, filters, isLoading }) => {
  const [showFilters, setShowFilters] = useState(false);

  const salaryRanges = [
    { value: 'all', label: 'All Salaries' },
    { value: '0-50000', label: '$0 - $50,000' },
    { value: '50000-75000', label: '$50,000 - $75,000' },
    { value: '75000-100000', label: '$75,000 - $100,000' },
    { value: '100000-150000', label: '$100,000 - $150,000' },
    { value: '150000+', label: '$150,000+' }
  ];

  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'consulting', label: 'Consulting' }
  ];

  const sortOptions = [
    { value: 'match', label: 'Best Match' },
    { value: 'salary-high', label: 'Highest Salary' },
    { value: 'salary-low', label: 'Lowest Salary' },
    { value: 'demand-high', label: 'High Demand' },
    { value: 'growth', label: 'Growth Potential' }
  ];

  const matchRanges = [
    { value: 'all', label: 'All Matches' },
    { value: '80+', label: '80%+ Match' },
    { value: '60-79', label: '60-79% Match' },
    { value: '40-59', label: '40-59% Match' },
    { value: '0-39', label: 'Below 40% Match' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFilterChange({
      salary: 'all',
      industry: 'all',
      match: 'all'
    });
  };

  const hasActiveFilters = filters?.salary !== 'all' || filters?.industry !== 'all' || filters?.match !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters & Sort</h3>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
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
            iconName={showFilters ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            {showFilters ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>
      {/* Filter Controls */}
      <div className={`space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
        {/* Sort By */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sort || 'match'}
          onChange={(value) => onSortChange(value)}
          disabled={isLoading}
          className="w-full"
        />

        {/* Salary Range */}
        <Select
          label="Salary Range"
          options={salaryRanges}
          value={filters?.salary || 'all'}
          onChange={(value) => handleFilterChange('salary', value)}
          disabled={isLoading}
          className="w-full"
        />

        {/* Industry */}
        <Select
          label="Industry"
          options={industries}
          value={filters?.industry || 'all'}
          onChange={(value) => handleFilterChange('industry', value)}
          disabled={isLoading}
          className="w-full"
        />

        {/* Match Percentage */}
        <Select
          label="Match Percentage"
          options={matchRanges}
          value={filters?.match || 'all'}
          onChange={(value) => handleFilterChange('match', value)}
          disabled={isLoading}
          className="w-full"
        />
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className={`mt-4 pt-4 border-t border-border ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters?.salary !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {salaryRanges?.find(r => r?.value === filters?.salary)?.label}
                </span>
              )}
              {filters?.industry !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {industries?.find(i => i?.value === filters?.industry)?.label}
                </span>
              )}
              {filters?.match !== 'all' && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {matchRanges?.find(m => m?.value === filters?.match)?.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;