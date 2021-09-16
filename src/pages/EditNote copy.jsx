import React,{useState,useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom'
import {auth,rdb} from '../firebase';
import {UserContext,uid } from '../App';
import {useAuth} from '../contexts/AuthContext'




function EditNote() {
    const {currentUser} = useAuth();
    const userId = currentUser.uid;

    const initialState = {
        title:"",
        category:"Default",
        note:"",
        status:"Private",
        uid:userId 
    }

    const id = useParams();
    console.log(id);

    
    const [note,setNote] = useState(initialState); 

    const [noteData,setNoteData] = useState({});
    const [loading,setLoading] = useState({});
    
    useEffect(() => {
        rdb.child("notes").equalTo(JSON.stringify(id)).on("value", (snapshot)=>{
            console.warn(snapshot.val())
            if(snapshot.val != null){
                setNoteData({...snapshot.val()});

                setLoading(false)
            }else{
                setNoteData({});
                setLoading(false)
            }
        });

        return () => {
            setNoteData({});
        }
    }, [id]);

    useEffect(()=>{
        if(id){
            
            console.warn('got it---')
            console.log(noteData)
            console.warn('got it---')
            
            setNote({...noteData[id]})
        }else{
            setNote({...initialState})
        }

        return () => {
            setNote({...initialState});
        }
    },[id,noteData]);



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

    const {title,noteTxt} = noteData;
    console.log('--'+noteData.title+'--'+noteData.noteTxt);

    return (
        <div className="wrapper">
            <h1>Edit Note</h1>

            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="container">
                    <label htmlFor="title"><b>Title</b></label>
                    <input type="text" placeholder="Enter Title" name="title" id="title" onChange={getInputData} required value={title || ""} />   
                    
                    <label htmlFor="title"><b>Category</b></label>
                    
                    <select name="category" id="category" onChange={getInputData} className="custom-select">
                        <option value="Default" >Default</option>
                        <option value="Food">Food</option>
                        <option value="Education">Education</option>
                        <option value="Health">Health</option>
                    </select>
                    
                    <label htmlFor="note"><b>Note</b></label>
                
                    <textarea className="custom-textarea" id='note' name='note' onChange={getInputData} required value={noteTxt|| ""}>
                     
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

export default EditNote;
