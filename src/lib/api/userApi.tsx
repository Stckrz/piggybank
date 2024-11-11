const userApiUrl = "http://127.0.0.1:5084/authentication"
export async function loginUser(username: string, password: string) {
	const userLoginObject = {
		username: username,
		password: password
	}
	try {
		const response = await fetch(`${userApiUrl}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userLoginObject)
		})
		const data = await response.json();
		return data;

	} catch (error) {
		console.log("assbutt")
		return error;
	}
}

export async function registerUser(username: string, password: string) {
	const userRegisterObject = {
		username: username,
		password: password
	}
	try {
		const response = await fetch(`${userApiUrl}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userRegisterObject)
		})
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error)
	}
}
