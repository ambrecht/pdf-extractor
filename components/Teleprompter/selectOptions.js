// components/SelectOption.js

import React from 'react';

/**
 * Reusable SelectOption component
 * @param {Object} props - Component properties
 * @param {string} props.label - Label for the select input
 * @param {string|number} props.value - Current value of the select input
 * @param {Array} props.options - Array of option objects
 * @param {Function} props.onChange - Function to handle value change
 */
const SelectOption = ({ label, value, options, onChange }) => (
  <div className="mb-4">
    <label className="block mb-2 text-black font-semibold">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="p-2 border rounded w-full"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectOption;
