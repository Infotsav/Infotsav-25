import Contact from "@/Components/ContactUs/Contact";
import MapSection from "@/Components/ContactUs/MapSection";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen lg:h-screen lg:max-h-[800px] relative bg-stone-950 overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-center">
      <button
        onClick={() => navigate("/")}
        className="fixed top-8 left-8 z-30 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 group"
        aria-label="Back to Home"
      >
        <svg
          className="w-6 h-6 text-white group-hover:text-gray-200 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <img
        src="/assets/Images/ContactUs/contact-blur.svg"
        alt=""
        className="absolute w-full h-full object-cover opacity-70 z-0"
      />
      <img
        src="/assets/Images/ContactUs/top-vine.svg"
        alt=""
        className="absolute top-0 w-3/4 sm:w-1/3 -right-10 sm:-right-20 z-20"
      />
      <img
        src="/assets/Images/ContactUs/top-vine.svg"
        alt=""
        className="absolute top-0 w-3/4 sm:w-1/3 -left-10 sm:-left-20 scale-x-[-1] z-20"
      />
      <img
        src="/assets/Images/ContactUs/bottom-vine.svg"
        alt=""
        className="absolute bottom-0 w-1/2 left-0 scale-x-[-1] hidden sm:block"
      />
      <img
        src="/assets/Images/ContactUs/bottom-vine.svg"
        alt=""
        className="absolute bottom-0 w-1/2 right-0 hidden sm:block"
      />
      <h1 className="absolute top-15 sm:top-10 left-1/2 transform -translate-x-1/2 text-4xl sm:text-6xl lg:text-7xl font-cattedrale opacity-85 text-center z-30">Contact Us</h1>

      <div className="w-full h-full flex flex-col lg:flex-row lg:items-center px-4 sm:px-8 lg:px-16 relative z-20 pt-30 sm:pt-28 pb-8 lg:pt-0 lg:pb-0 gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <MapSection/>
        </div>
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 px-0 sm:px-4 lg:px-8">
          <Contact name="Sashank Gour" email="sashank@example.com" phone="930332369"/>
          <Contact name="Sashank Gour" email="sashank@example.com" phone="930332369"/>
          <Contact name="Sashank Gour" email="sashank@example.com" phone="930332369"/>
          <Contact name="Sashank Gour" email="sashank@example.com" phone="930332369"/>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
