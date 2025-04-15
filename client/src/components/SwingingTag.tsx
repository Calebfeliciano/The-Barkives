import React, { useState } from "react";
import "../styles/Collar.css"; // Adjust the path as needed

interface SwingingTagProps {
  name: string;
}

const SwingingTag: React.FC<SwingingTagProps> = ({ name }) => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div
      className={`swing-container ${isTouched ? "swing" : ""}`}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setTimeout(() => setIsTouched(false), 500)}
    >
      <svg
        width="80"
        height="100"
        viewBox="0 0 80 100"
        xmlns="http://www.w3.org/2000/svg"
        className="swing-tag"
      >
        <defs>
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>

        <line x1="40" y1="0" x2="40" y2="20" stroke="#888" strokeWidth="4" />
        <circle cx="40" cy="25" r="5" fill="#888" />

        {/* Tag */}
        <circle
          cx="40"
          cy="60"
          r="25"
          fill="url(#shine)"
          stroke="#333"
          strokeWidth="2"
          className="tag-shape"
        />

        {/* Pet Name */}
        <text
          x="40"
          y="65"
          textAnchor="middle"
          fill="#fff"
          fontSize="12"
          fontWeight="bold"
          fontFamily="Arial"
        >
          {name}
        </text>
      </svg>
    </div>
  );
};

export default SwingingTag;

