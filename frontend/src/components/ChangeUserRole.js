import React, {useState} from 'react'
import ROLE from "../common/role";
import {RiCloseLine} from "react-icons/ri";
import SummaryApi from "../common";
import {toast} from "react-toastify";

const ChangeUserRole = ({
                            name,
                            username,
                            userId,
                            role,
                            onClose,
                            callFunc
                        }) => {

    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
        console.log(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchDataResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchDataResponse.json()

        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated", responseData)

    }
    return (
        <div
            className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-55'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

                <button className='block ml-auto' onClick={onClose}>
                    <RiCloseLine/>
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p> Name: {name}</p>
                <p>Username: {username}</p>
                <div className='flex items-center p-2'>
                    <p>Role:</p>
                    <select className='border px-4 pr-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className='w-fit mx-auto block py-1 px-3 rounded bg-slate-200 hover:bg-slate-300'
                        onClick={updateUserRole}>Change Role
                </button>
            </div>
        </div>
    )
}
export default ChangeUserRole
