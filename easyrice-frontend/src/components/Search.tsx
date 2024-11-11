import { ChangeEventHandler } from "react";

interface SearchProps {
  value: string;
  onChange: ChangeEventHandler;
  name: string;
  placeholder: string;
  disabled: boolean;
}

const Search = ({
  value,
  onChange,
  name,
  placeholder,
  disabled,
}: SearchProps) => {
  return (
    <div className="bg-[#F7F8FC] rounded-xl flex items-center px-2 h-fit text-sm border">
      <input
        type="text"
        name={name}
        disabled={disabled}
        value={value}
        className="px-2 py-3 border-none outline-none bg-[#F7F8FC] w-full disabled:opacity-50"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
