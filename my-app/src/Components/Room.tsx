import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Room() {
    const navigate=useNavigate();
    const[roomdetails,setRoomDetails]=useState({
        name:'',
        room:''
    });
    function handlechange(e: React.ChangeEvent<HTMLInputElement>){
        setRoomDetails({
            ...roomdetails,
            [e.target.name]:e.target.value
           
        })
    //    console.log("name",roomdetails.name);
    //    console.log("room",roomdetails.room);
    }

    function handlesubmit()
    {
        sessionStorage.setItem("name",roomdetails.name);
        sessionStorage.setItem("room",roomdetails.room);
        navigate("/chat");
    }

  return (
    <div>
      <form>
        <label htmlFor="name" >Name</label>
        <input id='name' name='name' onChange={(e)=>{
            handlechange(e)
        }}/>
        <label htmlFor='room'>Room Id</label>
        <input id='room' name='room' onChange={(e)=>{
            handlechange(e)
        }}/>
        <button type='button' onClick={()=>{
            handlesubmit();
        }}>Submit</button>
      </form>
    </div>
  )
}
