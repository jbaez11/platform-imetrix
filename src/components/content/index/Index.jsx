import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Index(){

    let history = useHistory()
    const userID = localStorage.getItem("ID");
    history.push("/inicio/"+ userID)

    return(
     
        <section className="content">
				<div className="error-page">
					<h2 className="headline text-warning"></h2>					
					<div className="error-content pt-5">
						<h3>
							<i className="fas fa-exclamation-triangle text-warning"></i>{" "}
							Retomando sesión actual
						</h3>
					</div>
				</div>
			</section>

    );
}