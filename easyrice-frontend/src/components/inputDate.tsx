import { ChangeEventHandler } from "react";

interface InputDateProps {
  value: string;
  onChange: ChangeEventHandler;
  name: string;
  disabled: boolean;
}

const InputDate = ({ value, onChange, name, disabled }: InputDateProps) => {
  return (
    <div className="bg-[#F7F8FC] rounded-xl flex items-center px-2 h-fit text-sm border">
      <input
        type="date"
        value={value}
        disabled={disabled}
        name={name}
        className="px-2 py-3 border-none outline-none bg-[#F7F8FC] disabled:opacity-50"
        onChange={onChange}
      />
    </div>
  );
};

export default InputDate;
