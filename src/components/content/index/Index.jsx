import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Index(){

    let history = useHistory()
    const userID = localStorage.getItem("ID");
    history.push("/inicio/"+ userID)

    return(
     
        <div>

        </div>

    );
}