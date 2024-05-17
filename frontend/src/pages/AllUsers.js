import React, {useEffect, useState} from 'react'
import SummaryApi from "../common";
import {toast} from "react-toastify";
import moment from "moment"
import {FaRegEdit} from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        username: "",
        name: "",
        role: "",
        _id : ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }

        console.log(dataResponse)
    }

    useEffect(() => {
        fetchAllUsers()
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                <tr className='bg-gray-500 text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Role</th>
                    <th>Create Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    allUser.map((el, index) => {
                        return (
                            <tr key={el.username}>
                                <td>{index + 1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.username}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-white p-2 rounded cursor-pointer hover:bg-slate-200'
                                            onClick={() => {
                                                setUpdateUserDetails(el)
                                                setOpenUpdateRole(true)
                                            }}
                                    >
                                        <FaRegEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        username={updateUserDetails.username}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    />
                )
            }
        </div>
    )
}
export default AllUsers
