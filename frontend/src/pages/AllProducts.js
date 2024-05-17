import React, {useState} from 'react'
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false)

    return (
        <div>
            <div className='bg-white p-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Product</h2>
                <button
                    className='border-2 border-slate-300 hover:bg-slate-300 hover:text-white py-1 px-2 rounded transition-all' onClick={() => setOpenUploadProduct(true)}>Upload
                    Product
                </button>
            </div>

            { /***Upload Product Component***/}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setOpenUploadProduct(false)} />
                )
            }

        </div>
    )
}
export default AllProducts
