import React, { useState } from 'react';

type InputType = "text" | "email" | "url" | "tel";

export interface ITextInputProps {
  label: string;
  onChanged: (value: string) => void;
  required?: boolean;
  initialValue?: string;
  type?: InputType;
}

export default function TextInput(props: ITextInputProps): JSX.Element {
  const [currentValue, setCurrentValue] = useState(props.initialValue ?? "");

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    props.onChanged(value);
    setCurrentValue(value);
  };

  return (
    <>
      <label className={props.required ? "required" : ""}>
        {props.label}
      </label>
      <input type={props.type ?? "text"} onChange={updateValue} value={currentValue} />
    </>
  );
}
