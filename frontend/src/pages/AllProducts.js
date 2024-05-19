import React, {useEffect, useState} from 'react'
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        console.log("product data", dataResponse)

        setAllProduct(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <div>
            <div className='bg-white p-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Product</h2>
                <button
                    className='border-2 border-slate-300 hover:bg-slate-300 hover:text-white py-1 px-2 rounded transition-all'
                    onClick={() => setOpenUploadProduct(true)}>Upload
                    Product
                </button>
            </div>

            {/*** All Product ***/}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3'>
                {
                    allProduct.map((product, index) => {
                        return (
                            <div key={index + "allProduct"} className='bg-white p-4 rounded-lg shadow-md' style={{
                                minHeight: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <AdminProductCard data={product} fetchdata={fetchAllProduct}/>
                            </div>
                        )
                    })
                }
            </div>


            { /*** Upload Product Component ***/}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
                )
            }

        </div>
    )
}
export default AllProducts
