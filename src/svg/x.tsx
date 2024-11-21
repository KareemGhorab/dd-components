import { FC } from 'react'

const X: FC<{ color?: string }> = ({ color = '#A1A5B7' }) => {
	return (
		<svg
			width="20"
			height="21"
			viewBox="0 0 20 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g clipPath="url(#clip0_308_36086)">
				<path
					d="M15.8327 5.84169L14.6577 4.66669L9.99935 9.32502L5.34102 4.66669L4.16602 5.84169L8.82435 10.5L4.16602 15.1584L5.34102 16.3334L9.99935 11.675L14.6577 16.3334L15.8327 15.1584L11.1743 10.5L15.8327 5.84169Z"
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id="clip0_308_36086">
					<rect
						width="20"
						height="20"
						fill="white"
						transform="translate(0 0.5)"
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export default X
