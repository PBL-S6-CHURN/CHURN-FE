import React from 'react'
import './style.css'

export default function AuthLayout({children}) {
    return (
        <div className='auth-wrapper'>
            {children}
        </div>
    )
}
