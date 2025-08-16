import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import ArrowNavButton from "./ArrowNavButton";

interface CardData {
  title: string;
  description: string;
}

interface DomainProps {
  domainName: string;
  cards: CardData[];
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}

const Domain: React.FC<DomainProps> = ({
  domainName,
  cards,
  currentIndex,
  setCurrentIndex,
}) => {
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [hasInteracted, setHasInteracted] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll function
  const autoScroll = () => {
    setDirection("right");
    setHasInteracted(true);
    setCurrentIndex((currentIndex + 1) % cards.length);
  };

  // Start auto-scroll timer
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    autoScrollIntervalRef.current = setInterval(autoScroll, 10000); // 10 seconds
  };

  // Stop auto-scroll timer
  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  // Reset auto-scroll timer (called on manual navigation)
  const resetAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  // Initialize auto-scroll on mount
  useEffect(() => {
    startAutoScroll();

    // Cleanup on unmount
    return () => {
      stopAutoScroll();
    };
  }, []);

  // Restart auto-scroll when currentIndex changes
  useEffect(() => {
    startAutoScroll();
  }, [currentIndex]);

  const goToPrevious = () => {
    setDirection("right");
    setHasInteracted(true);
    setCurrentIndex(currentIndex === 0 ? cards.length - 1 : currentIndex - 1);
    resetAutoScroll(); // Reset timer on manual navigation
  };

  const goToNext = () => {
    setDirection("left");
    setHasInteracted(true);
    setCurrentIndex(currentIndex === cards.length - 1 ? 0 : currentIndex + 1);
    resetAutoScroll(); // Reset timer on manual navigation
  };

  const leftIndex = (currentIndex - 1 + cards.length) % cards.length;
  const rightIndex = (currentIndex + 1) % cards.length;

  // Helper to generate unique card IDs
  const getCardId = (idx: number) =>
    `${domainName.replace(/\s+/g, "-").toLowerCase()}-card-${idx}`;

  // Placeholder register handler
  const handleRegister = (cardIdx: number) => {
    alert(`Register for ${cards[cardIdx].title}`);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-[5vw] text-center text-gray-200 font-cattedrale tracking-wide mb-0">
        {domainName}
      </h2>
      <div className="mt-1 sm:mt-0.5" />

      {/* Carousel container */}
      <div
        className="relative h-[400px] sm:h-[520px] md:h-[600px] w-[98vw] sm:w-[90%] max-w-[1400px] flex items-center justify-center overflow-x-hidden"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}>
        {/* Fade overlays - hidden on mobile, narrower on sm */}
        <div
          className="hidden sm:block pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-16 md:w-32 z-20"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="hidden sm:block pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-16 md:w-32 z-20"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Left nav button - always at side, smaller on mobile */}
        <div className="absolute left-1 sm:left-8 top-1/2 -translate-y-1/2 z-30">
          <div className="w-10 h-10 sm:w-12 sm:h-12">
            <ArrowNavButton direction="left" onClick={goToPrevious} />
          </div>
        </div>

        {/* Cards wrapper */}
        <div className="flex items-center justify-center h-full w-full relative">
          {/* Left card - hide on mobile */}
          <div
            className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 h-[260px] sm:h-[360px] md:h-[460px] w-[160px] sm:w-[240px] md:w-[320px] scale-95 opacity-70 transition-all duration-500 ease-out"
            style={{ left: "-24px" }}>
            <Card
              id={getCardId(leftIndex)}
              title={cards[leftIndex].title}
              description={cards[leftIndex].description}
              onRegister={() => handleRegister(leftIndex)}
            />
          </div>

          {/* Center card - responsive size, narrower on mobile */}
          <div
            key={currentIndex}
            className={`relative z-20 h-[360px] sm:h-[460px] md:h-[560px] w-[86vw] max-w-[98vw] sm:w-[420px] md:w-[520px] mx-auto transition-all duration-500 ease-out px-2 ${
              hasInteracted
                ? direction === "right"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
                : ""
            }`}>
            <Card
              id={getCardId(currentIndex)}
              title={cards[currentIndex].title}
              description={cards[currentIndex].description}
              onRegister={() => handleRegister(currentIndex)}
            />
          </div>

          {/* Right card - hide on mobile */}
          <div
            className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 h-[260px] sm:h-[360px] md:h-[460px] w-[160px] sm:w-[240px] md:w-[320px] scale-95 opacity-70 transition-all duration-500 ease-out"
            style={{ right: "-24px" }}>
            <Card
              id={getCardId(rightIndex)}
              title={cards[rightIndex].title}
              description={cards[rightIndex].description}
              onRegister={() => handleRegister(rightIndex)}
            />
          </div>
        </div>

        {/* Right nav button - always at side, smaller on mobile */}
        <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30">
          <div className="w-10 h-10 sm:w-12 sm:h-12">
            <ArrowNavButton direction="right" onClick={goToNext} />
          </div>
        </div>
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-center items-center -mt-2 space-x-3">
        {cards.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 border-2 border-white ${
              currentIndex === idx
                ? "bg-white scale-110 shadow"
                : "bg-gray-400 opacity-60"
            }`}
            onClick={() => {
              setDirection(idx < currentIndex ? "right" : "left");
              setHasInteracted(true);
              setCurrentIndex(idx);
              resetAutoScroll();
            }}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Domain;
