import React from 'react';
import { Calendar, Filter } from 'lucide-react';

const FilterDropdowns = ({ 
  selectedPlatform, 
  onPlatformChange, 
  selectedStatus, 
  onStatusChange,
  dateRange,
  onDateRangeChange,
  platforms,
  statuses 
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Platform Filter */}
      <div className="min-w-0 flex-1 sm:flex-none sm:w-40">
        <select
          className="input-field"
          value={selectedPlatform}
          onChange={(e) => onPlatformChange(e.target.value)}
        >
          {platforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div className="min-w-0 flex-1 sm:flex-none sm:w-44">
        <select
          className="input-field"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Date Range Filters */}
      <div className="flex gap-2 min-w-0 flex-1 sm:flex-none">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            className="input-field pl-10 w-full sm:w-auto"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            className="input-field pl-10 w-full sm:w-auto"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterDropdowns;