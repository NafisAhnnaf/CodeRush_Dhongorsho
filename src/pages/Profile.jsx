import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const backend =  import.meta.env.VITE_BACKEND;

const Profile = () => {
    const {id }= useParams();
    console.log(id);
    const [user, setUser] = useState({});
    console.log(localStorage.getItem('UserID'));
    useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const res = await axios.get(`${backend}/user/${id}`);
                console.log(res);
                setUser(res.data);
            }
            catch(err){
                if (err.response) {
                    console.error("Server responded with:", err.response.status, err.response.data);
                } else if (err.request) {
                    console.error("No response received:", err.request);
                } else {
                    console.error("Error setting up request:", err.message);
                }
            }
        }

        fetchUser();
    }, [id])

    const parseDate = (isoDate)=>{
        const date = new Date(isoDate);

        const formatted = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        return formatted;
    } 


  return (
            <div className="profile-mains">
            <h1>Profile</h1>
            <div className="profile-img">
                <img src={backend+"/"+user.img} alt="" />
            </div>
            <div className="profile-infos">
                <div className='flex flex-col'>
                    <div>Name: {user.name}</div>
                    <div>Email: {user.email}</div>
                    <div>Phone: {"0"+user.phone}</div>
                    <div>Date of Birth: {parseDate(user.dob)}</div>
                    <div>University: {user.university}</div>
                    <div>Department: {user.department}</div>
                    <div>Program: {user.program}</div>
                    <div>Current Year: {user.year}</div>
                </div>
            </div>
        </div>
  )
}

export default Profile