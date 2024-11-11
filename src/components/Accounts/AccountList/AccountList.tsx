import { get_accounts_by_user } from '@/lib/api/accountApi';
import { AccountModel } from '@/models/AccountModel';
import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
const AccountList: React.FC = () => {
	const [accounts, setAccounts] = useState<AccountModel[] | null>(null)
	const [cookie] = useCookies(['userInfo']);

	const fetchAccounts = useCallback(async () => {
		if (cookie.userInfo?.token) {
			const accountListResponse = await get_accounts_by_user(cookie.userInfo?.token)
			if (accountListResponse.data) {
				setAccounts(
					accountListResponse.data
				)
			}
		}
	}, [cookie.userInfo?.token])

	useEffect(() => {
		fetchAccounts()
	}, [fetchAccounts])

	return (
		<div className="flex flex-col w-full md:w-1/2 justify-between h-full">
			<div className="flex flex-col w-full">
				{accounts && accounts.length > 0 && accounts.map((account: AccountModel, index) => {
					return (
						<Link key={index} to={`/account/${account.id}`}>
							<div
								className="flex justify-between m-2 p-4 py-4 secondary-color rounded-md"
							>
								<div>
									{account.name}
								</div>
								<div>
									{account.balance}
								</div>
							</div>
						</Link>
					)
				})
				}
			</div>
			<Link to="/account/create">
				<button className="p-4 m-2 w-1/4 self-end">new</button>
			</Link>
		</div>
	)
}
export default AccountList;
