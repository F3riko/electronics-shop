import React from "react";
import { Link } from "react-router-dom";

const CustomLink = ({ to, className, children }) => {
  const linkClassName = `custom-link ${className || ""}`;
  return (
    <Link to={to} className={linkClassName}>
      {children}
    </Link>
  );
};

export default CustomLink;
