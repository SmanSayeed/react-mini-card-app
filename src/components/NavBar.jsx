import React,{useContext} from 'react'
import {Link,NavLink,useHistory} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import {auth} from '../firebase';


function NavBar() {
    const history = useHistory();
    const {currentUser} = useAuth();



    return (
        <>  
             <div className="topnav" id="myTopnav">
                 <div className='wrapper flex-center'>
                    <Link to="/" className="logo">Note App</Link>
                    <NavLink exact to="/home" className='active' >Home</NavLink>
            
                  
                    {
                        currentUser?
                        <>
                                <NavLink exact to="/create-note">Create Note</NavLink>
                                <button id="logout" className="logout" onClick={()=>{
                            auth.signOut();
                            alert('Logged out successfully');
                            history.push('/login')
                        }}>Logout</button> 
                        </>
                    
                        :
                        <>
                        
                            <NavLink to="/login" className="pull-to-end">Login</NavLink>
                            <NavLink to="/signup" >Sign up</NavLink>

                        </>
            
                    }
     
         
               
                </div>
            </div>

              
        </>
    )
}

export default NavBar
