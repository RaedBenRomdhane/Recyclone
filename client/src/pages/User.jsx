import React, { useState } from 'react';
import axios from 'axios';
import Interpreter from './Interpreter.jsx'
import Accept from './Accept.jsx'


function User() {
  
  const [message, setMessage] = useState('');
  const [filename, setFilename] = useState('');
  const [interpret, setInterpret] = useState('');
  const [unloaded ,setUnloaded]= useState(true);
  const [loading, setLoading] = useState(false);
  const [loaded,setLoaded] =useState(false);
  const [imageUrl,setImageUrl] = useState('');
  
  const handleFilesAccepted = async (acceptedFiles) => {
    const requestFile=acceptedFiles[0]
    
    const imageUrlInter = URL.createObjectURL(requestFile);
    setImageUrl(imageUrlInter);

    await handleSubmit(requestFile);
  }

  const handleSubmit = async (file) => {
    setUnloaded(false);
    setLoading(true);
    //e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setLoading(false);
      setLoaded(true);
      setMessage(response.data.message);
      //console.log(message);
      setFilename(response.data.filename);
      
      setInterpret(JSON.parse(response.data.interpretation));
      //console.log(interpret)
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
    
  };

  const  handleClick = () => {
    //console.log('Button was clicked!');
    setLoaded(false);
    setUnloaded(true);
  };
  if (loaded) {
    console.log(message);
  }

  return (<>
    {unloaded && <Accept onFilesAccepted={handleFilesAccepted} />}
    {loading &&<div className="loader-container">
      <div className="loader"></div>
      <h1>Chargement...</h1>
    </div>}
     
    {loaded &&
    <div  className='image-container'>
      <img src={imageUrl} alt="uploaded_image" ></img>
    </div>}
    
    {loaded && (<>
    <Interpreter argument={interpret}/>
    <div className='button_container'>
    <button onClick={handleClick} className='button'>
    Recharger
    </button>
    </div>
    </>)}
  </>);
}

export default User;