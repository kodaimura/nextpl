import React, {useState} from 'react';


export const Header = (props: {
	rightContent: React.ReactNode
}) => {
	const [isActive, setIsActive] = useState(false);


	return (
		<header className="navbar is-dark mb-3">
			<div className="navbar-brand">
				<a className="navbar-item is-size-4" href="/">REACTPL</a>
				<div onClick={() => {setIsActive(!isActive);}} 
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					data-target="navbarBurgers" 
					aria-expanded="false"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</div>
			</div>
			<div className={`navbar-menu ${isActive ? "is-active" : ""}`}
				id="navbarBurgers" 
			>
				<div className="navbar-end">
					<div className="navbar-item">{props.rightContent}</div>
				</div>
			</div>
		</header>
	);
}