import Contact from "@/Components/ContactUs/Contact";
import MapSection from "@/Components/ContactUs/MapSection";

const ContactUs = () => {
  return (
    <div className="w-full h-dvh lg:max-h-[800px]  relative bg-stone-950 overflow-hidden flex items-center justify-center">
      <img
        src="/assets/Images/ContactUs/contact-blur.svg"
        alt=""
        className="absolute w-full h-full object-cover opacity-70 z-0"
      />
      <img
        src="/assets/Images/ContactUs/top-vine.svg"
        alt=""
        className="absolute top-0 w-1/3 max-sm:w-full -right-20 z-20"
      />
      <img
        src="/assets/Images/ContactUs/top-vine.svg"
        alt=""
        className="absolute top-0 w-1/3 max-sm:w-full -left-20 scale-x-[-1] z-20"
      />
      <img
        src="/assets/Images/ContactUs/bottom-vine.svg"
        alt=""
        className="absolute bottom-0 w-1/2 left-0 scale-x-[-1]"
      />
      <img
        src="/assets/Images/ContactUs/bottom-vine.svg"
        alt=""
        className="absolute bottom-0 w-1/2 right-0"
      />
      <h1 className="top-10 max-sm:top-15 absolute text-7xl max-sm:text-7xl font-cattedrale opacity-85">Contact Us</h1>

      <div className="w-full h-full flex items-center px-15 max-sm:px-5 relative z-20 max-sm:flex-col max-sm:h-auto    max-sm:gap-5">
        <MapSection/>
        <div className="w-full grid grid-cols-2 gap-y-10 px-10 max-sm:px-0">
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
