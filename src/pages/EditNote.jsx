import React,{useState,useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom'
import {auth,rdb} from '../firebase';
import {UserContext,uid } from '../App';
import {useAuth} from '../contexts/AuthContext'


function Note() {
    const history = useHistory();
    const gd = useParams();
    const gdt = JSON.parse(gd.data);
    console.log(gdt.title+'--'+gdt.note+'--'+gdt.status+'--'+gdt.category+'--'+gdt.uid)

    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    
    const [note,setNote] = useState({
        title:gdt.title,
        category:gdt.category,
        note:gdt.note,
        status:gdt.status,
        uid:gdt.uid 
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
    console.warn(note);

   

    const handleSubmit =  (e) => {
        e.preventDefault();
        
        console.log(note);
        console.log("Loading note ...")


         rdb.child(`notes/${gdt.id}`).push(note, (err)=>{
                if(err){
                    alert(`Update failed - ${err}`)
                }else{
                    console.log(note)
                    alert('Update success')
                    // history.push('/');

                }
            })
      
        console.log("Loading note Completed")
    }


    return (
        <div className="wrapper">
            <h1>Update Note</h1>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="container">
                    <label htmlFor="title"><b>Title</b>    [{gdt.title}]</label>
                    <input type="text" placeholder="Enter Title" name="title" id="title" onChange={(e)=>getInputData(e)}  />   
                    
                    <label htmlFor="title"><b>Category</b></label>
                    
                    <select  defaultValue={gdt.category}  name="category" id="category" onChange={()=>getInputData} className="custom-select">
                        <option value="Default" >Default</option>
                        <option value="Food">Food</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                    </select>
                    
                    <label htmlFor="note"><b>Note</b>    [{gdt.note}]</label>

                
                    <textarea className="custom-textarea" id='note' name='note' onChange={()=>getInputData}  >
                            
                    </textarea>
                    <br />

                    <label htmlFor="status"><b>Make this public or private</b></label>
                    
                    <select defaultValue={gdt.status}  name="status" id="status" onChange={()=>getInputData} className="custom-select">
                        <option value="Private" >Private</option>
                        <option value="Public">Public</option>
                   
                    </select>

                    {/* <input     type="checkbox" checked={checked} onChange={handleChange} name="status" id="status" value={checkStatus} /> Make This Public
                    <br /> */}
                    <button type="submit" className="registerbtn">Update</button>
              
                </div>

        
           </form>

        </div>
    )
}

export default Note
