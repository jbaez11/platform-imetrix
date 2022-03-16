import React from 'react'
import * as RB from 'react-bootstrap';
import './LoadingScreen.css'
import iMetrixLogo from '../../assets/imagenes/logo2.png'

export default function LoadingScreen() {
  return (
        <div className='LoadingScreen'>
            <div className="logo">
                <img src={iMetrixLogo} alt="Logo iMetrix" />
            </div>
            <div className="spinner">
              <RB.Spinner className="spinner" animation='grow' variant='warning'/>
            </div>
        </div>
  )
}
