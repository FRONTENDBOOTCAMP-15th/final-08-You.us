import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  className?: string
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        className={` border px-3 py-2 focus:outline-none ${
          error
            ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
            : 'border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:placeholder-blue-500 focus:ring-2 focus:ring-blue-500'
        } read-only:cursor-not-allowed read-only:bg-gray-200 read-only:text-gray-400 read-only:placeholder-gray-400 read-only:focus:border-gray-300 read-only:focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-300 disabled:placeholder-gray-400 disabled:focus:border-gray-300 disabled:focus:ring-0 ${className} `}
        {...props}
      />
    </div>
  )
}
