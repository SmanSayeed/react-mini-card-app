import React,{useEffect,useState} from 'react';
import {useAuth} from '../contexts/AuthContext'
import NoteCard from '../components/NoteCard'
import {rdb} from '../firebase'
function Home() {
    
    const {currentUser} = useAuth();
    const [noteData,setNoteData] = useState({});
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        rdb.child("notes").on("value", (snapshot)=>{
            if(snapshot.val != null){
                setNoteData({...snapshot.val()});
                setLoading(false)
            }else{
                setNoteData({});
                setLoading(false)
            }
        })

        return () => {
            setNoteData({});
        }
    }, []);


console.log(noteData);

    if(currentUser){
        return (
            <>
                <div className="wrapper">
                    <div className="welcome" >
                       <h2> Welcome {currentUser.email}</h2>    
                    </div>
                </div>

                <div className="noteContainer wrapper">
                
                {
                    Object.keys(noteData).map( (id,index) => {
                        return(
                            
                            <>
                                    {/* {id} - {index} - {noteData[id].title} */}
                                    <NoteCard
                                        key={id}
                                        id={id}
                                        uid={noteData[id].uid}
                                        title = {noteData[id].title}
                                        note = {noteData[id].note}
                                        status={noteData[id].status}
                                        category={noteData[id].category}
                                    />
                                
                            </>
                        );
                    })
                }
                 
                
                </div>

               
               
             </>
         )
    }else{
        return (
            <>
                
                <div className="noteContainer wrapper">
                <div className="wrapper">
                    <div className="welcome" >
                       <h2> Please Login to create your public or private note</h2>    
                    </div>
                </div>

                
                {
                    Object.keys(noteData).map( (id,index) => {
                        return(
                            
                            <>
                                    {/* {id} - {index} - {noteData[id].title} */}
                                    <NoteCard
                                        key={id}
                                        id={id}
                                        uid={"11"}
                                        title = {noteData[id].title}
                                        note = {noteData[id].note}
                                        status={noteData[id].status}
                                        category={noteData[id].category}
                                    />
                                
                            </>
                        );
                    })
                }
                 
                
                </div>
               
               
             </>
         )
    }
 
      
}

export default Home
