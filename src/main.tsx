import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
	Routes, Route,
} from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Layout from './components/pages/Layout/Layout.tsx';
import Home from './components/pages/Home/Home.tsx';
import LoginPage from './components/pages/Auth/Login/LoginPage.tsx';
import PageNotFound from './components/pages/PageNotFound/PageNotFound.tsx';
import CreateAccountPage from './components/pages/Accounts/CreateAccount/CreateAccount.tsx';
import AccountDetail from './components/Accounts/AccountDetail/AccountDetail.tsx';
import NewPurchase from './components/pages/Purchases/NewPurchasePage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="login" element={<LoginPage />} />
						<Route path="account/create" element={<CreateAccountPage />} />
						<Route path="account/:id" element={<AccountDetail />} />
						<Route path="purchase/new" element={<NewPurchase />} />
						<Route path="*" element={<PageNotFound />} />
					</Route>
				</Routes>
			</Router>
    <App />
  </StrictMode>,
)
