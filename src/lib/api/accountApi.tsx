const accountApiUrl = "http://127.0.0.1:5084/Accounts";


export async function get_accounts_by_user(token: string) {
	try {
		const response = await fetch(`${accountApiUrl}`, {
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

export async function get_account_by_account_id(account_id: number, token: string) {
	try {
		const response = await fetch(`${accountApiUrl}/${account_id}`, {
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

export async function create_account(account_name: string, balance: number, token: string) {
	const newAccountObject = {
		name: account_name,
		balance: balance
	}
	try {
		const response = await fetch(accountApiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(newAccountObject)
		});
		const data = response.json();
		return data;
	}
	catch (error) {
		return error
	}
}

export async function delete_account(account_id: number, token: string) {
	try {
		const response = await fetch(`${accountApiUrl}/${account_id}`, {
			method: "DELETE",
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

export async function edit_account_balance(account_id: number, new_balance: number, token: string) {
	const new_account_balance_object = {
		balance: new_balance
	}
	try {
		const response = await fetch(`${accountApiUrl}/${account_id}`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(new_account_balance_object)
		})
		const data = response.json();
		return data;
	}
	catch (error) {
		return error;
	}
}
