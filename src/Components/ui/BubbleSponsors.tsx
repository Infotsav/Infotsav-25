import { useState, useEffect } from 'react';
// @ts-ignore - react-bubble-ui doesn't have TypeScript definitions
import BubbleUI from 'react-bubble-ui';
import 'react-bubble-ui/dist/index.css';
import './bubble-ui.css';
import SponsorBubble from '@/Components/ui/SponsorBubble';
import {
    PastSponsors19Page,
    PastSponsors24,
    homePageMobileViewSponsers,
} from '@/Constants/Sponsers/PastSponsors';

interface BubbleSponsorsProps {
    className?: string;
}

const BubbleSponsors: React.FC<BubbleSponsorsProps> = ({ className = '' }) => {
    const [selectedSponsor, setSelectedSponsor] = useState('');

    // Combine all sponsors from different years and categories
    const allSponsors = [
        ...homePageMobileViewSponsers,
        ...PastSponsors19Page,
        ...PastSponsors24,
    ];

    // Remove duplicates based on src URL
    const uniqueSponsors = allSponsors.filter(
        (sponsor, index, self) =>
            index === self.findIndex((s) => s.src === sponsor.src)
    );

    const options = {
        size: 200,
        minSize: 100,
        gutter: 11,
        provideProps: true,
        numCols: 9,
        fringeWidth: 60,
        yRadius: 200,
        xRadius: 170,
        cornerRadius: 75,
        showGuides: false,
        compact: true,
        gravitation: 5,
    };

    useEffect(() => {
        const bubbles = document.querySelector('._2MD0k') as HTMLElement;
        if (!bubbles) return;

        const img = document.querySelectorAll(
            '.childComponent'
        ) as NodeListOf<HTMLElement>;
        img.forEach(
            (i) =>
                ((i as any).ondragstart = () => {
                    return false;
                })
        );

        const dragspeed = 2;
        let isDown = false;
        let startX: number;
        let startY: number;
        let scrollLeft: number;
        let scrollTop: number;

        const handleMouseDown = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            isDown = true;
            bubbles.classList.add('active');
            startX = mouseEvent.pageX - bubbles.getBoundingClientRect().left;
            startY = mouseEvent.pageY - bubbles.getBoundingClientRect().top;
            scrollLeft = bubbles.scrollLeft;
            scrollTop = bubbles.scrollTop;
        };

        const handleMouseLeave = () => {
            isDown = false;
            bubbles.classList.remove('active');
        };

        const handleMouseUp = () => {
            isDown = false;
            bubbles.classList.remove('active');
        };

        const handleMouseMove = (e: Event) => {
            if (!isDown) return;
            e.preventDefault();
            const mouseEvent = e as MouseEvent;
            const x = mouseEvent.pageX - bubbles.getBoundingClientRect().left;
            const y = mouseEvent.pageY - bubbles.getBoundingClientRect().top;
            const walk = (x - startX) * dragspeed;
            const topwalk = (y - startY) * dragspeed;
            bubbles.scrollLeft = scrollLeft - walk;
            bubbles.scrollTop = scrollTop - topwalk;
        };

        bubbles.addEventListener('mousedown', handleMouseDown);
        bubbles.addEventListener('mouseleave', handleMouseLeave);
        bubbles.addEventListener('mouseup', handleMouseUp);
        bubbles.addEventListener('mousemove', handleMouseMove);

        return () => {
            bubbles.removeEventListener('mousedown', handleMouseDown);
            bubbles.removeEventListener('mouseleave', handleMouseLeave);
            bubbles.removeEventListener('mouseup', handleMouseUp);
            bubbles.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleSponsorClick = (sponsorName: string) => {
        setSelectedSponsor(sponsorName);
    };

    const children = uniqueSponsors?.map((sponsor, i) => {
        return (
            <SponsorBubble
                data={sponsor}
                className="child"
                key={i}
                setClick={handleSponsorClick}
            />
        );
    });

    return (
        <div className={`w-full ${className}`}>
            <div className="relative">
                <BubbleUI key={1} options={options} className="myBubbleUI">
                    {children}
                </BubbleUI>

                {/* Selected sponsor display */}
                {selectedSponsor && (
                    <div className="mt-8 text-center">
                        <div className="rounded-lg p-4 inline-block">
                            <p className="text-white text-lg font-medium">
                                Selected Sponsor:{' '}
                                <span className="text-blue-400">
                                    {selectedSponsor}
                                </span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BubbleSponsors;
