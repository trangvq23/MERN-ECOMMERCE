import React, {useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import SummaryApi from "../common";
import displayVNDCurrency from "../helpers/displayCurrency";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";
import addToCart from "../helpers/addToCart";

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")

    const {fetchUserAddToCart} = useContext(Context)
    const navigate = useNavigate()
    console.log("product id", params)
    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()

        setData(dataResponse?.data)
        setActiveImage(dataResponse?.data?.productImage[0])
    }

    console.log("data", data)

    useEffect(() => {
        fetchProductDetails()
    }, [params]);

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL)
    }

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate("/cart")

    }

    return (
        <div className='pl-16 pr-16 mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/*** Product Image ***/}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
                        <img src={activeImage} className='h-full w-full object-scale-down p-4 mix-blend-multiply'
                             alt=''/>
                    </div>
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageListLoading.map(el => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse'
                                                     key={"loadingImage"}>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data?.productImage?.map((imgURL, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                                    <img src={imgURL}
                                                         className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                                                         alt='' onClick={() => handleMouseEnterProduct(imgURL)}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>

                {/*** Product Details ***/}
                {
                    loading ? (
                        <div className='flex flex-col gap-1'>
                            <h2 className='bg-slate-200 animate-pulse rounded-full inline-block text-xl h-5 '></h2>
                            <p className='bg-slate-200 animate-pulse h-5 w-full rounded-full inline-block'><span></span>
                            </p>
                            <p className=' pl-3 pt-3 bg-slate-200 animate-pulse h-5 rounded-full w-32'></p>
                            <p className='pl-3 pt-3 bg-slate-200 animate-pulse h-5 rounded-full w-40'><span
                                className='text-'></span></p>

                            <div
                                className='pl-3 p-3 flex items-center gap-2 text-2xl font-medium text-red-600 animate-pulse rounded-full bg-slate-200'>
                                <p></p>
                                <p className='text-slate-400 line-through'></p>
                            </div>

                            <div className='flex items-center gap-3 my-3 bg-slate-200 animate-pulse '>
                                <button
                                    className='h-9 bg-slate-200 animate-pulse rounded-full'>
                                </button>
                                <button
                                    className='h-9 bg-slate-200 animate-pulse rounded-full'>
                                </button>
                            </div>


                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>
                            <h2 className='font-semibold text-2xl p-3'>{data?.productName}</h2>
                            <p className='font-semibold pl-3'>Thương hiệu: <span
                                className='text-blue-700'>{data?.brandName} </span></p>
                            <p className=' pl-3 pt-3'>Loại: {data.category}</p>
                            <p className='pl-3 pt-3'>Mô tả: <span className='text-'>{data.description}</span></p>

                            <div className='pl-3 p-3 flex items-center gap-2 text-2xl font-medium text-red-600'>
                                <p>{displayVNDCurrency(data.sellingPrice)}</p>
                                <p className='text-slate-400 line-through'>{displayVNDCurrency(data.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-3'>
                                <button
                                    className='border-2 border-gray-400 rounded-md text-gray-500 px-3 py-1 bg-white min-w-[100px] font-medium h-12 hover:bg-gray-400 hover:text-white'
                                    onClick={(e) => handleBuyProduct(e, data?._id)}>Mua
                                </button>
                                <button
                                    className='border-2 border-gray-400 rounded-md px-3 py-1 text-white bg-gray-400 min-w-[100px] font-medium h-12 hover:bg-white hover:text-slate-500'
                                    onClick={(e) => handleAddToCart(e, data?._id)}
                                >Thêm vào giỏ hàng
                                </button>
                            </div>


                        </div>
                    )
                }

            </div>

            {
                data.category && (
                    <CategoryWiseProductDisplay category={data?.category} heading={"Category"}/>
                )
            }


        </div>
    )
}
export default ProductDetails
