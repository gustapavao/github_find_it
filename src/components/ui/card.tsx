import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div
            className={`border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
        >
            {children}
        </div>
    );
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="p-6">{children}</div>;
};
