'use client';

import { useState, useRef, useEffect } from 'react';

export default function EditableField({
    value,
    onChange,
    isEditing,
    className = '',
    placeholder = 'Enter text...'
}) {
    const inputRef = useRef(null);
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleChange = (e) => {
        setLocalValue(e.target.value);
    };

    const handleBlur = () => {
        onChange(localValue);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onChange(localValue);
            inputRef.current?.blur();
        }
        if (e.key === 'Escape') {
            setLocalValue(value);
            inputRef.current?.blur();
        }
    };

    if (isEditing) {
        return (
            <div className={`editable-field editing ${className}`}>
                <input
                    ref={inputRef}
                    type="text"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="editable-input"
                    placeholder={placeholder}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        );
    }

    return (
        <div className={`editable-field ${className}`}>
            <span>{value || placeholder}</span>
        </div>
    );
}
