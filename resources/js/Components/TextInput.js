import React from 'react';

export default ({ label, name, className, errors = [], require = false, ...props }) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700" htmlFor={name}>
          {label}
          {require && (
            <span className="text-red-500"> *</span>
          )}
        </label>
      )}
      <input
        id={name}
        name={name}
        {...props}
        className={`mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-600 sm:text-sm ${errors.length ? 'error' : ''}`}
      />
      {errors && <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{errors}</div>}
    </div>
  );
};
