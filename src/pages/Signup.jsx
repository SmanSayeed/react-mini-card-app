import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {auth} from '../firebase';


function Signup() {
   

    const [user,setUser] = useState({
        username:"",
        email:"",
        password:"",
        repassword:""
    });

    const history = useHistory();

    let name,value; // To get input data
    
    const getUserData = (event) => {
    
        name = event.target.name;
        value = event.target.value;

        setUser({...user, [name]:value}); // User setState hook
        
    }


   const handleSubmit = async (e) => {
       e.preventDefault();
       console.log(user);
       console.log('loading....');

       try{
            const result = await auth.createUserWithEmailAndPassword(user.email,user.password);
            alert(`success: ${result.user.email}`);
            history.push('/');
       }catch(err){
            alert(`Fail: ${err}`);
       }
       
       console.log('Complete');
    
   }

    return (
        <>
           <div className='wrapper'>
            <div id="message">
                
            </div>
           <form onSubmit={(e)=>handleSubmit(e)} action="POST">
                <div className="container">
                    <h1>Sign up</h1>
                    <p>Please fill in this form to create an account.</p>

                    {/* <label htmlFor="username" ><b>User name</b></label>
                    <input type="text" placeholder="Enter username" name="username" id="username" onChange={getUserData} required />    */}

                  
                    <label htmlFor="email" ><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" onChange={getUserData} required />   

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="psw" onChange={getUserData} required />

                    {/* <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="repassword" id="psw-repeat" onChange={getUserData} required />
                    <hr/> */}

                    <button type="submit" className="registerbtn">Register</button>
              
                </div>
                <div className="container signin">
                    <p>Already have an account? <Link to="/login">Login</Link>.</p>
                </div>
        
           </form>
           </div>
    </>
    )
}

export default Signup
