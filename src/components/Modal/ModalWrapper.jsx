import React from 'react'
import Modal from '../models/ModalContent'
// import { useToast } from '../../contexts/ToastContext'

const ModalWrapper = (Component) => {
    // const  showToast = useToast();
    
  return (props) => (
    <Modal onClose={props.onClose}>
        <Component {...props} />
    </Modal>
  )
}

export default ModalWrapper