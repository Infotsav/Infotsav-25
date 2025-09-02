import useMobileMenuStore from "@/stores/MobileMenuStore";
import { X } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = () => {
    const menuOptions = [
        { label: "Home", href: "/" },
        { label: "Events", href: "/events" },
        { label: "Sponsors", href: "/sponsors" },
        { label: "Ambassador", href: "/ambassador" },
        { label: "Contact Us", href: "/contact" },
    ];
    useEffect(() => {
        // Disable scroll when menu is open
        document.body.style.overflow = "hidden";

        return () => {
            // Re-enable scroll when menu unmounts
            document.body.style.overflow = "auto";
        };
    }, []);
    const toggleMobileMenu = useMobileMenuStore(state => state.toggleMobileMenu);
  return (
    <div className="w-screen h-screen fixed bg-black/70 backdrop-blur-md z-50 top-0 flex flex-col justify-center items-center gap-10">
        <X className="absolute top-5 right-5 cursor-pointer" size={30} onClick={() => useMobileMenuStore.getState().toggleMobileMenu()} />
        {
            menuOptions.map((option, index) => <NavLink to={option.href} className={'font-realwood text-4xl'} key={index} onClick={()=>toggleMobileMenu()}>{option.label}</NavLink>)
        }
    </div>
  )
}

export default MobileMenu