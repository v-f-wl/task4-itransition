'use client'

import { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [show, setShow] = useState(false)

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}

      {show && (
        <div 
          className="
            absolute -bottom-8 left-1/2 
            z-10
            px-2 py-1 
            text-black text-xs font-normal
            bg-neutral-200 
            transform -translate-x-1/2 
            rounded-md shadow-md whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;