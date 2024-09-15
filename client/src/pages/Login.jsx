import React from 'react'
import { useState } from 'react';
import { InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/index';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginGif from '../assets/signin.gif'
import { toast } from 'react-toastify';


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const defaultValues = {

        email: '',
        password: '',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'all',
        defaultValues,
    });

    const [Error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleLoginForm = async (data) => {
        setError('');
        setIsLoading(false);
        try {
            setIsLoading(true);
            const response = await dispatch(Actions.loginAction(data.email, data.password));

            setError(response.message)

            toast.success(response.message)

            setIsLoading(false);
            navigate('/');
            setError('')
        } catch (error) {
            setIsLoading(false);
            setError('')
            if (typeof error === 'string') {
                setError(error);
            }
        }
    };







    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
                <form onSubmit={handleSubmit(handleLoginForm)} className='flex flex-col gap-4'>

                    <div className='grid justify-items-center'>
                        <img src={LoginGif} className='h-36 w-36' alt="" />
                    </div>

                    <TextField
                        style={{ width: '100%', margin: '5px' }}
                        type="email"
                        label="Email"
                        variant="outlined"
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.message : ''}
                        {...register('email', {
                            required: 'Please enter email address',
                            pattern: {
                                value: EMAIL_REGEX,
                                message: 'Please enter a valid email address',
                            },
                        })}

                    />

                    <TextField
                        style={{ width: '100%', margin: '5px' }}
                        type={showPassword === true ? 'text' : 'password'}
                        label="Password"
                        variant="outlined"
                        error={Boolean(errors.password)}
                        helperText={errors.password ? errors.password.message : ''}
                        {...register('password', {
                            required: 'Please enter password',
                            pattern: {
                                value: PASSWORD_REGEX,
                                message: 'Please enter a valid password',
                            },
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {showPassword ? (
                                        <VisibilityIcon onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }} />

                                    ) : (
                                        <VisibilityOffIcon onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }} />

                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                    <p className='text-end  my-4'>
                        Forgot your password? <Link to={'/forgot-password'} className='text-indigo-500 hover:text-indigo-800'>Reset it</Link>
                    </p>
                    <button
                        disabled={isLoading}
                        type='submit'

                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'

                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>

                    {/* <OAuth /> */}

                </form>

                <div className='flex gap-2 mt-5'>
                    <p>Have an account?</p>
                    <Link to={'/signup'}>
                        <span className='text-blue-700'>Sign up</span>
                    </Link>
                </div>
                {Error && <p className='text-red-500 mt-5'>{Error}</p>}
            </div>
        </>
    )
}

export default Login