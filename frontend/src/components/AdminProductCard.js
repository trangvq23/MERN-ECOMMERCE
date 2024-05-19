import React, {useState} from 'react'
import {MdEditNote} from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayVNDCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({
                              data,
                              fetchdata
                          }) => {
    const [editProduct, setEditProduct] = useState(false)


    return (
        <div className='bg-white p-4 rounded'>
            <div className=''>
                <img src={data?.productImage[0]} alt='' width={120} height={120} className='mx-auto pb-2'/>
                <p>Thương hiệu: <span className='font-semibold text-sm text-blue-700'>{data.brandName}</span></p>
                <h2 className='font-semibold'>{data.productName}</h2>

                <div className='flex'>
                    <p className='font-semibold text-red-500 p-2'>
                        {
                            displayVNDCurrency(data.sellingPrice)
                        }
                    </p>
                    <div
                        className='w-fit ml-auto p-2 text-2xl bg-green-100 hover:bg-green-300 rounded-full hover:text-white cursor-pointer'
                        onClick={() => setEditProduct(true)}>
                        <MdEditNote/>
                    </div>
                </div>
            </div>

            {
            editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata}/>
                )
            }
        </div>
    )
}
export default AdminProductCard
