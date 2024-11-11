import { create_account } from '@/lib/api/accountApi';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaDollarSign } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CreateAccountPage: React.FC = () => {
	const [accountNameInput, setAccountNameInput] = useState("");
	const [accountBalanceInput, setAccountBalanceInput] = useState("");
	const [errorMessages, setErrorMessages] = useState<string[]>([]);
	const [cookie] = useCookies(['userInfo']);
	const navigate = useNavigate();

	const accountBalanceChangeHandler = (value: string) => {
		if (value === "") {
			setErrorMessages([]);
			return
		}
		const dollarAmountPattern = /^\d*\.?\d{0,2}$/;
		if (dollarAmountPattern.test(value) || value === "") {
			setAccountBalanceInput("");
			const newValue = parseFloat(value);
			if (!isNaN(newValue)) {
				setAccountBalanceInput(newValue.toFixed(2));
				setErrorMessages([]);
			}
		} else {
			setErrorMessages([]);
			setErrorMessages((prevMessages) => [...prevMessages, "Please enter a valid dollar amount."]);
		}
	}

	const accountSubmitValidationHandler = () => {
		setErrorMessages([]);
		if (!accountNameInput) {
			setErrorMessages((prevMessages) => [...prevMessages, "Name field must not be empty."]);
		}
		if (!accountBalanceInput) {
			setErrorMessages((prevMessages) => [...prevMessages, "Please enter a valid dollar amount."]);
		}
		if (errorMessages.length === 0) {
			accountSubmitHandler();
			navigate('/');
		}
	}
	const accountSubmitHandler = async () => {
		try {
			await create_account(accountNameInput, parseFloat(accountBalanceInput), cookie.userInfo?.token)
		} catch (error) {
			console.log(error)
		}

	}


	return (
		<div className="w-full flex flex-col items-center justify-between">
			<div className="p-4 h-2/3 gap-2 flex flex-col justify-end md:w-1/2">
				<label
					className="w-full md:w-full text-md font-semibold my-2"
					htmlFor="accountNameInput">Account Name:
					<div className="relative flex items-center w-full font-normal">
						<FaTag className="absolute top-1/2 transform -translate-y-1/2 left-2 opacity-50" color="#4ecdc4" size="0.75em" />
						<input
							className="w-full pl-8"
							name="accountNameInput"
							id="accountNameInput"
							onChange={e => setAccountNameInput(e.target.value)}
						/>
					</div>
				</label>
				<label
					className="w-full md:w-full text-md font-semibold my-2"
					htmlFor="accountBalanceInput">Starting Balance:
					<div className="relative flex items-center w-full font-normal">
						<FaDollarSign className="absolute top-1/2 transform -translate-y-1/2 left-2 opacity-50" color="#4ecdc4" size="0.75em" />
						<input
							className="w-full pl-8"
							name="accountBalanceInput"
							id="accountBalanceInput"
							onChange={e => { accountBalanceChangeHandler(e.target.value) }}
						/>
						<div className="absolute right-2 opacity-50 secondary-text-color">{accountBalanceInput}</div>
					</div>
				</label>
				<button
					className="md:w-1/4 self-end my-4"
					onClick={accountSubmitValidationHandler}>
					Create
				</button>
			</div>
			<div className="h-1/3 p-4 text-sm text-red-900 md:self-center self-start md:w-1/2">
				{errorMessages.length > 0 &&
					errorMessages.map((error, index) => {
						return (
							<div key={index}>{error}</div>
						)
					})
				}</div>
		</div>
	)
}
export default CreateAccountPage;
