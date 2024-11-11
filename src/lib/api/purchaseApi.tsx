const purchaseApiUrl = "http://127.0.0.1:5084/purchases"

export async function get_purchases_by_account_id(account_id: number, token: string) {
	try {
		const response = await fetch(`${purchaseApiUrl}/account/${account_id}`, {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		const data = response.json();
		return data;
	}
	catch (error) {
		return error;
	}
}
