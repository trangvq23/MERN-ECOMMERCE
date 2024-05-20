import React, {useContext, useState} from 'react'
import loginIcon from '../assets/loginIcon.jpg'
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import SummaryApi from "../common";
import {toast} from "react-toastify";
import Context from "../context";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials : 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }

    }
    console.log("data login", data)
    return (
        <section id='login'>
            <div className='mx-auto container p-10'>
                <div className='bg-white p-5 w-full max-w-md mx-auto'>
                    <div className='w-14 h-14 mx-auto'>
                        <img src={loginIcon} alt='login icon'/>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Tên tài khoản: </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Nhập tên tài khoản'
                                    name='username'
                                    value={data.username}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Mật khẩu: </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Nhập Mật khẩu'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl'
                                     onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                    <FaEyeSlash/>
                                                )
                                                :
                                                (
                                                    <FaEye/>
                                                )
                                        }
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:text-red-600'>
                                Quên mật khẩu
                            </Link>
                        </div>
                        <button
                            className='bg-gray-300 text-white px-6 py-2 w-full max-w-[150px] rounded hover:scale-110 transition-all mx-auto block mt-5'>
                            Login
                        </button>
                    </form>
                    <p className='my-5'>Chưa có tài khoản?
                        <Link to={"/sign-up"} className='p-2 text-blue-700 hover:text-red-600'>Đăng ký</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
export default Login
