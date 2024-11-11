import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import piggy from '@/assets/Piggy_Bank.png';
import PopupSelect from '../Common/PopupSelect/PopupSelect';
import { PopupAction } from '@/models/Common/PopupSelectionModel';
import { Link } from 'react-router-dom';
const Navbar: React.FC = () => {
	const [cookie, , removeCookie] = useCookies(['userInfo']);
	const [userDropDown, setUserDropdown] = useState(false);

	const popupActions: PopupAction[] = [
		{ label: "Logout", action: () => { removeCookie("userInfo", { path: "/" }) } }
	]

	return (
		<div className="flex items-center justify-between w-full py-4 border-b border-black h-24">
			<Link className="h-full flex items-center" to="/">
				<div className="h-full w-full flex items-center">

					<img className="object-contain h-full" src={piggy} />
				</div>
			</Link>
			<div className="px-2 flex h-full">
				{cookie?.userInfo?.userName &&
					<div
						className="relative h-full flex items-center cursor-pointer"
						onClick={() => { setUserDropdown(!userDropDown) }}>
						{cookie.userInfo.userName}
						{userDropDown &&
							<PopupSelect actions={popupActions} />
						}
					</div>
				}
			</div>
		</div >
	)
}
export default Navbar;
