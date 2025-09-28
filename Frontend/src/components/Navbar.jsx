import React from "react";
import CardNav from "./CardNav";
import logo from "../assets/images/mlogo.png";

const Navbar = ({ user, setUser }) => {

  const items = [
    {
      label: "Home",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [{ label: "Main", to: "/#home", ariaLabel: "Go Home" }]
    },
    {
      label: "Services",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "All Services", to: "/#services", ariaLabel: "Our Services" },
        { label: "Packages", to: "/#packages", ariaLabel: "Our Packages" }
      ]
    },
    {
      label: "About",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "About Us", to: "/#about", ariaLabel: "About Parlour" },
        { label: "Contact", to: "/#contact", ariaLabel: "Contact Us" }
      ]
    }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <CardNav
        logo={logo}
        logoAlt="Mamta Beauty Parlour"
        items={items}
        user={user}
        baseColor="#0b0b0b"
        menuColor="#fff"
        buttonBgColor="#e91e63"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </div>
  );
};

export default Navbar;
