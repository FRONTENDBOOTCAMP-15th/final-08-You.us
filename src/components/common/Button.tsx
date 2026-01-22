import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'disabled'
  className?: string
  disabled?: boolean
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) {
  // 기본 버튼 색상/크기 클래스
  const baseClasses = ` px-[var(--spacing-button-x)] 
    py-[var(--spacing-button-y)] 
    font-pretendard rounded-lg 
    font-medium
    text-body-md
    transition-colors
     disabled:opacity-50
      disabled:cursor-not-allowed 
      cursor-pointer`
  
  
  const appliedVariant = disabled ? 'disabled' : variant
  

  const variantStyle = {
    primary: 'bg-primary  text-gray-50 hover:bg-primary-hover ',
    disabled: 'bg-gray-300 text-gray-50 text-gray-50 ',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantStyle[appliedVariant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
