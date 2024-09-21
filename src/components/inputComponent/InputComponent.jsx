import React from 'react'
import './style.css'

function InputComponent({type,htmlFor,onChange,id,className,label,accept}) {
    return (
        <div className='container'>
            <label htmlFor={htmlFor}>{label}</label>
            <input className={className} id={id} type={type} onChange={onChange} accept={accept} />
        </div>
    )
}

export default InputComponent