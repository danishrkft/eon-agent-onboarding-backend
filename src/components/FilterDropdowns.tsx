import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronDown, Filter, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { COMPANIES, BRANCHES_BY_COMPANY } from '../utils/mockData';

export type FilterDropdownsProps = {
  showDateFilter?: boolean;
  onDateChange?: (dateRange: DateRange) => void;
  onCompanyChange?: (company: string) => void;
  onBranchChange?: (branch: string) => void;
}

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
}

const FilterDropdowns: React.FC<FilterDropdownsProps> = ({ 
  showDateFilter = true, 
  onDateChange, 
  onCompanyChange, 
  onBranchChange 
}) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 4, 31)
  });
  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [dateFilterOption, setDateFilterOption] = useState("today");
  const [company, setCompany] = useState<string>("EPD");
  const [companyOpen, setCompanyOpen] = useState(false);
  const [branch, setBranch] = useState<string>("Edaran Otomobil Nasional Bhd (Glenmarie)");
  const [branchOpen, setBranchOpen] = useState(false);
  const [availableBranches, setAvailableBranches] = useState<string[]>(BRANCHES_BY_COMPANY["EPD"]);

  // Update branches when company changes
  useEffect(() => {
    if (company) {
      const companyBranches = BRANCHES_BY_COMPANY[company] || [];
      setAvailableBranches(companyBranches);
      // If current branch doesn't exist in the new company, set the first branch
      if (!companyBranches.includes(branch) && companyBranches.length > 0) {
        const newBranch = companyBranches[0];
        setBranch(newBranch);
        if (onBranchChange) {
          onBranchChange(newBranch);
        }
      }
    }
  }, [company]);

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
    if (onDateChange && range.from && range.to) {
      onDateChange(range);
    }
  };

  const handleDateOptionChange = (option: string) => {
    setDateFilterOption(option);
    const today = new Date();
    let from = new Date();
    let to = new Date();

    switch (option) {
      case 'today':
        // Keep today's date for both
        break;
      case 'tomorrow':
        from.setDate(today.getDate() + 1);
        to.setDate(today.getDate() + 1);
        break;
      case 'last7days':
        from.setDate(today.getDate() - 6);
        break;
      case 'last30days':
        from.setDate(today.getDate() - 29);
        break;
      case 'thismonth':
        from = new Date(today.getFullYear(), today.getMonth(), 1);
        to = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'lastmonth':
        from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        to = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'custom':
        // Keep existing custom range
        setDateFilterOpen(true);
        return;
      default:
        break;
    }

    const newRange = { from, to };
    setDateRange(newRange);
    if (onDateChange) {
      onDateChange(newRange);
    }
  };

  const handleCompanyChange = (value: string) => {
    setCompany(value);
    if (onCompanyChange) {
      onCompanyChange(value);
    }
  };

  const handleBranchChange = (value: string) => {
    setBranch(value);
    if (onBranchChange) {
      onBranchChange(value);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Company Dropdown */}
      <Popover open={companyOpen} onOpenChange={setCompanyOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={companyOpen} className="w-[180px] justify-between">
            {company || "Select Company"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[180px] p-0 bg-white">
          <Command>
            <CommandInput placeholder="Search company..." />
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {COMPANIES.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    handleCompanyChange(item);
                    setCompanyOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      company === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Branch Dropdown */}
      <Popover open={branchOpen} onOpenChange={setBranchOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={branchOpen} className="w-[180px] justify-between truncate">
            <span className="truncate">{branch || "Select Branch"}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-white">
          <Command>
            <CommandInput placeholder="Search branch..." />
            <CommandEmpty>No branch found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {availableBranches.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    handleBranchChange(item);
                    setBranchOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      branch === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{item}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Date Filter */}
      {showDateFilter && (
        <Popover open={dateFilterOpen} onOpenChange={setDateFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="min-w-[250px] justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                Filter Date: {" "}
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(dateRange.to, "dd/MM/yyyy")}`
                  : "Select date range"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white" align="start">
            <div className="grid p-2 gap-2">
              <div className="grid gap-1">
                <Button 
                  variant={dateFilterOption === "today" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleDateOptionChange("today")}
                >
                  Today
                </Button>
                <Button 
                  variant={dateFilterOption === "tomorrow" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleDateOptionChange("tomorrow")}
                >
                  Tomorrow
                </Button>
                <Button 
                  variant={dateFilterOption === "last7days" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleDateOptionChange("last7days")}
                >
                  Last 7 Days
                </Button>
                <Button 
                  variant={dateFilterOption === "last30days" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleDateOptionChange("last30days")}
                >
                  Last 30 Days
                </Button>
                <Button 
                  variant={dateFilterOption === "thismonth" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleDateOptionChange("thismonth")}
                >
                  This Month
                </Button>
                <Button 
                  variant={dateFilterOption === "lastmonth" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleDateOptionChange("lastmonth")}
                >
                  Last Month
                </Button>
                <Button 
                  variant={dateFilterOption === "custom" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handleDateOptionChange("custom")}
                >
                  Custom Range
                </Button>
              </div>
              {dateFilterOption === "custom" && (
                <div className="border-t pt-2">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      if (range?.from && range?.to) {
                        handleDateChange(range as DateRange);
                      }
                    }}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default FilterDropdowns;
