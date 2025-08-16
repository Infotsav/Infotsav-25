import React, { useEffect, useRef } from "react";
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
  // Horizontal scroll state/refs
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isProgrammaticScroll = useRef(false);
  const rafId = useRef<number | null>(null);

  // Compute scrollLeft to center a specific card index
  const getScrollLeftForIndex = (idx: number) => {
    const scroller = scrollerRef.current;
    const el = itemRefs.current[idx];
    if (!scroller || !el) return 0;
    const left = el.offsetLeft - (scroller.clientWidth - el.clientWidth) / 2;
    return Math.max(0, left);
  };

  const scrollToIndex = (idx: number, smooth = true) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    isProgrammaticScroll.current = true;
    scroller.scrollTo({
      left: getScrollLeftForIndex(idx),
      behavior: smooth ? "smooth" : "auto",
    });
    window.setTimeout(() => (isProgrammaticScroll.current = false), 400);
  };

  const autoScroll = () => {
    const next = (currentIndex + 1) % cards.length;
    setCurrentIndex(next);
    scrollToIndex(next);
  };

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
    // align scroll to initial index
    scrollToIndex(currentIndex, false);

    // Cleanup on unmount
    return () => {
      stopAutoScroll();
    };
  }, []);

  // Restart auto-scroll when currentIndex changes and sync scroll
  useEffect(() => {
    startAutoScroll();
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  const goToPrevious = () => {
    const next = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
    setCurrentIndex(next);
    scrollToIndex(next);
    resetAutoScroll(); // Reset timer on manual navigation
  };

  const goToNext = () => {
    const next = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(next);
    scrollToIndex(next);
    resetAutoScroll(); // Reset timer on manual navigation
  };

  // Update currentIndex based on scroll position
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const onScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const center = scroller.scrollLeft + scroller.clientWidth / 2;
        let nearest = 0;
        let min = Infinity;
        itemRefs.current.forEach((el, idx) => {
          if (!el) return;
          const elCenter = el.offsetLeft + el.clientWidth / 2;
          const d = Math.abs(elCenter - center);
          if (d < min) {
            min = d;
            nearest = idx;
          }
        });
        if (nearest !== currentIndex) setCurrentIndex(nearest);
      });
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [currentIndex, setCurrentIndex, cards.length]);

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

        {/* Cards wrapper - horizontal scroll with snap */}
        <div className="relative h-full w-full">
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex h-full w-full items-center overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 px-6"
            onMouseDown={stopAutoScroll}
            onTouchStart={stopAutoScroll}
            onTouchEnd={startAutoScroll}>
            {cards.map((card, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                id={getCardId(idx)}
                className={`snap-center shrink-0 h-[360px] sm:h-[460px] md:h-[560px] w-[78vw] sm:w-[420px] md:w-[520px] transition-transform duration-300 ${
                  idx === currentIndex
                    ? "scale-[1.03]"
                    : "scale-[0.96] opacity-90"
                }`}>
                <Card
                  id={getCardId(idx)}
                  title={card.title}
                  description={card.description}
                  onRegister={() => handleRegister(idx)}
                />
              </div>
            ))}
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
              setCurrentIndex(idx);
              scrollToIndex(idx);
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
