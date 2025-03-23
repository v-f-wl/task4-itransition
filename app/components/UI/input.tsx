'use client'
import { useState } from "react";
import IEye from "../icons/eye-icon";
import IHideEye from "../icons/hide-eye-icon";

interface InputProps{
  type: string;
  name: string;
  icon?: string;
  changeValue: ( e: React.ChangeEvent<any>) => void;
  value: string;
  label: string;
  id:string;
  error: boolean | undefined;
  helperText: string | false | undefined;
}

export const Input = ({
  type,
  name,
  icon,
  changeValue,
  value,
  label,
  id,
  error,
  helperText
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return ( 
    <div className="w-full">
      <div className='font-medium'>{label}</div>
      <div className="relative">
        <input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={(e) => changeValue(e)}
          autoComplete="off"
          className={`
            ${error && 'border-red-500'}
            w-full
            p-2 cursor-pointer pr-8
            border-2 border-neutral-300 rounded-lg focus:outline-blue-500
            `}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <IEye/> : <IHideEye/>}
            </button>
          )}
      </div>
      {icon && icon}
      <div className='text-red-400'>{helperText && helperText}</div>
    </div>
  )
}