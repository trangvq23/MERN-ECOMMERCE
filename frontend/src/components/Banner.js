import React, { useEffect, useState, useCallback } from 'react';
import banner1 from '../assets/banner/banner1.jpg';
import banner2 from '../assets/banner/banner2.jpg';
import banner3 from '../assets/banner/banner3.jpg';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Banner = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const bannerImage = [
        banner1,
        banner2,
        banner3
    ];

    const nextImage = useCallback(() => {
        if (bannerImage.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        } else {
            setCurrentImage(0);
        }
    }, [currentImage, bannerImage.length]);

    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        } else {
            setCurrentImage(bannerImage.length - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <div className='container mx-auto px-20 rounded'>
            <div className='h-72 md:h-96 w-full bg-slate-200 relative'>
                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl p-4'>
                        <button onClick={preveImage} className='bg-white rounded-full shadow-md p-1'>
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className='bg-white rounded-full shadow-md p-1'>
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                <div className='flex w-full h-full overflow-hidden'>
                    {bannerImage.map((imageUrl, index) => (
                        <div
                            className='w-full h-full min-w-full min-h-full transition-all'
                            key={imageUrl}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} alt={`banner${index + 1}`} className='w-full h-full' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
