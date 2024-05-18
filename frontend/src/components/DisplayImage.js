import React from 'react'
import {RiCloseLine} from "react-icons/ri";

const DisplayImage = ({
                          imgUrl,
                          onClose
                      }) => {
    return (
        <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
            <div className='max-w-5xl mx-auto p-4'>
                <div className='w-12 h-0 ml-auto hover:text-blue-600 cursor-pointer' onClick={onClose}>
                    <RiCloseLine className='text-xl'/>
                </div>

                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} alt='' className='w-full h-full'/>
                </div>
            </div>
        </div>
    )
}
export default DisplayImage
