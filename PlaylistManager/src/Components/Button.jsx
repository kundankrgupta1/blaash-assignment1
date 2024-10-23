

const Button = ({ border_color, bg_color, text_color, padding, onClick, icon, text }) => {
	return (
		<button
			className={`
				text-sm flex justify-center items-center gap-2 capitalize border-[1px] rounded-lg 
				${border_color}
				${bg_color}
				${text_color}
				${padding}
			`}
			onClick={onClick}
		>
			{icon}
			{text}
		</button>
	)
}

export default Button