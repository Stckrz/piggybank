import { PaymentModel } from '@/models/PaymentModel';
import { PurchaseModel } from '@/models/PurchaseModel';
import React from 'react';
interface TransactionDetailProps {
	payment?: PaymentModel,
	purchase?: PurchaseModel
}
const TransactionDetail: React.FC<TransactionDetailProps> = ({ payment, purchase }) => {
	return (
		purchase &&
		<div className="w-full flex justify-between">
			<div>
				<div>{purchase?.title}</div>
				<div>{purchase?.amount}</div>
			</div>
			<div>{new Date(purchase.createdAt).toLocaleDateString()}</div>
		</div>
	)
}
export default TransactionDetail;
