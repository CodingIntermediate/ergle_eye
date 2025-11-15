import type { SVGProps } from "react";

export function ReactIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
      <circle cx="0" cy="0" r="2.05" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function JavaScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 32 32">
      <path fillRule="evenodd" d="M0 0h32v32H0V0Z" fill="#f7df1e"/>
      <path d="m21.021 24.36c.338.675.908 1.127 1.71 1.127.765 0 1.292-.338 1.292-.986 0-.675-.453-1.024-1.365-1.404l-.675-.299c-1.218-.527-2.012-1.254-2.012-2.65 0-1.442 1.144-2.502 2.825-2.502 1.404 0 2.322.637 2.825 1.631l-1.442.854c-.264-.527-.637-.816-1.383-.816-.638 0-1.024.337-1.024.816 0 .527.338.815 1.218 1.164l.675.338c1.553.675 2.16 1.329 2.16 2.76 0 1.78-.113 3.033-3.927 3.033-1.78 0-3.144-.765-3.686-1.93l1.553-.854Zm-7.84-8.242h2.272c0-1.062-.075-2.427-.075-2.427h.076c.727 1.211 1.83 2.05 3.25 2.05.58 0 1.1-.096 1.54-.287l.45-1.769c-.414.155-.91.233-1.43.233-1.12 0-2.1-.655-2.61-1.572h-1.54Z"/>
    </svg>
  );
}

export function FirebaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 32 32">
       <path d="M4.322 28.537l.63-18.905L16 2.08l11.048 7.552.63 18.905-11.678-5.38z" fill="#ffca28"/>
      <path d="M16 9.632l-6.952 13.525L16 28.537l6.952-5.38z" fill="#f57c00"/>
      <path d="M4.322 28.537L16 9.632v18.905l-11.678-5.38z" fill="#ffa000"/>
      <path d="M4.952 9.632L16 2.08v7.552z" fill="#ffc107"/>
    </svg>
  );
}

export function MernIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 100 40" >
      <text x="50" y="25" fontFamily="Space Grotesk, sans-serif" fontSize="24" fill="currentColor" textAnchor="middle" fontWeight="bold">MERN</text>
    </svg>
  )
}
