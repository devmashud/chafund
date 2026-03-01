import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-white flex justify-center items-center px-4
    h-15"
    >
      <p className="text-center">
     © {new Date().getFullYear()} ChaFund. All rights reserved.      </p>
    </footer>
  );
};

export default Footer;
