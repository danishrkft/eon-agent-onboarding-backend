
import React from 'react';
import { CheckIcon, ChevronRightIcon } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = {
  label: string;
  date?: string;
  time?: string;
  completed: boolean;
  active: boolean;
};

interface StatusBreadcrumbsProps {
  statuses: Status[];
  showAgingPeriod?: boolean;
  agingDays?: number;
}

const StatusBreadcrumbs: React.FC<StatusBreadcrumbsProps> = ({ statuses, showAgingPeriod = false, agingDays = 0 }) => {
  return (
    <div className="w-full">
      <div className="flex items-center w-full">
        {statuses.map((status, index) => (
          <React.Fragment key={index}>
            <div 
              className={cn(
                "flex flex-col items-center relative px-4 py-3 border flex-1",
                index === 0 ? "rounded-l-md" : "",
                index === statuses.length - 1 ? "rounded-r-md" : "",
                "bg-[#2563EB]/10 border-[#2563EB]/20"
              )}
            >
              <div className="flex items-center gap-2 justify-center w-full">
                {status.completed && (
                  <CheckIcon className="h-4 w-4 text-[#2563EB]" />
                )}
                <span className={cn(
                  "font-medium text-center",
                  status.active ? "text-[#E5241B]" : status.completed ? "text-[#2563EB]" : "text-gray-500"
                )}>
                  {status.label}
                </span>
                
                {(status.active && showAgingPeriod && agingDays > 0) && (
                  <Badge variant="outline" className="ml-2 text-xs bg-yellow-50 text-yellow-800 border-yellow-200">
                    {agingDays} days
                  </Badge>
                )}
              </div>
              
              {(status.date || status.time) && (
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  {status.date && <span>{status.date}</span>}
                  {status.time && <span>{status.time}</span>}
                </div>
              )}
            </div>
            
            {index < statuses.length - 1 && (
              <ChevronRightIcon className="h-5 w-5 text-gray-400 -mx-1 z-10" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusBreadcrumbs;
