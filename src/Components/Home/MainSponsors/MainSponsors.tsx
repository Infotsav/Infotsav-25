import React, { useEffect, useRef, useState } from "react";
import HangingSponsor from "../../ui/HangingSponsor";

const MainSponsors: React.FC = () => {
  const topPathRef = useRef<SVGPathElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);
  const topSvgRef = useRef<SVGSVGElement>(null);
  const bottomSvgRef = useRef<SVGSVGElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [topPositions, setTopPositions] = useState<{ x: number; y: number }[]>(
    []
  );
  const [bottomPositions, setBottomPositions] = useState<
    { x: number; y: number }[]
  >([]);
  const [singleRopePositions, setSingleRopePositions] = useState<
    { x: number; y: number }[]
  >([]);

  const MOBILE_SPONSOR_COUNT = 3;
  const DESKTOP_SPONSOR_COUNT = 7;
  const VIEWBOX_WIDTH = 1000;
  const VIEWBOX_HEIGHT = 500;

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768); // md breakpoint
  };

  const updateMobilePositions = () => {
    const topPath = topPathRef.current;
    const bottomPath = bottomPathRef.current;
    const topSvg = topSvgRef.current;
    const bottomSvg = bottomSvgRef.current;

    if (!topPath || !bottomPath || !topSvg || !bottomSvg) return;

    const topRect = topSvg.getBoundingClientRect();
    const bottomRect = bottomSvg.getBoundingClientRect();
    const topPathLength = topPath.getTotalLength();
    const bottomPathLength = bottomPath.getTotalLength();
    const hangingOffset = 0;
    const margin = 0.17;

    // Top rope positions
    const newTopPositions = Array.from(
      { length: MOBILE_SPONSOR_COUNT },
      (_, i) => {
        const pct =
          margin + (i / (MOBILE_SPONSOR_COUNT - 1)) * (1 - 2 * margin);
        const point = topPath.getPointAtLength(topPathLength * pct);

        const x = (point.x / VIEWBOX_WIDTH) * topRect.width;
        const y = (point.y / VIEWBOX_HEIGHT) * topRect.height + hangingOffset;

        return { x, y };
      }
    );

    // Bottom rope positions
    const newBottomPositions = Array.from(
      { length: MOBILE_SPONSOR_COUNT },
      (_, i) => {
        const pct =
          margin + (i / (MOBILE_SPONSOR_COUNT - 1)) * (1 - 2 * margin);
        const point = bottomPath.getPointAtLength(bottomPathLength * pct);

        const x = (point.x / VIEWBOX_WIDTH) * bottomRect.width;
        const y =
          (point.y / VIEWBOX_HEIGHT) * bottomRect.height + hangingOffset;

        return { x, y };
      }
    );

    setTopPositions(newTopPositions);
    setBottomPositions(newBottomPositions);
  };

  const updateDesktopPositions = () => {
    const topPath = topPathRef.current;
    const topSvg = topSvgRef.current;
    if (!topPath || !topSvg) return;

    const rect = topSvg.getBoundingClientRect();
    const pathLength = topPath.getTotalLength();
    const hangingOffset = rect.height;
    const margin = 0.07;

    const newPositions = Array.from(
      { length: DESKTOP_SPONSOR_COUNT },
      (_, i) => {
        const pct =
          margin + (i / (DESKTOP_SPONSOR_COUNT - 1)) * (1 - 2 * margin);
        const point = topPath.getPointAtLength(pathLength * pct);

        const x = (point.x / VIEWBOX_WIDTH) * rect.width;
        const y = (point.y / VIEWBOX_HEIGHT) * rect.height + hangingOffset;

        return { x, y };
      }
    );

    setSingleRopePositions(newPositions);
  };

  const updatePositions = () => {
    if (isMobile) {
      updateMobilePositions();
    } else {
      updateDesktopPositions();
    }
  };

  useEffect(() => {
    checkMobile();
    const handleResize = () => checkMobile();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updatePositions, 100);
    window.addEventListener("resize", updatePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePositions);
    };
  }, [isMobile]);

  return (
    <section className="relative w-full h-screen max-h-[800px] bg-gradient-to-b from-black to-[#090928] text-white overflow-hidden">
      <h2 className="text-7xl max-md:text-5xl font-cattedrale text-center pt-12">
        SPONSORS
      </h2>

      {/* Eyes */}
      <div className="flex justify-center gap-12 mt-10">
        <div className="w-[13%] max-sm:w-[30%] max-md:w-[20%] aspect-square  bg-white/10 border-white/20 borde  r-[3px] rounded-full" />
        <div className="w-[13%] max-sm:w-[30%] max-md:w-[20%] aspect-square  bg-white/10 border-white/20 border-[3px] rounded-full" />
      </div>

      {/* Desktop View - Single Rope */}
      {!isMobile && (
        <>
          <svg
            ref={topSvgRef}
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            className="absolute top-[35%] left-0 w-full h-[35%] z-0"
          >
            <path
              ref={topPathRef}
              d="M 0 150 Q 500 700 1000 150"
              stroke="white"
              strokeWidth={2}
              fill="transparent"
            />
          </svg>

          {singleRopePositions.map((pos, idx) => (
            <div
              key={`desktop-${idx}`}
              className="absolute flex flex-col w-full items-center z-10"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="w-0.5 h-8 bg-white" />
              <HangingSponsor imageURL={null} />
            </div>
          ))}
        </>
      )}

      {/* Mobile View - Double Ropes */}
      {isMobile && (
        <>
          {/* Top Rope */}
          <svg
            ref={topSvgRef}
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            className="absolute top-[30%] left-0 w-full h-[20%] z-0"
          >
            <path
              ref={topPathRef}
              d="M 0 150 Q 500 400 1000 150"
              stroke="white"
              strokeWidth={2}
              fill="transparent"
            />
          </svg>

          {/* Bottom Rope */}
          <svg
            ref={bottomSvgRef}
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            className="absolute top-[55%] left-0 w-full h-[20%] z-0"
          >
            <path
              ref={bottomPathRef}
              d="M 0 150 Q 500 400 1000 150"
              stroke="white"
              strokeWidth={2}
              fill="transparent"
            />
          </svg>

          {/* Top rope sponsors */}
          {topPositions.map((pos, idx) => (
            <div
              key={`top-${idx}`}
              className="absolute flex flex-col w-full items-center z-10"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y + window.innerHeight * 0.3}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="w-0.5 h-6 bg-white" />
              <HangingSponsor imageURL={null} />
            </div>
          ))}

          {/* Bottom rope sponsors */}
          {bottomPositions.map((pos, idx) => (
            <div
              key={`bottom-${idx}`}
              className="absolute flex flex-col w-full items-center z-10"
              style={{
                left: `${pos.x}px`,
                top: `${pos.y + window.innerHeight * 0.55}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="w-0.5 h-6 bg-white" />
              <HangingSponsor imageURL={null} />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default MainSponsors;
