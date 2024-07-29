import React, { useState } from 'react';
import axios from 'axios';
import Interpreter from './Interpreter.jsx'


function Admin(){
    const [logingin,setLogingin] =useState(true);
    const [loginfailure,setLoginfailure] =useState(false);
    const [loading,setLoading]= useState(false);
    const [showingdata,setShowingdata] =useState(false);
    const [showinglist, setShowinglist] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    
    let verification = false;
    const [result,setResult]=useState([]);
    const [document, setDocument] = useState({});
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data={'username': username,'password': password}
        
        try {
            setLoading(true);
            setLogingin(false);
            const response = await axios.post('http://127.0.0.1:8001/check', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage1(response.data.message);
            verification=response.data.verification ;
            console.log(verification);
        } catch (error) {
            console.error('There was an error sending the form!', error);
        }

        //console.log('Username:', username);
        //console.log('Password:', password);

        if (verification) {
            setLoading(false);
            setLoginfailure(false);
            showdata()
        } else {
            console.log('log in failed');
            setLoading(false);
            setLoginfailure(true);
            setLogingin(true);
            
        }
    };

    const showdata = async () => {
        const data={'username': username,'password': password}
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8001/history', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setMessage2(response.data.message);
            setResult(response.data.result);
            
            setLoading(false);
            setShowinglist(true)
            
        } catch (error) {
            console.error('There was an error sending the form!', error);
        }

    };

    function getFileName(filePath) {
        
        if (!filePath) {
            console.error('Invalid filePath:', filePath);
            return '';
        }
        return filePath.split('/').pop();
    }

    const  handleClick1 = (ID) => {
        console.log('Button was clicked!'+ID);
        setShowinglist(false);
        setShowingdata(true);
        setDocument(result.filter((element) => element.ID === ID)[0])
    };

    const  handleClick2 = () => {
        console.log('Button was clicked!');
        setShowingdata(false);
        setShowinglist(true);
    };

    if (showinglist){
        console.log(message1)
        console.log(message2)
    }
    

    return (<>
        {logingin &&<div className="login-container">
            
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Se connecter en tant qu'administrateur</h2>
                <div className="form-group">
                    <label htmlFor="username"> Nom d'utilisateur</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Connexion</button>
                {loginfailure && <h2 className='error'>Échec de Connexion</h2>}
            </form>
        </div>}
        {loading &&<div className="loader-container">
        <div className="loader"></div>
        <h1>Chargement...</h1>
        </div>}
        
        {showinglist && <div className='history_list_container'> 
            {result.map((document) => <div key={document.ID} className='history_list_card'>
                <img className='history_list_img'src={'http://127.0.0.1:8001/images/'+getFileName(document.image_path)} alt="uploaded_image" ></img>
                <div className='history_list_text'>
                    <p className='history_text'>
                        <span className='history2ndcolor'>ID:</span> {document.ID}
                        <br></br>
                        <span className='history2ndcolor'>Date:</span> {document.date}
                        <br></br>
                        <span className='history2ndcolor'>Temps:</span> {document.time}
                        <br></br>
                        <span className='history2ndcolor'>Prix:</span> {document.price} USD 
                    </p>
                    <button onClick={() => handleClick1(document.ID)} className='button'>
                        Charger
                    </button>
                </div>
                
            </div>)}
        </div>}
        { showingdata && <><div key={document.ID} className='hsitory_container'>
            <div className='history_heder'>
                <pre className='history_text'><span className='history2ndcolor'>ID:</span> {document.ID}    <span className='history2ndcolor'>Date:</span> {document.date}   <span className='history2ndcolor'>Temps:</span> {document.time}   <span className='history2ndcolor'>Prix:</span> {document.price} USD </pre>
            </div>
            <div  className='image-container'>
                <img src={'http://127.0.0.1:8001/images/'+getFileName(document.image_path)} alt="uploaded_image" ></img>
            </div>
            <Interpreter  argument={document.response}/>
        </div>
        <button onClick={() => handleClick2()} className='button'>
            Retour
        </button>
       </>}
    </>);


}
export default Admin
