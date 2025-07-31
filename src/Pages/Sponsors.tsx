import HangingSponsor from "@/Components/ui/HangingSponsor";

const Sponsors = () => {
  const sponsors = [
    {
      imageURL:
        "https://imgs.search.brave.com/QH6RcKqOra0M99evP7VW3aEwyTGO0Tir7FbPZaszgQo/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL2ZyZWUv/cG5nLTI1Ni9mcmVl/LWRldmZvbGlvLWxv/Z28taWNvbi1kb3du/bG9hZC1pbi1zdmct/cG5nLWdpZi1maWxl/LWZvcm1hdHMtLWJy/YW5kLWNvbXBhbnkt/cHJvZ3JhbW1pbmct/bGFuZ3VhZ2UtbG9n/b3MtcGFjay1pY29u/cy04MzgzNzI0LnBu/Zz9mPXdlYnAmdz0x/Mjg",
      name: "Devfolio",
    },
    { imageURL: null, name: "Sponsor 2" },
    { imageURL: null, name: "Sponsor 3" },
    { imageURL: null, name: "Sponsor 4" },
    { imageURL: null, name: "Sponsor 5" },
    { imageURL: null, name: "Sponsor 6" },
    { imageURL: null, name: "Sponsor 7" },
    { imageURL: null, name: "Sponsor 8" },
    { imageURL: null, name: "Sponsor 9" },
    { imageURL: null, name: "Sponsor 10" },
    { imageURL: null, name: "Sponsor 11" },
    { imageURL: null, name: "Sponsor 12" },
    { imageURL: null, name: "Sponsor 13" },
    { imageURL: null, name: "Sponsor 14" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Fixed Teal Blur Background - Centered Horizontally */}
      <div className="fixed top-[-1000px] left-1/2 transform -translate-x-1/2 w-[1286px] h-[1286px] bg-gradient-to-b from-slate-950/90 to-teal-700/90 rounded-full blur-[253.95px] z-0 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-10 flex flex-col items-center p-10 gap-16">
        {/* Heading */}
        <h1 className="text-6xl lg:text-7xl font-cattedrale text-white text-center">
          Our Sponsors
        </h1>

        {/* Grid of Sponsors */}
        <div className="w-[1200px] max-w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {sponsors.map((sponsor, i) => (
            <div
              key={i}
              className="flex items-center justify-center font-realwood"
            >
              <HangingSponsor
                imageURL={sponsor.imageURL}
                name={sponsor.name}
                showName={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
