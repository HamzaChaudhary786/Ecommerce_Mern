
import { Button, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import Logo from './Logo'
import * as Actions from '../store/actions';
import { persistor } from '../store/store'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ROLE } from './Role';
const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false)

    const user = useSelector(state => state.user.userData);

    console.log(user, "user data is ");

    const handleLogout = async () => {
        try {

            const response = await dispatch(Actions.signOutAction());
            persistor.purge();
            navigate("/")

        } catch (error) {

        }
    }
    return (
        <>

            <header className='h-16 shadow-sm bg-white'>
                <div className='h-full flex justify-between items-center px-4 mx-auto'>
                    {/* logo section */}
                    <div>
                        <Link to='/'>
                            <Logo h={60} w={100} />
                        </Link>
                    </div>
                    {/* navigation section */}

                    <div className='bg-slate-100 rounded-lg'>
                        <form onSubmit="" action="">
                            <TextField
                                type='search'
                                placeholder='search ...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <Button type='submit'>
                                            <InputAdornment position='start'>
                                                <FaSearch />
                                            </InputAdornment>
                                        </Button>
                                    ),
                                    sx: {
                                        height: '40px', // Minimize the height
                                        padding: '0 10px', // Adjust padding
                                        fontSize: '14px', // Adjust font size
                                    },
                                }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        height: '40px', // Set height for the TextField
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        padding: '10px', // Adjust input padding to minimize height
                                    },
                                }}
                            />
                        </form>
                    </div>

                    {/* user info section */}
                    <div className=' flex items-center gap-4'>
                        <div className='relative cursor-pointer'>
                            <ShoppingCartIcon className='' />
                            <div className=' absolute -top-2 -right-1 '>
                                <p className=' bg-red-500 text-center h-5 w-5 rounded-full'>1</p>
                            </div>
                        </div>


                        {
                            user ? (

                                user?.data?.role === ROLE.ADMIN ? (
                                    <>

                                        <div className=' relative '>

                                            <div onClick={() => setIsOpen(!isOpen)}>


                                                <img src={user.data?.avatar} className='h-8 w-8 rounded-full cursor-pointer' alt="avater image" />

                                            </div>
                                            {
                                                isOpen && (
                                                    <div className=' absolute hidden md:block top-12  h-36 w-36 py-2 m-1 space-y-1 bg-slate-400 '>

                                                        <div
                                                            className="hover:bg-purple-400 whitespace-nowrap cursor-pointer pl-2 py-1 "
                                                            onClick={() => {
                                                                setIsOpen(false);
                                                                navigate('/admin-panel/all-products')

                                                            }}
                                                        >
                                                            Admin Panel
                                                        </div>
                                                        <div className='hover:bg-purple-400  whitespace-nowrap cursor-pointer pl-2 py-1'>About</div>
                                                        <div className='cursor-pointer whitespace-nowrap pl-2 py-1 hover:bg-purple-400 '>Home</div>

                                                    </div>
                                                )
                                            }

                                        </div>
                                        <div >

                                            <Button
                                                variant='outlined'
                                                sx={{
                                                }}
                                                onClick={handleLogout}>Logout
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>

                                        <div className='cursor-pointer'>
                                            <AccountCircleIcon />
                                        </div>
                                        <Button
                                            variant='outlined'
                                            sx={{
                                            }}
                                            onClick={handleLogout}>Logout
                                        </Button>
                                    </>


                                )


                            ) : (

                                <>
                                    <div >
                                        <Link to="/login">
                                            <Button
                                                variant='outlined'
                                                sx={{
                                                }}>Login
                                            </Button>
                                        </Link>
                                    </div>

                                </>
                            )
                        }



                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar