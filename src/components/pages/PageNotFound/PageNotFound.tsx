import React from 'react';
import { Link } from 'react-router-dom';
const PageNotFound: React.FC = () => {
	return(
	<div className="flex flex-col gap-4 items-center justify-center w-full">
			<div>Page not found :( Back to home page?</div> 
			<Link to="/" >{"<Home>"}</Link>
	</div>
	)
}
export default PageNotFound;
