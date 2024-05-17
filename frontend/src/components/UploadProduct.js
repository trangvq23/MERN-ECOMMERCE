import React, {useState} from 'react'
import {RiCloseLine} from "react-icons/ri";

const UploadProduct = ({
                           onClose
                       }) => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: "",
        description: "",
        price: "",
        selling: ""
    })

    const handleOnChange = (e) => {

    }

    return (
        <div
            className='fixed w-full h-full bg-slate-200 bg-opacity-55 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]'>

                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto hover:text-blue-600 cursor-pointer' onClick={onClose}>
                        <RiCloseLine/>
                    </div>
                </div>

                <form className='grid p-2 gap-2'>
                    <label htmlFor='productName' className='mt-1'>Product Name: </label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className="p-1 bg-slate-100 border rounded"
                    />

                    <label htmlFor='brandName' className='mt-1'>Brand Name: </label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='enter brand name'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className="p-1 bg-slate-100 border rounded"
                    />

                    <label htmlFor='category' className='mt-1'>Category: </label>
                    <select value={data.category} className='p-1 bg-slate-100 border rounded'>

                    </select>

                </form>


            </div>
        </div>
    )
}
export default UploadProduct
