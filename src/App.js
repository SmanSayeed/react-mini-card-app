import './App.css';
import React,{useState,useEffect,createContext} from 'react';
import Router from './components/Router';
import NavBar from './components/NavBar';
import {auth} from './firebase';
import { AuthProvider } from "./contexts/AuthContext"

//  const UserContext = createContext();
//    const oA = () => {
//     return auth.onAuthStateChanged(user => {
//       if (user) {
//         console.log("The user is logged in");
//       } else {
//         console.log("The user is not logged in");
//       }
//     });
//   }

function App() {

//   const [user,setUser] = useState(null);



//   useEffect(()=>{
//     auth.onAuthStateChanged(user =>{
//     user?setUser(user):setUser(null);
//     // console.log(user);
//   })

// },[user]);
  
  return (
    <div >
      <AuthProvider>
         <NavBar />
     </AuthProvider>
     <AuthProvider>
         <Router />
      </AuthProvider>
    
      {/* <UserContext.Provider value={user}>
        <NavBar />
      </UserContext.Provider>

      <UserContext.Provider value={user}>
        <Router />
      </UserContext.Provider> */}
    </div>
  );
}

export default App;
// export {UserContext}