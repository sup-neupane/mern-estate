import { useEffect, useRef , useState} from 'react'
import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';





export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});



  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


 const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };



  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-center my-7 font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input onChange={(e)=>
          setFile(e.target.files[0])
        } type="file" ref= {fileRef} hidden accept='image/*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input type="text" placeholder="username" id="username" className='boarder p-3 rounded-lg'/>
        <input type="text" placeholder="email" id="email" className='boarder p-3 rounded-lg'/>
        <input type="password" placeholder="password" id="password" className='boarder p-3 rounded-lg'/>


        <button
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          update
        </button>
        
      </form>
      <div className='flex justify-between mt-5'>
          <span className='text-red-700'>Delete Account</span>
          <span className='text-red-700'>Sign Out</span>
      </div>
    </div>
  )
}
