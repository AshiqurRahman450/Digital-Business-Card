'use client';

import { useState, useRef, useCallback } from 'react';
import {
    FaReact, FaNodeJs, FaAws, FaCode, FaCamera, FaEdit, FaCheck,
    FaEnvelope, FaPhone, FaGlobe, FaLinkedin
} from 'react-icons/fa';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';
import ImageUploader from './ImageUploader';
import EditableField from './EditableField';
import { developerCard } from '../config/cardConfig';

const skillIcons = {
    'React': FaReact,
    'Next.js': SiNextdotjs,
    'Node.js': FaNodeJs,
    'TypeScript': SiTypescript,
    'AWS': FaAws,
};

export default function DeveloperCard() {
    const [profileImage, setProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [cardData, setCardData] = useState(developerCard);
    const lastTapRef = useRef(0);

    // Double-tap detection
    const handleCardClick = useCallback(() => {
        const now = Date.now();
        const timeDiff = now - lastTapRef.current;

        if (timeDiff < 300 && timeDiff > 0) {
            setIsEditing(prev => !prev);
        }
        lastTapRef.current = now;
    }, []);

    const updateField = (field) => (value) => {
        setCardData(prev => ({ ...prev, [field]: value }));
    };

    const toggleEdit = (e) => {
        e.stopPropagation();
        setIsEditing(prev => !prev);
    };

    return (
        <div className="card-wrapper">
            <span className="card-label">Developer</span>

            <div
                className="business-card developer"
                onClick={handleCardClick}
            >
                <div className="card-inner developer">
                    <ImageUploader
                        currentImage={profileImage}
                        onImageChange={setProfileImage}
                        cardType="developer"
                    />

                    <div className="content-section">
                        <EditableField
                            value={cardData.name}
                            onChange={updateField('name')}
                            isEditing={isEditing}
                            className="name-field"
                            placeholder="Your Name"
                        />

                        <EditableField
                            value={cardData.title}
                            onChange={updateField('title')}
                            isEditing={isEditing}
                            className="title-field"
                            placeholder="Your Title"
                        />

                        <div className="divider"></div>

                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon"><FaEnvelope /></span>
                                <EditableField
                                    value={cardData.email}
                                    onChange={updateField('email')}
                                    isEditing={isEditing}
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon"><FaPhone /></span>
                                <EditableField
                                    value={cardData.phone}
                                    onChange={updateField('phone')}
                                    isEditing={isEditing}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon"><FaGlobe /></span>
                                <EditableField
                                    value={cardData.website}
                                    onChange={updateField('website')}
                                    isEditing={isEditing}
                                    placeholder="yourwebsite.com"
                                />
                            </div>
                        </div>

                        <div className="skills-section">
                            {cardData.skills.map((skill, index) => {
                                const IconComponent = skillIcons[skill] || FaCode;
                                return (
                                    <span key={index} className="skill-tag">
                                        <IconComponent className="skill-icon" />
                                        {skill}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {isEditing && (
                        <div className="edit-indicator">
                            <FaEdit /> Editing
                        </div>
                    )}

                    <button
                        className={`toggle-button ${isEditing ? 'active' : ''}`}
                        onClick={toggleEdit}
                        title={isEditing ? 'Save changes' : 'Edit card'}
                    >
                        {isEditing ? <FaCheck /> : <FaEdit />}
                    </button>
                </div>
            </div>

            <p className="hint-text">
                <span className="hint-icon">👆</span>
                Double-tap to edit
            </p>
        </div>
    );
}
