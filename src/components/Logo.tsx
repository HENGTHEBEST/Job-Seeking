import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg
      id="juoykhmer-svg-logo"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circular background gradient */}
      <circle cx="250" cy="250" r="235" fill="url(#bg-gradient)" stroke="#e2e8f0" strokeWidth="2" />

      {/* Outer Blue Ring & Swoosh Arrow */}
      <path
        d="M 120,400 C 60,340 50,230 100,140 C 140,70 230,40 310,80 C 340,95 365,115 380,135"
        stroke="#1d4ed8"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 140,405 C 190,445 280,455 350,420 C 420,380 450,290 430,210 C 425,190 415,170 405,155"
        stroke="#1e40af"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Accent Inner Swoosh pointing to the Star */}
      <path
        d="M 160,250 C 170,170 220,110 305,92"
        stroke="#3b82f6"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Angkor Wat Silhouette at the bottom (solid deep navy) */}
      {/* Base curve matching the circle and 3 main towers */}
      <path
        d="M 80,410 
           C 120,430 180,445 250,445 
           C 320,445 380,430 420,410 
           L 415,395
           L 375,395 L 375,375 L 365,375 L 365,395
           L 340,395 
           /* Left Tower */
           L 340,350 L 330,350 L 330,320 L 320,320 L 320,295 L 315,295 L 315,280 L 311,280 L 311,265 L 309,265 L 309,255 L 307,255 L 307,265 L 305,265 L 305,280 L 301,280 L 301,295 L 296,295 L 296,320 L 286,320 L 286,350 L 275,350 L 275,395
           L 265,395
           /* Center Tower */
           L 265,320 L 258,320 L 258,285 L 252,285 L 252,255 L 248,255 L 248,235 L 245,235 L 245,215 L 241,215 L 241,200 L 239,200 L 239,215 L 235,215 L 235,235 L 232,235 L 232,255 L 228,255 L 228,285 L 222,285 L 222,320 L 215,320 L 215,395
           L 205,395
           /* Right Tower */
           L 205,350 L 195,350 L 195,320 L 185,320 L 185,295 L 180,295 L 180,280 L 176,280 L 176,265 L 174,265 L 174,255 L 172,255 L 172,265 L 170,265 L 170,280 L 166,280 L 166,295 L 161,295 L 161,320 L 151,320 L 151,350 L 140,350 L 140,395
           L 125,395 L 125,375 L 115,375 L 115,395
           L 85,395 Z"
        fill="#0f172a"
      />

      {/* Styled Golden Human Figure (Left, smaller, curve of hope) */}
      <g id="gold-figure">
        {/* Head */}
        <circle cx="205" cy="225" r="22" fill="#fbbf24" />
        {/* Body & limbs in single dynamic path */}
        <path
          d="M 160,320 
             C 170,290 180,260 205,250 
             C 215,245 225,252 220,265 
             C 212,285 195,310 180,335 
             C 170,350 162,340 160,320 Z"
          fill="#f59e0b"
        />
        <path
          d="M 215,255 
             C 230,270 245,290 250,310 
             C 252,318 244,324 238,318 
             C 225,305 210,285 200,270 Z"
          fill="#d97706"
        />
      </g>

      {/* Styled Blue Human Figure (Center, larger, reaching for the star) */}
      <g id="blue-figure">
        {/* Head */}
        <circle cx="250" cy="190" r="26" fill="#3b82f6" />
        {/* Reaching arm & upper body */}
        <path
          d="M 240,225 
             C 255,215 270,185 305,145 
             C 310,138 318,142 314,150 
             C 295,190 275,225 260,240 Z"
          fill="#1d4ed8"
        />
        {/* Main Body & sweeping leg */}
        <path
          d="M 240,225
             C 225,240 215,270 190,340
             C 186,350 196,355 202,345
             C 230,295 255,275 275,255
             C 285,245 270,230 240,225 Z"
          fill="#1e40af"
        />
        {/* Left Leg */}
        <path
          d="M 255,255
             C 265,270 280,295 285,315
             C 287,322 278,328 272,322
             C 260,310 248,285 240,265 Z"
          fill="#2563eb"
        />
      </g>

      {/* The Golden 5-Pointed Star (Glowing, top-right) */}
      <g id="star-and-glow">
        {/* Star Glow */}
        <circle cx="315" cy="135" r="35" fill="#fef08a" opacity="0.45" />
        {/* The Star */}
        <path
          d="M 315,102 
             L 324,121 
             L 345,124 
             L 330,139 
             L 334,160 
             L 315,150 
             L 296,160 
             L 300,139 
             L 285,124 
             L 306,121 Z"
          fill="#fbbf24"
          stroke="#f59e0b"
          strokeWidth="3"
        />
        {/* Highlight star rays */}
        <line x1="315" y1="92" x2="315" y2="82" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
        <line x1="353" y1="135" x2="363" y2="135" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
        <line x1="340" y1="110" x2="348" y2="102" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
        <line x1="290" y1="110" x2="282" y2="102" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
      </g>

      <defs>
        <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </radialGradient>
      </defs>
    </svg>
  );
}
