import React from 'react'

type ButtonProps = {
  label: React.ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}

const Button = ({label, ariaLabel, onClick} : ButtonProps) => {
  return (
    <button onClick={onClick} aria-label={ariaLabel} className='p-5 border border-key-border bg-key-number text-text-primary text-2xl flex-1 flex items-center justify-center hover:opacity-60'>
        {label}
    </button>
  )
}

export default Button
