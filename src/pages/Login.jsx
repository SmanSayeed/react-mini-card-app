import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {auth} from '../firebase';
function Login() {

   
   const [user,setUser] = useState({
    email:"",
    password:""
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
        console.log('got')
   
       console.log(user);
       console.log('login loading....');

       try{
            const result = await auth.signInWithEmailAndPassword(user.email,user.password);
            alert(`Login success: ${result.user.email}`);
            history.push('/');
        }catch(err){
            alert(`Fail: ${err}`);
        }
        console.log('login complete');

   }

    return (
        <>
        <div className='wrapper'>
           <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="container">
                    <h1>Login</h1>
                    <p>Please fill in this form to create an account.</p>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" onChange={getUserData} required />   

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="psw" onChange={getUserData} required />

                    <button type="submit" className="registerbtn">Login</button>
              
                </div>
                <div className="container signin">
                    <p>Don't have an account? <Link to="/signup">Sign up</Link>.</p>
                </div>
        
           </form>
           </div>
    </>
    )
}

export default Login
