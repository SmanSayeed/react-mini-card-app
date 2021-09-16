// import React,{useContext} from 'react'
import {Route,Switch} from 'react-router-dom';


import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Note from '../pages/Note'
import EditNote from '../pages/EditNote'
// import { UserContext } from '../App';

function Router() {
    // const user = useContext(UserContext);
    return (
        <>
          <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route  path="/home">
                <Home />
            </Route>
            <Route  path="/login">
                <Login />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/create-note">
                <Note />
            </Route>

            <Route path="/update/:data">
                <EditNote />
            </Route>

           

          </Switch>  
        </>
    )
}

export default Router
