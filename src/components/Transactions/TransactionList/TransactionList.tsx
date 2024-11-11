import { get_purchases_by_account_id } from '@/lib/api/purchaseApi';
import { PurchaseModel } from '@/models/PurchaseModel';
import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TransactionDetail from '../TransactionContainer/TransactionContainer';

interface TransactionListProps {
	accountId: number
}
const TransactionList: React.FC<TransactionListProps> = ({ accountId }) => {
	const [purchases, setPurchases] = useState<PurchaseModel[] | null>(null);
	const [cookie] = useCookies(['userInfo']);

	const getAccountPurchases = useCallback(async () => {
		if (cookie.userInfo?.token && accountId) {
			const purchases = await get_purchases_by_account_id(accountId, cookie?.userInfo?.token);
			setPurchases(purchases.data)
		}
	}, [cookie.userInfo.token, accountId])

	useEffect(() => {
		getAccountPurchases()
	}, [getAccountPurchases])

	return (
		purchases &&
		<div className="w-full flex flex-col gap-2">
			{purchases.map((purchase: PurchaseModel, index) => {
				return (
					<TransactionDetail key={index} purchase={purchase} />
				)
			})}
		</div>
	)
}
export default TransactionList;
