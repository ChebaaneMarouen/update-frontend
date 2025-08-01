import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { splitIcon } from "adminlte-2-react/src/components/Utilities";

// Composant personnalisé similaire à Item mais qui gère les liens externes
const CustomItem = ({ to, external, text, icon, ...props }) => {
  // Gestion des icônes comme dans le composant Item original
  const iconClass = icon && icon.includes("fa-") ? icon : `fa-${icon}`;
  const iconSplit = splitIcon(iconClass);
  
  if (external) {
    return (
      <li className="nav-item">
        <a href={to} target="_blank" rel="noopener noreferrer" className="nav-link" {...props}>
          {icon && (
            <i className={`${iconSplit.prefix || "fas"} ${iconSplit.iconName}`}></i>
          )}
          <p>{text}</p>
        </a>
      </li>
    );
  }
  
  // Pour les liens internes, créez un élément similaire à Item
  // mais qui navigue via JavaScript
  return (
    <li className="nav-item">
      <a 
        href="#" 
        className="nav-link" 
        onClick={(e) => {
          e.preventDefault();
          window.location.href = to; // Navigation simple
        }} 
        {...props}
      >
        {icon && (
          <i className={`${iconSplit.prefix || "fas"} ${iconSplit.iconName}`}></i>
        )}
        <p>{text}</p>
      </a>
    </li>
  );
};

export default CustomItem;