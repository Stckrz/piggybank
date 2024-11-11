import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaDollarSign } from "react-icons/fa";
const NewPurchase: React.FC = () => {
	const location = useLocation()
	const accountNumber = location.state?.id;
	const [purchaseTitle, setPurchaseTitle] = useState("")
	const [purchasePrice, setPurchasePrice] = useState("")
	const [errorMessages, setErrorMessages] = useState<string[]>([])


	const purchasePriceChangeHandler = (value: string) => {
		if (value === "") {
			setErrorMessages([]);
			return
		}
		const dollarAmountPattern = /^\d*\.?\d{0,2}$/;
		if (dollarAmountPattern.test(value) || value === "") {
			setPurchasePrice("");
			const newValue = parseFloat(value);
			if (!isNaN(newValue)) {
				setPurchasePrice(newValue.toFixed(2));
				setErrorMessages([]);
			}
		} else {
			setErrorMessages([]);
			setErrorMessages((prevMessages) => [...prevMessages, "Please enter a valid dollar amount."]);
		}
	}

	return (
		<div className="w-full flex flex-col border items-center ">
			<div className="p-4 h-2/3 gap-2 flex flex-col justify-end md:w-1/2">
				<label
					className="w-full md:w-full text-md font-semibold my-2"
					htmlFor="purchaseTitle">Title:
					<div className="relative flex items-center">
						{/* <FaUserCircle className="absolute top-1/2 transform -translate-y-1/2 left-2 opacity-50" color="#4ecdc4" size="0.75em" /> */}
						<input
							className="w-full pl-8"
							name="purchaseTitle"
							id="purchaseTitle"
							onChange={e => setPurchaseTitle(e.target.value)}
						/>
					</div>
				</label>

				<label
					className="w-full md:w-full text-md font-semibold my-2"
					htmlFor="accountBalanceInput">Price:
					<div className="relative flex items-center w-full font-normal">
						<FaDollarSign className="absolute top-1/2 transform -translate-y-1/2 left-2 opacity-50" color="#4ecdc4" size="0.75em" />
						<input
							className="w-full pl-8"
							name="accountBalanceInput"
							id="accountBalanceInput"
							onChange={e => { purchasePriceChangeHandler(e.target.value) }}
						/>
						<div className="absolute right-2 opacity-50 secondary-text-color">{purchasePrice}</div>
					</div>
				</label>
				<div>Tag Selector Here</div>
				<button>Submit</button>
			</div>
		</div>
	)
}
export default NewPurchase;
