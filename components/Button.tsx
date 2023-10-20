import { MouseEventHandler } from "react"
import Image from "next/image"
import { text } from "stream/consumers"

type Props = {
	title:string,
	leftIcon?: string | null,
	rightIcon ?: string | null,
	handleClick?: MouseEventHandler,
	isSubmitting?: boolean,
	type?: 'button' | 'submit',
	bgColor?: string,
	textColor?:string,
}
const Button = ({title, leftIcon, rightIcon, handleClick, isSubmitting, type, bgColor, textColor}: Props) => {
  return (
	<button
	type={type}

	disabled={isSubmitting}
	className={`flexCenter gap-3 px-4 py-3
	${textColor ? textColor : 'text-white'}
	${isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'} rounded-xl text-sm font-medium max-md:w-full
	`}
	onClick={handleClick}
	>
		{leftIcon && <Image alt="left" src={leftIcon} width={14} height={14} />}
		{title}
		{rightIcon && <Image alt="right" src={rightIcon} width={14} height={14} />}

	</button>  )
}

export default Button
