import { Box, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import SelectOption from '../commonComponents/SelectOption';
import { ProductCategoryType } from '../constants';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { toast } from 'react-toastify';
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


const AllProducts = () => {

    const dispatch = useDispatch()

    const [openBox, setOpenBox] = useState(false)

    const [data, setData] = useState({
        productName: "",
        brandName: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })
    const [categoryType, setCategoryType] = useState('Airpodes')
    const [files, setFiles] = useState([]);

    const [filePerc, setFilePerc] = useState(0);
    const [imageUploadError, setImageUploadError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const storeImage = async (file) => {
        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}-${file.name}`;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);




        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setFilePerc(Math.round(progress));
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
                }
            );
        });
    };


    const handleImageSubmit = async () => {
        if (files.length > 0 && files.length + data.productImage.length <= 6) {
            setUploading(true);
            setImageUploadError('');
            const promises = Array.from(files).map((file) => storeImage(file));

            try {
                const urls = await Promise.all(promises);
                setData((prev) => ({ ...prev, productImage: [...prev.productImage, ...urls] }));
            } catch (error) {
                setImageUploadError('Image size must be 2 MB or less');
            } finally {
                setUploading(false);
            }
        } else {
            setImageUploadError('You can only upload a maximum of 6 images per listing');
        }
    };

    const handleRemoveImage = (index) => {
        if (index >= 0 && index < data.productImage.length) {
            setData({
                ...data,
                productImage: data.productImage.filter((_, i) => i !== index),
            });
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })

    }

    console.log(data, "data is changed");


    const handleAddProduct = async (e) => {

        e.preventDefault()

        const response = await dispatch(Actions.addProductAction(data , categoryType));




        try {

        } catch (error) {

        }

    }

    return (
        <>

            <div className='m-2 p-4 bg-white'>

                <div className='bg-white py-2 px-4 flex justify-between items-center'>
                    <h1 >
                        All Products
                    </h1>
                    <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full '
                        onClick={() => setOpenBox(true)}
                    >
                        Upload Product
                    </button>
                </div>

                <div>
                    {openBox && (
                        <Modal
                            open={openBox}

                            onClose={() => {
                                setOpenBox(false);
                            }}
                        >
                            <Box sx={style}>
                                <div>
                                    <form
                                        action=""
                                        onSubmit={handleAddProduct}
                                        className="space-y-3 p-6 ">
                                        <h1 className='text-2xl font-bold text-red-500 m4-8 '>Change User Role</h1>
                                        <div>
                                            <TextField
                                                style={{ width: '100%', margin: '5px' }}
                                                type="text"
                                                value={data.productName}
                                                name='productName'
                                                required
                                                label="Product Name"
                                                variant="outlined"
                                                onChange={handleChange}

                                            />

                                        </div>


                                        <div>
                                            <TextField
                                                style={{ width: '100%', margin: '5px' }}
                                                type="text"
                                                required
                                                label="Brand Name"
                                                value={data.brandName}
                                                name='brandName'
                                                variant="outlined"
                                                onChange={handleChange}


                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                type='text'
                                                label="Description"
                                                className='border p-3 rounded-lg w-full'
                                                id='description'
                                                multiline
                                                rows={2}
                                                name='description'
                                                required
                                                onChange={handleChange}
                                                value={data.description}
                                            />
                                        </div>


                                        <div>
                                            <SelectOption
                                                label="Category*"
                                                value={categoryType}
                                                onChange={setCategoryType}
                                                menuItems={ProductCategoryType}
                                            />
                                        </div>


                                        <div className='flex flex-col flex-1 gap-4'>
                                            <p className='font-semibold'>
                                                Images:
                                                <span className='font-normal text-gray-600 ml-2'>
                                                    The first image will be the cover (max 6)
                                                </span>
                                            </p>
                                            <div className='flex gap-4'>
                                                <input
                                                    onChange={(e) => setFiles(e.target.files)}
                                                    className='p-3 border border-gray-300 rounded w-full'
                                                    type='file'
                                                    id='images'

                                                    accept='image/*'
                                                    multiple
                                                />
                                                <button
                                                    type='button'
                                                    disabled={uploading}
                                                    onClick={handleImageSubmit}
                                                    className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                                                >
                                                    {uploading ? 'Uploading...' : 'Upload'}
                                                </button>
                                            </div>
                                            <p className='text-red-700 text-sm'>
                                                {imageUploadError && imageUploadError}
                                            </p>
                                            {data.productImage.length > 0 &&
                                                data.productImage.map((url, index) => (
                                                    <div
                                                        key={url}
                                                        className='flex justify-between p-3 border items-center'
                                                    >
                                                        <img
                                                            src={url}
                                                            alt='listing image'
                                                            className='w-20 h-20 object-contain rounded-lg'
                                                        />
                                                        <button
                                                            type='button'
                                                            onClick={() => handleRemoveImage(index)}
                                                            className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                ))}


                                            <div>
                                                <TextField
                                                    style={{ width: '100%', margin: '5px' }}
                                                    type="number"
                                                    required
                                                    label="Price"
                                                    name='price'
                                                    value={data.price}
                                                    variant="outlined"
                                                    onChange={handleChange}


                                                />
                                            </div>

                                            <div>
                                                <TextField
                                                    style={{ width: '100%', margin: '5px' }}
                                                    type="number"
                                                    required
                                                    label="Sale Price"
                                                    name='sellingPrice'
                                                    value={data.sellingPrice}
                                                    variant="outlined"
                                                    onChange={handleChange}


                                                />
                                            </div>






                                            <button



                                                type='submit'
                                                disabled={loading || uploading}
                                                className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                                            >
                                                {loading ? 'Creating...' : 'Create listing'}
                                            </button>
                                            {error && <p className='text-red-700 text-sm'>{error}</p>}

                                        </div>




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

export default AllProducts