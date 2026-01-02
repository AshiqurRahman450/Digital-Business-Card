'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DeveloperCard from './DeveloperCard';
import MarketingCard from './MarketingCard';

export default function CardSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    const cards = useMemo(() => [
        { component: DeveloperCard, label: 'Developer' },
        { component: MarketingCard, label: 'Marketing' },
    ], []);

    const flipToCard = useCallback((newIndex) => {
        if (isFlipping || newIndex === activeIndex) return;
        setIsFlipping(true);

        // Start flip animation, change card at midpoint
        setTimeout(() => {
            setActiveIndex(newIndex);
        }, 400); // Change at halfway point of 800ms animation

        setTimeout(() => {
            setIsFlipping(false);
        }, 800);
    }, [isFlipping, activeIndex]);

    const goToNext = useCallback(() => {
        const nextIndex = (activeIndex + 1) % cards.length;
        flipToCard(nextIndex);
    }, [activeIndex, cards.length, flipToCard]);

    const goToPrev = useCallback(() => {
        const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
        flipToCard(prevIndex);
    }, [activeIndex, cards.length, flipToCard]);

    // Auto-rotate every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 10000);
        return () => clearInterval(interval);
    }, [goToNext]);

    // Memoize particle styles
    const particles = useMemo(() =>
        [...Array(6)].map((_, i) => ({
            left: `${(i * 16) + 5}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + (i % 2) * 5}s`,
        })), []
    );

    const ActiveCard = cards[activeIndex].component;

    return (
        <div className="slider-container">
            {/* Floating particles background */}
            <div className="particles">
                {particles.map((style, i) => (
                    <div key={i} className="particle" style={style} />
                ))}
            </div>

            <div className="flip-stage">
                <button
                    className="slider-btn prev"
                    onClick={goToPrev}
                    disabled={isFlipping}
                    aria-label="Previous card"
                >
                    <FaChevronLeft />
                </button>

                <div className="flip-container">
                    <div className={`flip-card ${isFlipping ? 'flipping' : ''}`}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <ActiveCard />
                            </div>
                            <div className="flip-card-back">
                                <ActiveCard />
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="slider-btn next"
                    onClick={goToNext}
                    disabled={isFlipping}
                    aria-label="Next card"
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Card indicator dots */}
            <div className="slider-dots">
                {cards.map((card, index) => (
                    <button
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => flipToCard(index)}
                        disabled={isFlipping}
                        aria-label={`Switch to ${card.label} card`}
                    >
                        <span className="dot-label">{card.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
