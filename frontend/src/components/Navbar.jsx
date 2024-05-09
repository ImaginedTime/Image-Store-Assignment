import React, { useContext } from 'react'
import search from '../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/userContext'
import toast from 'react-hot-toast';

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const { searchQuery, setSearchQuery } = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/auth');

        toast.success('Logged Out Successfully', {
            position: "bottom-center",
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    }

    return (
        <div className='bg-[#242424] text-[#dfdfdf] flex justify-between items-center px-5 min-h-[10vh]'>
            <Link to='/' className='ml-5'>
                LOGO
            </Link>

            <div className='flex gap-5 items-center'>
                {!isLoggedIn &&
                    <div className='flex gap-4'>
                        <Link to='/auth' className=' px-6 py-1 rounded-full bg-[#dfdfdf] text-[#242424] border-2 border-[#dfdfdf] hover:text-[#dfdfdf] hover:bg-[#242424] transition-all'>
                            Login
                        </Link>
                    </div>
                }

                {isLoggedIn &&
                    <div className='flex'>
                        <input
                            type='text'
                            placeholder='Search among your posts'
                            className='px-4 py-1 rounded-s-full outline-none text-[#242424] bg-[#dfdfdf]'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className='w-10 bg-[#dfdfdf] rounded-e-full flex items-center justify-center cursor-pointer'>
                            <img src={search} alt="" className='w-6 h-6' />
                        </div>
                    </div>
                }

                {isLoggedIn &&
                    <div className='flex gap-4'>
                        <div className='flex gap-4'>
                            <Link to='/upload' className='px-6 py-1 rounded-full text-[#dfdfdf] border-2 border-[#dfdfdf] hover:text-[#242424] hover:bg-[#dfdfdf] transition-all'>
                                Create Post
                            </Link>
                        </div>
                        <div className='flex gap-4'>
                            <Link to='/auth' className='px-6 py-1 rounded-full bg-[#dfdfdf] text-[#242424] border-2 border-[#dfdfdf] hover:text-[#dfdfdf] hover:bg-[#242424] transition-all' onClick={logout}>
                                Logout
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
