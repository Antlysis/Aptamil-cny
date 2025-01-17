import React, { useState } from 'react';

interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  disabled = false
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    if (disabled) return;

    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    
    // Call the onChange prop if provided
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className="flex mt-4 items-start">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        className={`mr-2 h-[24px] cursor-pointer bg-gray-500 scale-150`}
      />
      <label 
        className={`select-none text-white text-xs`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;