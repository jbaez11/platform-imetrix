import React from 'react'
import "./start.css";
import LoginAdmin from '../login/LoginAdmin';

export default function Start() {
    return (
        <div className="start">
            <div className="admin">
                <LoginAdmin/>
            </div>
        </div>
    )
}
