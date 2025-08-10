import {
    PastSponsors19,
    PastSponsors24,
} from '@/Constants/Sponsers/PastSponsors';
import Footer from '@/Components/Other/Footer';
import { useNavigate } from 'react-router-dom';
// import SponsersPageUi from '@/Components/ui/SponsersPageUi';
import BoltSponsers from '@/Components/ui/BoltSponsers';

const Sponsors = () => {
    // Combine all sponsors from both years
    const allSponsors = [...PastSponsors19, ...PastSponsors24];
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen">
            {/* Teal Blur Background - Fixed positioning for scroll - Responsive */}
            <div className="w-[800px] h-[800px] md:w-[1286px] md:h-[1286px] bg-gradient-to-b from-slate-950/90 to-teal-700/90 rounded-full blur-[253.95px] fixed -top-[400px] left-[10px] md:-top-[800px] md:left-[120px] z-0" />

            {/* Back Arrow Button */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-8 left-8 z-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 group"
                aria-label="Back to Home">
                <svg
                    className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div className="py-16">
                <div className="flex flex-col items-center gap-16 px-8">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-cattedrale text-white z-10">
                        Our Sponsors
                    </h1>

                    {/* Sponsors Grid - 2 per row on mobile, 4 on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-16">
                        {allSponsors.map((sponsor) => (
                            <BoltSponsers sponsor={sponsor} />
                        ))}
                    </div>
                    {/* <div className="w-full max-w-6xl z-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                            {allSponsors.map((sponsor, index) => (
                                <div
                                    key={index}
                                    className="flex justify-center">
                                    {/* <SponsersPageUi
                                        imageURL={sponsor.src}
                                        alt={sponsor.name}
                                    /> /////*}
                                    <BoltSponsers sponsor={sponsor} />
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Sponsors;
