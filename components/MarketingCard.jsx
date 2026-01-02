'use client';

import { FaChartLine, FaHashtag, FaBullhorn, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { SiGoogleanalytics, SiGoogleads } from 'react-icons/si';
import { marketingCard } from '../config/cardConfig';

const skillIcons = {
    'SEO': FaChartLine,
    'PPC': SiGoogleads,
    'Analytics': SiGoogleanalytics,
    'Content': FaBullhorn,
    'Social Media': FaHashtag,
};

export default function MarketingCard() {
    return (
        <div className="card-wrapper">
            <span className="card-label">Marketing</span>

            <div className="business-card marketing">
                <div className="card-inner marketing">
                    <div className="profile-section">
                        <div className="profile-image-container">
                            <img
                                src={marketingCard.profileImage}
                                alt={marketingCard.name}
                                className="profile-image"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="profile-placeholder" style={{ display: 'none' }}>
                                <span className="placeholder-text">
                                    {marketingCard.name.split(' ').map(n => n[0]).join('')}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="content-section">
                        <div className="name-field">{marketingCard.name}</div>
                        <div className="title-field">{marketingCard.title}</div>

                        <div className="divider"></div>

                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon"><FaEnvelope /></span>
                                <span>{marketingCard.email}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon"><FaPhone /></span>
                                <span>{marketingCard.phone}</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon"><FaGlobe /></span>
                                <span>{marketingCard.website}</span>
                            </div>
                        </div>

                        <div className="skills-section">
                            {marketingCard.skills.map((skill, index) => {
                                const IconComponent = skillIcons[skill] || FaChartLine;
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
