import TransactionList from '@/components/Transactions/TransactionList/TransactionList';
import { get_account_by_account_id } from '@/lib/api/accountApi';
import { AccountModel } from '@/models/AccountModel';
import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
const AccountDetail: React.FC = () => {
	const { id } = useParams();
	const [cookie] = useCookies(['userInfo']);
	const navigate = useNavigate();
	const [accountInfo, setAccountInfo] = useState<AccountModel | null>(null);

	const getAccountInfo = useCallback(async () => {
		if (cookie.userInfo?.token && id) {
			const fetchedAccountInfo = await get_account_by_account_id(parseInt(id), cookie?.userInfo?.token);
			setAccountInfo(fetchedAccountInfo.data)
		}
	}, [cookie.userInfo?.token, id])

	useEffect(() => {
		getAccountInfo()
	}, [getAccountInfo])
	console.log(accountInfo)
	const goToAddPurchasePage = () => {
		navigate("/purchase/new", {state: {id}})
	}
	return (
		<div className="w-full m-2">
			{accountInfo &&
				<div>
					<div>
						{accountInfo.name}
					</div>
					<div>
						{accountInfo.balance}
					</div>
				</div>
			}
			<div>
				<button onClick={goToAddPurchasePage}>add purchase</button>
			</div>
			{id &&
				<TransactionList accountId={parseInt(id)} />
			}
		</div>
	)
}
export default AccountDetail;
