import React from 'react'
import { Input } from '@nextui-org/input'

interface InputProps {
  label: string,
  required?: boolean,
  type: string,
  name: string,
  value?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  error?: string,
  className?: string,
  autoFocus?: boolean,
  placeholder?: string
}

export default function InputPanda({
                                     label,
                                     required,
                                     type,
                                     name,
                                     value,
                                     onChange,
                                     error,
                                     className,
                                     autoFocus,
                                     placeholder
                                   }: InputProps) {
  return (
    <div className={'space-y-1 w-full'}>
      <span className={'text-red-500 text-xs'}>{error}</span>
      <Input
        placeholder={placeholder}
        autoFocus={autoFocus}
        label={label}
        variant={'flat'}
        required={required}
        type={type}
        name={name}
        value={value}
        color={error ? 'danger' : 'primary'}
        onChange={onChange}
        errorMessage={error}
        className={className}
        fullWidth
      />
    </div>
  )
}
