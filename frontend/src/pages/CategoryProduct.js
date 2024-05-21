import {Link, useParams} from "react-router-dom";
import displayVNDCurrency from "../helpers/displayCurrency";
import React, {useContext, useState} from "react";
import addToCart from "../helpers/addToCart";
import Context from "../context";


const CategoryProduct = ({category, heading}) => {
    const params = useParams()
    const [data, setData] = useState([])
    const {fetchUserAddToCart} = useContext(Context)


    const handleAddToCart = async (e, id) => {
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    return (
        <div className='flex items-center gap-4 md:gap-14 overflow-scroll scrollbar-none'>
            {
                data.map((product, index) => {
                    return (
                        <Link to={"product/" + product?._id}
                              className=' flex w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white shadow-md rounded-lg'>
                            <div className='bg-white rounded-lg h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img src={product.productImage[0]} alt=''
                                     className='object-scale-down h-full hover:scale-110 transition-all'/>
                            </div>
                            <div
                                className='p-4 font-semibold text-base md:text-sm text-ellipsis line-clamp-1 w-full bg-blue-50 rounded'>
                                <h2 className='pt-2 pb-4'>{product?.productName}</h2>

                                <div className='pt-2 gap-3 pb-2'>
                                    <p className='text-red-600 font-medium'>{displayVNDCurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayVNDCurrency(product?.price)}</p>
                                </div>

                                <button className=' text-sm pt-5 hover:text-green-500'
                                        onClick={(e) => handleAddToCart(e, product?._id)}>Thêm vào giỏ hàng
                                </button>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
export default CategoryProduct
