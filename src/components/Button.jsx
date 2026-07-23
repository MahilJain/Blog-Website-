import React from 'react'

export default function Button({
    children,
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            className={`rounded-lg px-4 py-2 font-semibold transition-all duration-200 hover:opacity-90 ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}