import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Actions from '../store/actions';
import { useDispatch } from 'react-redux'
import { EMAIL_REGEX, PASSWORD_REGEX } from '../constants/index';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginGif from '../assets/signin.gif'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase';
import { toast } from 'react-toastify';


const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const defaultValues = {
        username: '',
        email: '',
        password: '',
        repassword: '',

    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'all',
        defaultValues,
    });



    const [Error, setError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});


    const handleLoginForm = async (data) => {

        console.log(data, "data us from");

        if (data.password !== data.repassword) {
            return setError("Password must be Matched");
        }

        setError('');
        setIsLoading(false);
        try {
            setIsLoading(true);
            const response = await dispatch(Actions.signupAction(data.username, data.email, data.password, data.avatar));
            console.log(response, "response is");
            toast.success(response.message)

            setIsLoading(false);
            navigate('/login');
            setError('')
        } catch (error) {
            setIsLoading(false);
            setError('')
            if (typeof error === 'string') {
                setError(error);
            }
        }
    };


    const fileRef = useRef(null);

    useEffect(() => {

        if (file) {

            handleFileUpload(file)
        }

    }, [file])


    const handleFileUpload = (file) => {

        const storage = getStorage(app)

        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        console.log(filePerc, "percentage");


        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setValue('avatar', downloadURL)
                    setFormData({ ...formData, avatar: downloadURL })
                });
            }
        );


    }








    return (
        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
                <form onSubmit={handleSubmit(handleLoginForm)} className='flex flex-col gap-4'>

                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type='file'
                        ref={fileRef}
                        hidden
                        accept='image/*'
                    />
                    <img
                        onClick={() => fileRef.current.click()}
                        src={Object.keys(formData).length === 0 || !formData.avatar ? LoginGif : formData.avatar}
                        // || currentUser.avatar
                        alt='profile'
                        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                    />
                    <p className='text-red-500 text-center'>Upload Profile</p>

                    <TextField
                        style={{ width: '100%', margin: '5px' }}
                        type="text"
                        label="Username"
                        variant="outlined"
                        error={Boolean(errors.username)}
                        helperText={errors.username ? errors.username.message : ''}
                        {...register('username', {
                            required: 'Please enter username address',
                        })}

                    />


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

                    <TextField
                        style={{ width: '100%', margin: '5px' }}
                        type={showPassword === true ? 'text' : 'password'}
                        label="Re-Password"
                        variant="outlined"
                        error={Boolean(errors.repassword)}
                        helperText={errors.repassword ? errors.repassword.message : ''}
                        {...register('repassword', {
                            required: 'Please enter re-password',
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
                    <div className='flex gap-2 mt-5'>
                        <p>Have an account?</p>
                        <Link to={'/login'}>
                            <span className='text-blue-700'>Sign In</span>
                        </Link>
                    </div>
                    <button
                        disabled={isLoading}
                        type='submit'

                        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'

                    >
                        {isLoading ? 'Loading...' : 'Sign Up'}
                    </button>

                    {/* <OAuth /> */}

                </form>


                {Error && <p className='text-red-500 mt-5'>{Error}</p>}
            </div>
        </>
    )
}

export default Signup