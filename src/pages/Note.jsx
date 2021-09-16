import React,{useState,useContext} from 'react';
// import {useHistory} from 'react-router-dom'
import {auth,rdb} from '../firebase';
import { UserContext,uid } from '../App';
import {useAuth} from '../contexts/AuthContext'


function Note() {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    
    const [note,setNote] = useState({
        title:"",
        category:"Default",
        note:"",
        status:"Private",
        uid:userId 
    }); 

    // const handleChange = () => {
    //   checked?setChecked(false):setChecked(true);
    // };
  
    
    // checked?checkStatus="Public":checkStatus="Private";
    // console.log(checkStatus);



    let name,value;
    
    const getInputData = (event) => {
        
        name = event.target.name;
        value = event.target.value;
        setNote({...note, [name]:value}); // Note setState hook
    }

   

    const handleSubmit =  (e) => {
        e.preventDefault();
        
        console.log(note);
        console.log("Loading note ...")


        if(!note.title || !note.category || !note.note || !note.status || !note.uid){
            alert('data is missing');
        }else{
            rdb.child("notes").push(note, (err)=>{
                if(err){
                    alert(`failed - ${err}`)
                }else{
                    alert('success')
                }
            })
        }
        console.log("Loading note Completed")
    }


    return (
        <div className="wrapper">
            <h1>Create Note or {userId}</h1>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="container">
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" placeholder="Enter Title" name="title" id="title" onChange={getInputData} required />   
                    
                    <label htmlFor="title"><b>Category</b></label>
                    
                    <select name="category" id="category" onChange={getInputData} className="custom-select">
                        <option value="Default" >Default</option>
                        <option value="Food">Food</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                    </select>
                    
                    <label htmlFor="note"><b>Note</b></label>
                
                    <textarea className="custom-textarea" id='note' name='note' onChange={getInputData} required>
                            
                    </textarea>
                    <br />

                    <label htmlFor="status"><b>Make this public or private</b></label>
                    
                    <select name="status" id="status" onChange={getInputData} className="custom-select">
                        <option value="Private" >Private</option>
                        <option value="Public">Public</option>
                   
                    </select>

                    {/* <input     type="checkbox" checked={checked} onChange={handleChange} name="status" id="status" value={checkStatus} /> Make This Public
                    <br /> */}
                    <button type="submit" className="registerbtn">Create</button>
              
                </div>

        
           </form>

        </div>
    )
}

export default Note
