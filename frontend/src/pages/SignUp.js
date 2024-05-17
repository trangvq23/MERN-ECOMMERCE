import React, {useState} from 'react'
import loginIcon from "../assets/loginIcon.jpg";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import {toast} from "react-toastify";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        username: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePicture: "",
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUpLoadPic = async (e) => {
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file)
        setData((preve) => {
            return {
                ...preve,
                profilePicture: imagePic
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataApi = await dataResponse.json()

            if(dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }

            if(dataApi.error) {
                toast.error(dataApi.message)
            }

        } else {
            toast.error("Mật khẩu không trùng nhau!")
        }

    }
    return (
        <section id='signup'>
            <div className='mx-auto container p-10'>
                <div className='bg-white p-5 w-full max-w-md mx-auto'>
                    <div className='w-16 h-16 mx-auto relative overflow-hidden'>
                        <div>
                            <img src={loginIcon || data.profilePicture} alt='login icon'/>
                        </div>
                        <form>
                            <label>
                                <div
                                    className=' bg-opacity-85 text-xs bg-white pb-2 text-center absolute top-6 w-full cursor-pointer'>
                                    Upload Photos
                                </div>
                                <input type='file' className='hidden' onChange={handleUpLoadPic}/>
                            </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Tên người dùng: </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Nhập tên người dùng'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>
                        <div className='grid'>
                            <label>Tên tài khoản: </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='text'
                                    placeholder='Nhập tên tài khoản'
                                    name='username'
                                    value={data.username}
                                    onChange={handleOnChange}
                                    required
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
                                    required
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
                        </div>
                        <div className='grid'>
                            <label>Xác nhận mật khẩu: </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Xác nhận mật khẩu'
                                    value={data.confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl'
                                     onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
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
                        </div>
                        <button
                            className='bg-gray-300 text-white px-6 py-2 w-full max-w-[150px] rounded hover:scale-110 transition-all mx-auto block mt-5'>
                            Đăng ký
                        </button>
                    </form>
                    <p className='my-5'>Đã có tài khoản?
                        <Link to={"/login"} className='p-2 text-blue-700 hover:text-red-600'>Đăng nhập</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
export default SignUp
