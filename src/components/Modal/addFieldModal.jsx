import React from 'react'
import './modal.css'

const AddFieldModal = () => {
  return (
    <>
        <div className='modal-class'>
          <h4>Add Field</h4>
          <div className='modal-body'>
            <div className='field-container'>
            <label>Enter Key</label>
            <input type="text" className='input-field'/>
            </div>
            <div className='field-container'>
            <label>Enter Value</label>
            <input type="text" className='input-field'/>
            </div>
          </div>
          <div className='button-container'>
            <button>Add</button>
          </div>
        </div>
        <div className='backdrop'></div>
        </>
  )
}

export default AddFieldModal