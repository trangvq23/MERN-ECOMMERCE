import React, {useContext, useState} from 'react'
import Logo from "./Logo";
import {IoSearch} from "react-icons/io5";
import {FaRegUserCircle} from "react-icons/fa";
import {PiShoppingCartSimpleBold} from "react-icons/pi";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SummaryApi from "../common";
import {toast} from 'react-toastify'
import {setUserDetails} from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";


const Header = () => {

    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const context = useContext(Context)
    const navigate = useNavigate()
    const searchInput = useLocation()
    const [search, setSearch] = useState(searchInput?.search.split("=")[1])

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        })

        const data = await fetchData.json()

        if (data.success) {
            toast.success(data.message)
            dispatch(setUserDetails(null))
        }

        if (data.error) {
            toast.error(data.message)
        }
    }

    const handleSearch = (e) => {
        const {value} = e.target
        setSearch(value)
        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate("/search")
        }
    }


    return (
        <header className='pl-16 pr-16 h-16 shadow-md bg-white'>
            <div className='h-full container mx-auto flex items-center justify-between px-4'>
                <div className=''>
                    <Link to={"/"}>
                        <Logo w={63} h={63}/>
                    </Link>
                </div>
                <div
                    className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within: shadow pl-3'>
                    <input type='text' placeholder='Tìm kiếm ' className='w-full outline-none' onChange={handleSearch} value={search}/>
                    <div
                        className='text-lg min-w-[50px] h-8 bg-gray-400 flex items-center justify-center rounded-r-full text-white'>
                        <IoSearch/>
                    </div>
                </div>
                <div className='flex items-center gap-7'>
                    <div className='relative  flex justify-center'>
                        {
                            user?._id && (
                                <div className='text-2xl cursor-pointer flex justify-center'
                                     onClick={() => setMenuDisplay(preve => !preve)}>
                                    {
                                        user?.profilePicture ? (
                                            <img src={user?.profilePicture} className='w-10 h-10 rounded-full'
                                                 alt={user?.name}/>
                                        ) : (
                                            <FaRegUserCircle/>
                                        )
                                    }
                                </div>
                            )
                        }


                        {
                            menuDisplay && (
                                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-md rounded'>
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"}
                                                      className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 onClick={() => setMenuDisplay(preve => !preve)'>Bảng
                                                    quản trị</Link>
                                            )
                                        }
                                    </nav>
                                </div>
                            )
                        }
                    </div>

                    {
                        user?._id && (
                            <Link to={"/cart"} className='text-2xl relative'>
                                <span> <PiShoppingCartSimpleBold/> </span>

                                <div
                                    className='bg-red-400 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 left-4'>
                                    <p className='text-sm'>{context?.cartProductCount}</p>
                                </div>
                            </Link>
                        )
                    }


                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout}
                                        className='px-3 py-1 rounded-full text-white bg-gray-400 hover:bg-gray-500'>Đăng
                                    xuất</button>
                            ) : (
                                <Link to={"/login"}
                                      className='px-3 py-1 rounded-full text-white bg-gray-400 hover:bg-gray-500'>Đăng
                                    nhập</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header
