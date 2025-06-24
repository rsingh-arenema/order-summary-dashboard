import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-success-100 text-success-600 border-success-200';
      case 'shipped':
      case 'out for delivery':
        return 'bg-primary-100 text-primary-600 border-primary-200';
      case 'pending':
        return 'bg-warning-100 text-warning-600 border-warning-200';
      case 'cancelled':
        return 'bg-error-100 text-error-600 border-error-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;