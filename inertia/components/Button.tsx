import { Button } from '@nextui-org/react'

interface ButtonProps {
  type: "button" | "submit" | "reset",
  name: string,
  disabled?: boolean,
  className?: string,
  iconOnly?: boolean
}

export default function ButtonPanda({ name, type, disabled, className, iconOnly }: ButtonProps) {
  return (
      <Button
        variant={"solid"}
        isIconOnly={iconOnly}
        type={type}
        name={name}
        disabled={disabled}
        className={"bg-black dark:bg-white text-white dark:text-black" + className}
        radius={"full"}
      >{name}</Button>
  )
}
