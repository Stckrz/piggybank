import { TagModel } from "./TagModel";

export interface PurchaseModel{
	id: number,
	ownerId: string,
	title: string,
	amount: number,
	tags: TagModel[],
	accountId: number,
	createdAt: string
}
