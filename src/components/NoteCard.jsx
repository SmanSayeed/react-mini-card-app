import React from 'react';
import {useAuth} from '../contexts/AuthContext'
import {Link} from 'react-router-dom'
import {rdb} from '../firebase'
function NoteCard(props) {
    
    
    const {currentUser} = useAuth();

    
    let noteClass = 'note';
    let cuid = '';
    if(currentUser){
        cuid = currentUser.uid;
        if(currentUser.uid===props.uid){
            noteClass = 'usernote';

        }
    }
  
    
    if(props.status==="Private"){
        noteClass = 'privatenote';
    }

    const onDelete = (id) =>{

            if(window.confirm("Are you sure to delete?")){
                    rdb.child(`notes/${id}`).remove((err)=>{
                        if(err){
                            alert('error '+ err);
                        }else{
                            alert('Successfully deleted');
                        }
                    })
            }
    }   


     
    if(cuid!==props.uid && props.status==="Private" ){
        return (
            <></>
        );
    }else{
        return (
            <>
                    <div className={noteClass} key={props.id}>
                        <div className="noteheader">
                            <div className="notetitle">
                                <p>{props.title}-{props.status}</p>

                            </div>
                            <div className="noteaction">
                                <Link to={`/update/${JSON.stringify(props)}`}>
                                    <button className="notebtn edit" id="edit">
                                        Edit
                                    </button>
                                </Link>
                                
                                    <button className="notebtn delete" id="delete" onClick={()=>onDelete(props.id) }>
                                        Delete
                                    </button>
                         
                            
                            </div>
                        </div>
                        <div className="notebody">
                        <p>
                            {props.note}
                       </p>
                      </div>
                  
                    </div>
            
               
               
             </>
         )
    }
       
   
 
      
}

export default NoteCard
