import React from "react";

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 w-full max-w-xs"
        >
            {children}
        </button>
    );
};
