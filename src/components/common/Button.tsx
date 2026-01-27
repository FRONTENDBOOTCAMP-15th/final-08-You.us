import { ReactNode } from 'react'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        // Title
        'text-title-lg',
        'text-title-md',
        'text-title-sm',
        // Body
        'text-body-lg',
        'text-body-md',
        'text-body-sm',
        // UI
        'text-button',
        'text-caption',
      ],
    },
  },
})

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'disabled' | 'update'
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
  const baseStyles = `px-[var(--spacing-button-x)] py-[0.1rem] font-pretendard rounded-lg font-bold transition-colors `

  const appliedVariant = disabled ? 'disabled' : variant

  const variantStyle = {
    primary: 'cursor-pointer bg-primary  text-gray-50 hover:bg-primary-hover ',
    disabled: ' opacity-50 cursor-not-allowed bg-gray-300 text-gray-50 ',
    update:
      'cursor-pointer border border-solid border-red-800 text-primary bg-gray-50 ',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(baseStyles, variantStyle[appliedVariant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
