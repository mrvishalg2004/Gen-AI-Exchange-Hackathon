import React from 'react';
import Icon from '../../../components/AppIcon';

const CareerOverview = ({ career }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Briefcase" size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{career?.title}</h1>
            <p className="text-muted-foreground">{career?.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            career?.demandLevel === 'High' ? 'bg-success/10 text-success' :
            career?.demandLevel === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
          }`}>
            {career?.demandLevel} Demand
          </div>
        </div>
      </div>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {career?.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={20} className="text-success" />
            <h3 className="font-medium text-foreground">Salary Range</h3>
          </div>
          <p className="text-2xl font-semibold text-foreground">{career?.salaryRange}</p>
          <p className="text-sm text-muted-foreground">Average: {career?.averageSalary}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Growth Rate</h3>
          </div>
          <p className="text-2xl font-semibold text-foreground">{career?.growthRate}</p>
          <p className="text-sm text-muted-foreground">Next 5 years</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={20} className="text-secondary" />
            <h3 className="font-medium text-foreground">Job Openings</h3>
          </div>
          <p className="text-2xl font-semibold text-foreground">{career?.jobOpenings}</p>
          <p className="text-sm text-muted-foreground">Currently available</p>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-3">Key Responsibilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {career?.responsibilities?.map((responsibility, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{responsibility}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerOverview;