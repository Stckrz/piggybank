import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import { useCookies } from 'react-cookie'
import { Outlet } from 'react-router-dom'
const Layout: React.FC = () => {
	const [cookie] = useCookies(['userInfo']); 
	console.log(cookie)
	return (
		<div className="bg-black min-h-screen flex flex-col text-white items-center justify-center text-3xl main-color">
			{cookie?.userInfo?.userName &&
			<Navbar />
			}
			<div className="flex flex-grow w-full h-5/6">
				<Outlet />
			</div>
		</div>
	)
}
export default Layout
