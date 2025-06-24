import PropTypes from 'prop-types';
const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-500 ${sizeClasses[size]}`}></div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};
export default LoadingSpinner;