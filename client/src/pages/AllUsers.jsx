import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Actions from '../store/actions';
import { toast } from 'react-toastify';

import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Box, IconButton, MenuItem, Modal, Select, TextField } from '@mui/material';
import ChnageUserRole from '../components/ChnageUserRole';
import SelectOption from '../commonComponents/SelectOption';
import { ROLE } from '../commonComponents/Role';
import { useNavigate } from 'react-router-dom';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '704px',
    maxHeight: '90vh', // Set the maximum height of the Box
    bgcolor: '#FFF',
    boxShadow: 24,
    p: '24px',
    overflow: 'auto',
    borderRadius: '12px',
};

const UserTypeData = [
    { value: 'Admin', label: 'Admin' },
    { value: 'User', label: 'User' },

];



const AllUsers = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allUsersData = useSelector((state) => state.user.allUsers)
    const userData = useSelector((state) => state.user.userData)
    const [userType, setUserType] = useState('Admin');
    const [isEmail, setIsEmail] = useState('');
    const [isName, setIsName] = useState('');
    const [isId, setIsId] = useState('');
    const [allUser, setAllUser] = useState([])
    const [openBox, setOpenBox] = useState(false)


    const getAllUsers = async () => {
        const response = await dispatch(Actions.getAllUsers())
    }


    useEffect(() => {
        getAllUsers();
    }, [])

    useEffect(() => {
        if (userData?.data?.role !== ROLE.ADMIN) {
            navigate('/')
        }

    }, [])








    useEffect(() => {
        if (allUsersData) {
            setAllUser(allUsersData)
        }
    }, [allUsersData])


    const handleGetSingleUser = async (user) => {

        console.log(user, "user data");

        setIsId(user._id)
        setIsEmail(user.email)
        setIsName(user.username)
        setUserType(user.role)

    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();



        try {
            await dispatch(Actions.updateUserAction(isId, isName, isEmail, userType))

            getAllUsers();

            setOpenBox(false);

            toast.success('User Updated Successfully')

        } catch (error) {

            console.log(error)

        }
    }

    return (


        <>
            <div>
                <table className="userTable w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="border border-gray-300">
                            <th className="border border-gray-300 p-2">Sr.</th>
                            <th className="border border-gray-300 p-2">Profile</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Created Date</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser &&
                            allUser.map((user, index) => (
                                <tr key={user._id} className="text-sm border border-gray-300 odd:bg-gray-500 odd:text-white">
                                    <td className="text-center border border-gray-300 p-2">
                                        {index + 1}
                                    </td>
                                    <td className="grid justify-items-center p-2">
                                        <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                                    </td>
                                    <td className="text-center border border-gray-300 p-2">
                                        {user.username}
                                    </td>
                                    <td className="text-center border border-gray-300 p-2">
                                        {user.email}
                                    </td>
                                    <td className="text-center border border-gray-300 p-2">
                                        {user.role}
                                    </td>
                                    <td className="text-center border border-gray-300 p-2">
                                        {moment(user.createdAt).format('lll')}
                                    </td>
                                    <td className="p-2 border border-gray-300">
                                        <IconButton onClick={() => {
                                            setOpenBox(true);
                                            handleGetSingleUser(user);
                                        }}>
                                            <EditIcon className="cursor-pointer text-red-500" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


                <div className=''>
                    {openBox && (
                        <Modal
                            open={openBox}

                            onClose={() => {
                                setOpenBox(false);
                            }}
                        >
                            <Box sx={style}>
                                <div>
                                    <form action="" onSubmit={handleUpdateUser} className="space-y-3 p-6 ">
                                        <h1 className='text-2xl font-bold text-red-500 m4-8 '>Change User Role</h1>
                                        <div>
                                            <TextField
                                                style={{ width: '100%', margin: '5px' }}
                                                type="text"
                                                value={isName}
                                                required
                                                label="Username"
                                                variant="outlined"

                                            />

                                        </div>


                                        <div>
                                            <TextField
                                                style={{ width: '100%', margin: '5px' }}
                                                type="email"
                                                required
                                                label="Email"
                                                value={isEmail}
                                                variant="outlined"

                                            />
                                        </div>


                                        <div>
                                            <SelectOption
                                                label="Role*"
                                                value={userType}
                                                onChange={setUserType}
                                                menuItems={UserTypeData}
                                            />
                                        </div>

                                        <button type='submit' className='px-3 py-2 rounded bg-indigo-500 text-white'>
                                            Update
                                        </button>


                                    </form>
                                </div>
                            </Box>
                        </Modal>
                    )}
                </div>
            </div>
        </>
    )
}

export default AllUsers