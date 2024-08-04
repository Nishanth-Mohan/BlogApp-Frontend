import { Alert, Button, TextInput,FloatingLabel } from 'flowbite-react'
import React, {useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiInformationCircle } from 'react-icons/hi'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess, updateFailure, updateStart, updateSuccess } from '../Redux/Slice/userSlice'
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from 'react-router-dom'

const DashboardProfile = () => {
    const dispatch = useDispatch();
    const {currentuser,loading,error} = useSelector((state)=>state.user)
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError,setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const [formData, setFormData] = useState({});
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [openModal,setOpenModal] = useState(false);
console.log(error);

//Onchange in image uploading:
    const handleImageChange = (e)=>{
      const file = e.target.files[0]
      if(file){
        setImageFile(file)
        setImageFileUrl(URL.createObjectURL(file))
      }
    }
 
    useEffect(()=>{
      if(imageFile){
        uploadImage()
      }
    },[imageFile])

//Firebase image upload and storage part:
    const uploadImage =async()=>{
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0)); //10.6794764
        },
        (error) => {
          console.log(error);
          setImageFileUploadError('Could not upload the image (File size must be less than 4MB)');
          setImageFileUrl(null);
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUploading(false)


        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL)
            setFormData({...formData,profilePicture : downloadURL})
            setImageFileUploading(false)
          });
        }
      );
    }
//Onchange input fields:    
    const handleChange = (e)=>{
      setFormData({...formData,[e.target.id]: e.target.value.trim()})
    }
//Updating User:    
    const handleSubmit = async(e)=>{
      e.preventDefault();
      if(Object.keys(formData).length === 0){
          setUpdateUserError('No Changes Made');
          return
      }
      if(imageFileUploading){
        setUpdateUserError('Please wait while the image is uploading')
      }
      try {
        dispatch(updateStart())
        const response = await fetch(`http://localhost:5000/api/user/update/${currentuser.rest._id}`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json',
            "token": localStorage.getItem("Token")  //This line is to get the token
          },
          body:JSON.stringify(formData)
        })
        const data = await response.json();
        console.log(data);
        
        
        if(!response.ok){
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message)
          console.log(data.message);
          
        }
        else{
          dispatch(updateSuccess(data))
          setUpdateUserSuccess('User Profile Updated Successfully')
        }

      } catch (error) {
        console.log(error.message);
        
        dispatch(updateFailure(error.message))
        setUpdateUserError(error.message)
      }
    }
//Signout user:
    const handleSignOut = ()=>{
        dispatch(signOutSuccess())
        localStorage.removeItem("Token")    //This line is to remove the token
    }
//Delete user:
    const handleDelete = async()=>{
         setOpenModal(false);
            try {
              dispatch(deleteUserStart())
              const response = await fetch(`http://localhost:5000/api/user/delete/${currentuser.rest._id}`,{
                method:'DELETE',
                headers:{
                  'Content-Type':'application/json',
                  "token":localStorage.getItem("Token")
                }
              })
              const data = await response.json();
              if(!response.ok){
                dispatch(deleteUserFailure(data.message))
              }
              else{
                dispatch(deleteUserSuccess())
              }
            } catch (error) {
              dispatch(deleteUserFailure(error.message))
            }
    }


  return (
    <div className='max-w-lg mx-auto p-4 w-full'>
      <h1 className='my-7 text-center font-semibold text-4xl'>Profile</h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <input type='file' accept='image/*' ref={filePickerRef} onChange={handleImageChange} hidden/>
         <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>filePickerRef.current.click()}>
            {
              imageFileUploadProgress && (
                    <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top:0,
                        left:0
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`
                      }
                    }}
                    />
                  )
            }

            <img alt='user' src={imageFileUrl || currentuser.rest.profilePicture} 
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgrey] ${
              imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'
            }`}/>
         </div>

         {imageFileUploadError && (<Alert color="failure" className='mt-4' icon={HiInformationCircle}>
            <span className="font-medium">OOPS!📝</span>&nbsp;{imageFileUploadError}.
          </Alert>)
         }
            
            
           <TextInput type='text' id='username' placeholder='UserName' defaultValue={currentuser.rest.username} onChange={handleChange} />
           <TextInput type='email' id='email' placeholder='Email' defaultValue={currentuser.rest.email} onChange={handleChange}/>
           <TextInput type='password' id='password' placeholder='********' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone="greenToBlue" disabled={loading || imageFileUploading}>
          {loading? 'loading...' : 'Update'}
        </Button>
        

        <Link to='/create-post'>
          <Button gradientDuoTone="greenToBlue" className='w-full'>
            Create Post
          </Button>
        </Link>
        
      </form>
      <div className='text-red-600 flex justify-between mt-5'>
        <span className='cursor-pointer'onClick={()=>setOpenModal(true)}>Delete Account?</span>
        <span className='cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>
          {updateUserSuccess && (<Alert color="success" className='mt-4' icon={HiInformationCircle}>
            <span className="font-medium">😎Yaaa!</span>&nbsp;{updateUserSuccess}.
          </Alert>)}

          {updateUserError && (<Alert color="failure" className='mt-4' icon={HiInformationCircle}>
            <span className="font-medium">OOPS!📝</span>&nbsp;{updateUserError}.
          </Alert>)
          }

          {
            error && (<Alert color="failure" className='mt-4' icon={HiInformationCircle}>
              <span className="font-medium">OOPS!📝</span>&nbsp;{error}.
            </Alert>)
          }
         <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
         <Modal.Header />
         <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
         </Modal.Body>
         </Modal>
    </div>
  )
}

export default DashboardProfile