import React, { useState } from 'react';

import './FilterBox.css';

interface IFilterBoxProps {
  options: string[];
  onChanged: (value: string) => void;
  default?: string;
  unfilteredValue?: string;
}

export default function FilterBox(props: IFilterBoxProps): JSX.Element {
  const { unfilteredValue, onChanged } = props;
  const [currentValue, setCurrentValue] = useState(props.default ?? "");

  const updateValue = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrentValue(event.target.value);
    onChanged(event.target.value);
  };

  return (
    <select value={currentValue}
      onChange={updateValue}
      className="filter-box">
      {unfilteredValue
        ? <option value={unfilteredValue}>{unfilteredValue}</option>
        : ""}
      {[...props.options].map((city, idx) => (
        <option key={idx} value={city}>{city}</option>
      ))}
    </select>
  );
}
