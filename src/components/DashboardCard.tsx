
import React from 'react';

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-card p-5 hover:shadow-card-hover transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span 
                className={`text-xs font-medium ${
                  trend.isPositive ? 'text-eon-success' : 'text-eon-error'
                }`}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="bg-eon-light-blue rounded-lg p-3">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
