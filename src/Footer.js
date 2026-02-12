import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/letter" className="letter-container">
        <FaEnvelope className="letter-icon" />
        <p className="open-text">Open me</p>
      </Link>
    </footer>
  );
};

export default Footer;
