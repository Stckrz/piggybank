import { loginUser, registerUser } from '@/lib/api/userApi';
import piggy from '@/assets/Piggy_Bank.png';
import React, { useCallback, useEffect, useState } from 'react';
import { FaUserCircle, FaKey } from "react-icons/fa";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const LoginPage: React.FC = () => {
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [loginOrRegister, setLoginOrRegister] = useState("Login");
	const [secondPasswordInput, setSecondPasswordInput] = useState("");
	const [passwordMatch, setPasswordMatch] = useState(false);
	const [errorMessages, setErrorMessages] = useState<string[]>([]);

	const [, setCookie] = useCookies(['userInfo']);
	const navigate = useNavigate();

	const userLoginHandler = async () => {
		setErrorMessages([]);
		const data = await loginUser(usernameInput, passwordInput);
		if (data.status === "Error") {
			setErrorMessages(data.data);
		} else if (data.data) {
			setCookie('userInfo', data.data, { path: '/', maxAge: 3600 });
			navigate('/');

		}
	}

	const userRegisterHandler = async () => {
		setErrorMessages([])
		if (passwordMatch) {
			const data = await registerUser(usernameInput, passwordInput);
			if (data.status === "Error") {
				setErrorMessages(data.data);
			} else {
				setLoginOrRegister("Login");
				setErrorMessages(["user created successfully. Please log in to continue"]);

			}
		} else {
			setErrorMessages(["Passwords must match"]);
		}
	}
	const loginOrRegisterModeSwitch = () => {
		setErrorMessages([]);
		setLoginOrRegister(loginOrRegister === "Login" ? "Register" : "Login");
	}

	const passwordMatchCheck = useCallback(() => {
		if (passwordInput === secondPasswordInput) {
			setPasswordMatch(true);
		} else {
			setPasswordMatch(false);
		}
	}, [passwordInput, secondPasswordInput])

	useEffect(() => {
		passwordMatchCheck()
	}, [passwordInput, secondPasswordInput, passwordMatchCheck])

	return (
		<div className={"w-full flex flex-col gap-6 items-center justify-evenly"}>
			<div className="w-3/5 md:w-1/5 aspect-square">
				<img className="h-full w-full object-fill" src={piggy} />
			</div>

			<div className={"w-3/4 md:w-1/4 h-2/4 flex flex-col gap-4"}>
				<label
					className="w-full text-md"
					htmlFor="loginUsername">User:
					<div className="relative flex items-center">
						<FaUserCircle className="absolute top-1/2 transform -translate-y-1/2 left-2 opacity-50" color="#4ecdc4" size="0.75em" />
						<input
							className="w-full pl-8"
							name="loginUsername"
							id="loginUsername"
							onChange={e => setUsernameInput(e.target.value)}
						/>
					</div>
				</label>
				<label
					className="w-full text-md"
					htmlFor="loginPassword">Password:
					<div className="relative">
						<FaKey
							className="absolute top-1/2 transform -translate-y-1/2 left-2 opacity-50"
							color="#4ecdc4"
							size="0.75em"
						/>
						<input
							name="loginPassword"
							id="loginPassword"
							className="w-full pl-8"
							type="password"
							onChange={e => setPasswordInput(e.target.value)}
						/>
					</div>
				</label>
				{loginOrRegister === "Register" &&
					<label
						className="w-full text-md"
						htmlFor="registerPassword">Repeat Password:
						<div className="relative">
							<FaKey
								className="absolute top-1/2 transform -translate-y-1/2 left-2 opacity-50"
								color="#4ecdc4"
								size="0.75em"
							/>
							<input
								name="registerPassword"
								id="registerPassword"
								className="w-full pl-8"
								style={!passwordMatch && secondPasswordInput !== ""
									? { border: "3px solid red" }
									: {}
								}
								type="password"
								onChange={e => setSecondPasswordInput(e.target.value)}
							/>
						</div>
					</label>
				}

				<div className="text-sm text-red-900 flex flex-col gap-2">
					{errorMessages?.length > 0 && errorMessages.map((item, index) => {
						return (
							<div key={index}>{item}</div>
						)
					})
					}
				</div>
				<button
					className="flex self-end"
					onClick={loginOrRegister === "Login"
						? userLoginHandler
						: userRegisterHandler
					}
				>
					{loginOrRegister === "Login"
						? "Login"
						: "Register"
					}
				</button>
				<div
					onClick={loginOrRegisterModeSwitch}
					className="text-sm text-gray-200 cursor-pointer flex items-center w-full justify-center">
					<div>{loginOrRegister === "Login"
						? "Register for an account?"
						: "Already have an account? Login!"
					}</div>

				</div>
			</div>
		</div>
	)
}
export default LoginPage;
