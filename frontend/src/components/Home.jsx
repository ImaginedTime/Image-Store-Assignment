import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

export default function Home() {

	const [images, setImages] = useState([]);
	const { isLoggedIn, searchQuery } = useContext(UserContext);

	const [filteredImages, setFilteredImages] = useState([]);

	useEffect(() => {
		if (searchQuery === '') {
			setFilteredImages(images);
		}
		else {
			const filtered = images.filter(image => image.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase()));
			setFilteredImages(filtered);
		}
	}, [searchQuery]);	

	const navigate = useNavigate();

	useEffect(() => {
		if(!isLoggedIn) {
			navigate('/auth');
		}

		axios.get('/images', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res => {
				setImages(res.data.images);
				setFilteredImages(res.data.images);
			})
			.catch(err => {
				console.log(err);
			})
	}, []);

	return (
		<div className='flex flex-wrap gap-5 p-5 justify-center'>
			{filteredImages && filteredImages.map(image => (
				<div key={image._id} className='relative rounded-lg flex flex-col items-center'>
					<img src={image.url} alt="" className='w-80 h-80 object-cover rounded-lg border-4 border-black' />
					<div className='flex items-end justify-center border-4 border-black border-t-0 w-fit px-6 pb-1 rounded-b-xl'>
						<span className='text-2xl'>{image.name}</span>
					</div>
				</div>
			))}

			{
				filteredImages.length === 0 && <h1 className='text-2xl'>No images found</h1>
			}
		</div>
	)
}
