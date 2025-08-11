const AboutUs = () => {
    return (
        <section
            id="about-us"
            className="w-full h-dvh max-h-[800px] relative bg-stone-950 overflow-hidden flex items-center justify-center">
            {/* Flipped Background Image */}
            <img
                src="/assets/Images/trees-bg.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-[10] rotate-180 max-sm:-top-10 "
                loading="lazy"
            />
            {/* Background Blur Image (Teal image instead of div gradient) */}
            <img
                src="/assets/Backgrounds/bg-clouds.svg"
                alt="Blur Background"
                className="absolute left-1/2 -translate-x-1/2 h-full w-full object-cover z-[5] pointer-events-none select-none"
                loading="lazy"
            />
            {/* Black Blur - half-circle at bottom */}
            <div
                className="absolute top-[500px] left-1/2 -translate-x-1/2 w-[3000px] h-[3000px] bg-gradient-to-b from-black to-black  blur-[150px] rounded-full
   z-[30] pointer-events-none"
            />

            {/* Foreground Decorative Image */}
            <img
                className="absolute w-40 h-64 left-[318px] top-[290px] origin-top-left -rotate-180 z-10 max-sm:hidden"
                src="/assets/Images/Demogorgon.png"
                alt="Demogorgon"
                loading="lazy"
            />
            {/* Text Content - Centered */}
            <div className="relative z-50 max-w-5xl px-6 text-center flex flex-col items-center justify-center">
                <h2 className="text-red-600 text-6xl md:text-7xl lg:text-8xl font-cattedrale mb-6">
                    About Us
                </h2>
                <p className="text-white text-base md:text-lg lg:text-xl font-naluka leading-relaxed tracking-wider">
                    Infotsav is the flagship fest of ABV-IIITM, Gwalior,
                    celebrating technology, cultural, management, and robotics.
                    It ignites creativity and fosters competition among students
                    from top institutions. Sponsored by leading tech companies,
                    it features hackathons, coding competitions, cultural
                    performances, and case studies, testing technical and
                    managerial skills.
                    <br />
                    <br />
                    More than a competition, Infotsav offers national exposure,
                    industry connections, and talent showcase. Participants can
                    win substantial prizes, but the real reward is the
                    experience and recognition. From October 10th to 12th,
                    Infotsav 2025 promises three days of competition, learning,
                    and networking for coders, managers, developers, and
                    thinkers.
                </p>
            </div>
        </section>
    );
};

export default AboutUs;
