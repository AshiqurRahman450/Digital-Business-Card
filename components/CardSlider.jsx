'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import DeveloperCard from './DeveloperCard';
import MarketingCard from './MarketingCard';

export default function CardSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const cards = useMemo(() => [
        { component: DeveloperCard, label: 'Developer' },
        { component: MarketingCard, label: 'Marketing' },
    ], []);

    const flipToCard = useCallback((newIndex) => {
        if (isFlipping || newIndex === activeIndex) return;
        setIsFlipping(true);

        setTimeout(() => {
            setActiveIndex(newIndex);
        }, 400);

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

    // Swipe detection
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                // Swiped left - go to next
                goToNext();
            } else {
                // Swiped right - go to previous
                goToPrev();
            }
        }
    };

    // Mouse swipe for desktop
    const handleMouseDown = (e) => {
        touchStartX.current = e.clientX;
    };

    const handleMouseUp = (e) => {
        const diff = touchStartX.current - e.clientX;
        const minSwipeDistance = 50;

        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }
    };

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

            <div
                className="flip-stage"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
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
            </div>

            {/* Swipe hint */}
            <p className="swipe-hint">
                <span className="swipe-icon">👈</span>
                Swipe to switch cards
                <span className="swipe-icon">👉</span>
            </p>

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
