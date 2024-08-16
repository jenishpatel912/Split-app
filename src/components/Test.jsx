import React,{useState} from 'react'

function Test() {
 const [firstName, setFirstName] = useState('Abhishek')
 const [lastName, setLastName] = useState("Bhatt")
 const [oldFullName] = useState(firstName+lastName)
 const fullName = firstName+lastName

 const newUpdateState = () => {
    setLastName('Pranav')
 }
console.log("rendered")
 return (
     <>
         <button onClick={newUpdateState}> Click to Update</button>
         <h1> {`Initiail Value of New State ${firstName}`}</h1>
         <h1> {`Initiail Value of New State ${lastName}`}</h1>
         <h1> {`Initiail Value of New State ${fullName}`}</h1>
         <h1> {`Initiail Value of New State ${oldFullName}`}</h1>
     </>
 )
}

export default Test