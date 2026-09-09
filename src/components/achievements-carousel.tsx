"use client";

import { useEffect, useRef, useState } from "react";
import "../styles/achievements-carousel.css";

export interface AchievementItem {
    id: string;
    title: string;
    description: string;
    rating: number; // 1-5
    image?: string; // path to certificate/proof image; omit for placeholder
}

interface AchievementsCarouselProps {
    achievements: AchievementItem[];
    radius?: number; // px distance from center axis, default matches reference
}

export default function AchievementsCarousel({
    achievements,
    radius = 520,
}: AchievementsCarouselProps) {
    const angleStep = 360 / achievements.length;

    // Continuously-accumulating rotation (degrees keep going negative, like the reference)
    const rotationRef = useRef(0);
    const [rotation, setRotation] = useState(0);
    const isPausedRef = useRef(false);
    const rafRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);

    const [flippedId, setFlippedId] = useState<string | null>(null);

    // −18 deg/s → one full revolution every ~20 s
    const SPEED = -18 / 1000; // deg per ms

    useEffect(() => {
        const tick = (now: number) => {
            if (lastTimeRef.current !== null && !isPausedRef.current) {
                const delta = now - lastTimeRef.current;
                rotationRef.current += SPEED * delta;
                setRotation(rotationRef.current);
            }
            lastTimeRef.current = now;
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
    }, []);

    const pause = () => { isPausedRef.current = true; lastTimeRef.current = null; };
    const resume = () => { isPausedRef.current = false; };

    // Derive which card is in front from the live accumulated rotation
    const normalizedDeg = (((-rotation) % 360) + 360) % 360;
    const frontIndex = Math.round(normalizedDeg / angleStep) % achievements.length;

    // Snap to a target card without resetting the accumulated degree count
    const snapToIndex = (newIndex: number) => {
        const currentDeg = rotationRef.current;
        const targetBase = -(newIndex * angleStep);
        const cycles = Math.round((currentDeg - targetBase) / 360);
        const best = targetBase + cycles * 360;
        rotationRef.current = best;
        setRotation(best);
    };

    const goPrev = () => {
        snapToIndex((frontIndex - 1 + achievements.length) % achievements.length);
        setFlippedId(null);
    };
    const goNext = () => {
        snapToIndex((frontIndex + 1) % achievements.length);
        setFlippedId(null);
    };

    return (
        <div
            className="achievements-carousel-container"
            style={{ perspective: "2400px" }}
            onMouseEnter={pause}
            onMouseLeave={() => { setFlippedId(null); resume(); }}
        >
            <div
                className="achievements-carousel-deck"
                style={{
                    transform: `rotateY(${rotation}deg)`,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.1s linear",
                }}
            >
                {achievements.map((item, i) => {
                    const cardAngle = i * angleStep;
                    const isFront = i === frontIndex;
                    const isFlipped = flippedId === item.id;

                    return (
                        <div
                            key={item.id}
                            className="achievement-card-wrapper"
                            style={{
                                transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                                opacity: isFront ? 1 : 0.9,
                                transition: "opacity 0.3s",
                            }}
                            onMouseEnter={() => setFlippedId(item.id)}
                            onMouseLeave={() =>
                                setFlippedId((cur) => (cur === item.id ? null : cur))
                            }
                            onClick={() =>
                                setFlippedId((cur) => (cur === item.id ? null : item.id))
                            }
                        >
                            <div
                                className="achievement-card-inner"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transition: "transform 0.5s ease-in-out",
                                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                                }}
                            >
                                {/* Front face */}
                                <div className="achievement-card-front" style={{ backfaceVisibility: "hidden" }}>
                                    <div className="achievement-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <div className="achievement-rating">
                                            {"⭐".repeat(item.rating)}
                                        </div>
                                    </div>
                                    <small className="achievement-hint">Hover to view certificate</small>
                                </div>

                                {/* Back face */}
                                <div
                                    className="achievement-card-back"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={`${item.title} certificate`}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <div className="achievement-placeholder">
                                            <p>Certificate placeholder</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={goPrev}
                aria-label="Previous achievement"
                className="achievement-nav-button achievement-nav-prev"
            >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={goNext}
                aria-label="Next achievement"
                className="achievement-nav-button achievement-nav-next"
            >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
