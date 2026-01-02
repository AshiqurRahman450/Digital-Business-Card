'use client';

import { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';

export default function ImageUploader({ onImageChange, currentImage, cardType }) {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            onImageChange(imageUrl);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            onImageChange(imageUrl);
        }
    };

    return (
        <div className="profile-section">
            <div
                className={`profile-image-container ${isDragging ? 'dragging' : ''}`}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {currentImage ? (
                    <img
                        src={currentImage}
                        alt="Profile"
                        className="profile-image fade-in"
                    />
                ) : (
                    <div className="upload-prompt">
                        <FaCamera className="upload-icon" />
                        <span className="upload-text">Upload</span>
                    </div>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                />
            </div>
        </div>
    );
}
