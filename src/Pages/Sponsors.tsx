import Footer from '@/Components/Other/Footer';
import { useNavigate } from 'react-router-dom';
import BubbleSponsors from '@/Components/ui/BubbleSponsors';

const Sponsors = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen">
            {/* Teal Blur Background - Fixed positioning for scroll - Responsive */}
            <div className="w-[800px] h-[800px] md:w-[1286px] md:h-[1286px] bg-gradient-to-b from-slate-950/90 to-[#246485] rounded-full blur-[253.95px] fixed -top-[400px] left-[10px] md:-top-[800px] md:left-[120px] z-0" />

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
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-cattedrale text-white z-10 text-center">
                        Past Sponsors
                    </h1>

                    {/* Interactive Bubble UI for Sponsors */}
                    {/* <div className="w-full max-w-7xl z-10"> */}
                    <BubbleSponsors className="w-full" />
                    {/* </div> */}

                    {/* Instructions */}
                    <div className="text-center z-10">
                        <p className="text-white/70 text-lg mb-2">
                            🖱️ Drag to explore • 👆 Click to select
                        </p>
                        <p className="text-white/50 text-sm">
                            Interactive bubble interface showcasing our amazing
                            sponsors
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Sponsors;
