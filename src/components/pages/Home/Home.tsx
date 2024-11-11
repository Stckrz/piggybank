import AccountList from '@/components/Accounts/AccountList/AccountList';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
	const [cookie] = useCookies(["userInfo"]);
	const navigate = useNavigate();
	useEffect(() => {
		if (!cookie.userInfo?.userName) {
			navigate('/login');
		}
	}, [cookie, navigate])
	console.log(cookie.userInfo)
	return (
		<div className="w-full flex items-start justify-center .main-color">
			<AccountList />
		</div>
	)
}
export default Home;
