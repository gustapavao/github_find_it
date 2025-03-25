import React from "react";

interface InputProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
    return (
        <input
            type="text"
            className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};
