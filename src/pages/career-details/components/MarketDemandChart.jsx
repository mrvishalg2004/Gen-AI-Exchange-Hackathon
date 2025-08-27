import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const MarketDemandChart = ({ demandData, salaryTrends }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="TrendingUp" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Market Analysis</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Demand Trend */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Job Demand Trend</h3>
          <div className="w-full h-64" aria-label="Job Demand Trend Chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="year" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="demand" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Trends */}
        <div>
          <h3 className="font-medium text-foreground mb-4">Salary Trends</h3>
          <div className="w-full h-64" aria-label="Salary Trends Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="year" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                  formatter={(value) => [`$${value?.toLocaleString()}`, 'Average Salary']}
                />
                <Bar 
                  dataKey="salary" 
                  fill="var(--color-success)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-semibold text-foreground">15.2%</p>
            <p className="text-sm text-muted-foreground">Job Growth Rate</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Icon name="MapPin" size={24} className="text-secondary mx-auto mb-2" />
            <p className="text-2xl font-semibold text-foreground">2,847</p>
            <p className="text-sm text-muted-foreground">Open Positions</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Icon name="Award" size={24} className="text-accent mx-auto mb-2" />
            <p className="text-2xl font-semibold text-foreground">4.2/5</p>
            <p className="text-sm text-muted-foreground">Job Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDemandChart;