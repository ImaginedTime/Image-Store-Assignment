import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

import axios from 'axios';
import toast from 'react-hot-toast';

export default function Uploader() {
	const [images, setImages] = useState([]);

	const [name, setName] = useState('');

	const [loading, setLoading] = useState(false);

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
	};

	const upload = async () => {
		if (images.length === 0) {
			toast.error('Please upload an image', {
				position: "bottom-center",
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			});
			return;
		}

		if (name === '') {
			toast.error('Please enter a name for the image', {
				position: "bottom-center",
				style: {
					borderRadius: '10px',
					background: '#333',
					color: '#fff',
				},
			});
			return;
		}

		async function uploadImage() {
			const formData = new FormData();

			formData.append('name', name);
			formData.append('image', images[0].file);

			try {
				setLoading(true);

				const response = await axios.post('/images/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				});
			}
			catch (error) {
				console.log(error);
			}
			finally {
				setLoading(false);
			}
		}

		toast.promise(uploadImage(), {
			loading: 'Uploading Image...',
			success: 'Image Uploaded Successfully',
			error: 'Failed to upload image',
			position: "bottom-center",
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		});
	};

	return (
		<div className="App">
			<ImageUploading
				value={images}
				onChange={onChange}
				dataURLKey="data_url"
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
				}) => (
					// write your building UI
					<div className="upload__image-wrapper">
						<div className='flex flex-col gap-5 items-center justify-center mt-10'>
							<button
								className={`${isDragging && "red"} flex`}
								onClick={onImageUpload}
								{...dragProps}
							>
								<div className={`shadow-2xl rounded-lg w-96 ${images.length == 0 ? "h-60" : "h-28"} flex items-center justify-center`}>
									Click or Drop Images Here
								</div>
							</button>


							{
								imageList.length > 0 &&
								<div className='flex flex-row gap-5'>
									<button onClick={onImageRemoveAll} className='bg-white border-2 border-[#242424] rounded-full px-6 py-2 hover:bg-[#242424] hover:text-[#dfdfdf] transition-all' disabled={loading}>Remove image</button>
									<button onClick={upload} className='border-2 border-[#242424] bg-[#242424] text-[#dfdfdf] rounded-full px-6 py-2 hover:bg-white hover:text-[#242424] transition-all' disabled={loading}>Upload Image</button>
								</div>
							}
						</div>

						<div className='mt-5 flex flex-col justify-center items-center gap-4'>
							{imageList.map((image, index) => (
								<div key={index} className="image-item">
									<img src={image['data_url']} alt="" className='w-5/6 md:w-1/2 rounded-lg m-auto' />
								</div>
							))}

							{images.length > 0 && <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-[#242424] rounded-full px-6 py-2' placeholder='Name for the image' />}
						</div>
					</div>
				)}
			</ImageUploading>
		</div>
	);
}