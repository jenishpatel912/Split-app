import React from 'react'
import { ModalContainer } from './ModalContainer'
import '../Modal/modalcontent.css'
import './modal.css'

const Modal = ({children,onClose}) => {
  return (
    <ModalContainer onClose={onClose}>
    <div className='modal-close'><span onClick={onClose} className='cursor-pointer'>&times;</span></div>
    <div style={{'textAlign':'center'}}>
     {children}
    </div>
    </ModalContainer>
  )
}

export default Modal