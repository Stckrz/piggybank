import { TagModel } from "./TagModel";

export interface PaymentModel{
	Id: number,
	OwnerId: string,
	Title: string,
	Amount: number,
	Tags: TagModel[],
	AccountId: number,
	CreatedAt: string
}
