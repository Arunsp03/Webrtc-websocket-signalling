import React, { useEffect, useRef } from 'react'
import "../Styles/chat.css";
export default function Chat() {



    let socket=new WebSocket("ws://localhost:8080");

    async function connecttosocket()
    {
      const name:string|null=sessionStorage.getItem("name");
      const room:string|null=sessionStorage.getItem("room");
      socket.send(JSON.stringify({type:"join",name:name,room:room}))

    }

    let localconnection=new RTCPeerConnection();
    let localvideo=useRef<HTMLVideoElement|null>(null);
    let remotevideo=useRef<HTMLVideoElement|null>(null);
    let textarea1=useRef<HTMLTextAreaElement|null>(null);
    let localstream:MediaStream;
    let remotestream:MediaStream;
    async function init()
    {
      
        localstream=await navigator.mediaDevices.getUserMedia({video:true});
        if(localvideo.current){
        localvideo.current.srcObject=localstream;
        }
        localstream.getTracks().forEach((track)=>{
            localconnection.addTrack(track,localstream)
        })
        remotestream=new MediaStream();
        if(remotevideo.current){
        remotevideo.current.srcObject=remotestream;
        }
        localconnection.ontrack=(e)=>{
          
          
          
          e.streams[0].getTracks().forEach((track)=>{
            remotestream.addTrack(track);
          }) 
        }
        localconnection.onicecandidate=async (e)=>{
          if(e.candidate)
          {
       //   console.log("new ice candidate",e.candidate);
          socket.send(JSON.stringify({type:"candidate",candidate:e.candidate}));
          }
        }

        socket.onopen=(e)=>{
          console.log("socket is open");
    
          
        }
        socket.onmessage = ( async message=>{
         // console.log("message received",message.data);
          let data=JSON.parse(message.data);
        //  console.log("type",data.type);
          
          if(data.type=="offer")
          {
            //console.log("received offer",data.offer);
            
            localconnection.setRemoteDescription(new RTCSessionDescription(data.offer))
           await localconnection.createAnswer().then((answer)=>{
           // console.log("created answer",answer);
            
            localconnection.setLocalDescription(new RTCSessionDescription(answer));
            socket.send(JSON.stringify({type:"answer",answer:answer}));
           }).catch((err)=>{
            console.error(err);
           });
    
           
              
           
          }
          else if(data.type=="answer")
          {
            //console.log("answer is here",data);
            
      //    console.log("received answer",data.answer);
           await localconnection.setRemoteDescription(new RTCSessionDescription(data.answer));
          }
          else if(data.type="candidate")
          {
        //      console.log("received ice candaidate and set as remote desc",data.candidate);
            
          await localconnection.addIceCandidate(new RTCIceCandidate(data.candidate));
          }
          
        })
    }


 

    useEffect(()=>{ 
        async function startup()
        {
          
            await init();
            await connecttosocket();

        }
        startup();

        
    },[])
async function createoffer()
{
  await localconnection.createOffer().then((offer)=>{
    localconnection.setLocalDescription(new RTCSessionDescription(offer));
    socket.send(JSON.stringify({type:'offer',offer}));
  });
 
  

}

  return (
    <div>
      <video ref={localvideo} id='video1' autoPlay playsInline></video>
      <video ref={remotevideo} id='video2' autoPlay playsInline></video>
      <textarea ref={textarea1} id='t1'></textarea>
      <button onClick={()=>{
        createoffer();
      }}>Create offer</button>
      
    </div>
  )
}
