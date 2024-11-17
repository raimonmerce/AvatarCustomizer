import React from 'react';

interface DropdownSelectorProps {
  label: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select
        value={selectedValue}
        onChange={handleChange}
        style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelector;
