import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
import Uploader from './components/Uploader';

import { Toaster } from 'react-hot-toast';

import axios from 'axios';
import { UserContext } from './context/userContext';

axios.defaults.baseURL = 'http://localhost:5000/api';


export default function App() {

	const { isLoggedIn } = useContext(UserContext);

	return (
		<div>
			<Navbar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<AuthPage />} />
				<Route path='/upload' element={<Uploader />} />

				<Route path='*' element={<Navigate to='/' />} />
			</Routes>

			<Toaster />
		</div>
	)
}
