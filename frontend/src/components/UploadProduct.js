import React, {useState} from 'react'
import {RiCloseLine} from "react-icons/ri";
import productCategory from "../helpers/productCategory";

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
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto hover:text-blue-600 cursor-pointer' onClick={onClose}>
                        <RiCloseLine/>
                    </div>
                </div>

                <form className='grid p-2 gap-2 overflow-y-scroll h-full'>
                    <label htmlFor='productName' className='mt-1'>Product Name: </label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter product name'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className="p-1 bg-slate-100 border rounded"
                    />

                    <label htmlFor='brandName' className='mt-1'>Brand Name: </label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='Enter brand name'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className="p-1 bg-slate-100 border rounded"
                    />

                    <label htmlFor='category' className='mt-1'>Category: </label>
                    <select value={data.category} className='p-1 bg-slate-100 border rounded'>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor='productImage' className='mt-1'>Product Image: </label>
                    <div className='p-2 bg-slate-100 border rounded h-32 w-full'>
                        aaa
                    </div>

                    <div>
                        {/*<img src='' width={100} height={100} className='bg-slate-100'/>*/}
                    </div>
                </form>


            </div>
        </div>
    )
}
export default UploadProduct
