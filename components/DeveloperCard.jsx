'use client';

import { FaReact, FaNodeJs, FaCode, FaEnvelope, FaPhone, FaGlobe, FaMobileAlt, FaPalette } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb } from 'react-icons/si';
import { developerCard } from '../config/cardConfig';

const skillIcons = {
    'React': FaReact,
    'React Native': FaMobileAlt,
    'Next.js': SiNextdotjs,
    'Node.js': FaNodeJs,
    'MongoDB': SiMongodb,
    'UI/UX': FaPalette,
};

export default function DeveloperCard() {
    return (
        <div className="card-wrapper">
            <span className="card-label">Developer</span>

            <div className="business-card developer">
                <div className="card-inner developer">
                    <div className="profile-section">
                        <div className="profile-image-container">
                            <img
                                src={developerCard.profileImage}
                                alt={developerCard.name}
                                className="profile-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="profile-placeholder" style={{ display: 'none' }}>
                                <span className="placeholder-text">
                                    {developerCard.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <div className="name-field">{developerCard.name}</div>
                        <div className="title-field">{developerCard.title}</div>

                        <div className="divider"></div>

                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon"><FaEnvelope /></span>
                                <span>{developerCard.email}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon"><FaPhone /></span>
                                <span>{developerCard.phone}</span>
                            </div>
                        </div>

                        <div className="skills-section">
                            {developerCard.skills.map((skill, index) => {
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
                </div>
            </div>
        </div>
    );
}
