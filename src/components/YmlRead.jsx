import React, { useEffect, useRef, useState } from 'react';
import yaml from 'js-yaml';
import { saveAs } from 'file-saver';
import './ymlread.css'
import AddFieldModal from './Modal/addFieldModal';
class randomTest{
  dummyFunc(){
   
  }
}
const YamlReaderComponent = () => {
  const a = new randomTest();
  console.log(a)
  const [yamlData, setYamlData] = useState(null);
  const [keyEdit, setKeyEdit] = useState(false);
  const [newId, setnewId] = useState('');
  const fileref = useRef()
  const inputref = useRef()

  useEffect(()=>{
     if(newId) {
      console.log(inputref.current,newId)
      inputref.current.focus()
     }
  },[newId])
  
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if(!file) return
    console.log(file)
    const extension = file.name.split('.').pop()?.toLowerCase();
    if(extension!=='yml' && extension!=='yaml'){
      alert("Only yml file is allowed");
      return
    }
    if (file) {
      try {
        const fileContents = await readFileAsync(file);
        const data = yaml.load(fileContents);
        console.log(data)
        setYamlData(Object.entries(data));
      } catch (error) {
        console.error(`Error reading YAML file: ${error.message}`);
      }
    }
  };

  const handleSaveClick = () => {
    try {
      console.log(yamlData,"save file")
      const yamlString = yaml.dump(Object.fromEntries(yamlData), { indent: 2 });

      // Save the edited data as a new YAML file using FileSaver.js
      const blob = new Blob([yamlString], { type: 'application/x-yaml' });
      saveAs(blob, `new-edited.yaml`);
    } catch (error) {
      console.error(`Error parsing YAML data: ${error.message}`);
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  };
  const handeKeyChange = (e,data,key,index,ref) => {
    console.log(ref,key)
    const val = e.target.value
    console.log(val)
    if(!val || val===key) {
      e.target.value=key;
      return;
    };
    if(!ref) data[index][0] = val;
    else {           
      Object.keys(ref).forEach(item=>{
        if(item===key){
          ref[val] = ref[key]
          delete ref[key];
        }else{
          const val = ref[item];
          delete ref[item]
          ref[item] = val;
        }
      })
    }
    console.log(yamlData)
  }

  const handeValueChange=(e,data,key,index,ref,isarray,oldVal)=>{
    let val = e.target.value
    if(!val) {
      e.target.value=oldVal;
      return;
    };
    if(isarray){
      val=val.split(',')
    }
    console.log(yamlData,data,ref);
    if(Array.isArray(ref)){
      ref[index] = val;
      return;
    }
    if(!ref) data[index][1] = val;
    else ref[key]=val
    // data[key] = val
  }
  const handleDelete = (data,key,index,ref) => {
    if(!ref) yamlData.splice(index,1);
    else delete ref[key];
    setYamlData([...yamlData])
  }
  const createRandom = () => {
    let randomNumber = ''
    for(let i =0;i<3;i++){
       randomNumber+=Math.floor(Math.random()*10)
    }
    return randomNumber
  }
  const handleAdd = (data,key,index,ref) => {
    console.log(ref,key)
    const generatedNum = createRandom()
    if(!ref) yamlData.splice(index+1,0,[`new${generatedNum}`,'']);
    else {
      Object.keys(ref).forEach(item=>{
        const val = ref[item];
          delete ref[item]
          ref[item] = val;
        if(item===key){
          ref[`new${generatedNum}`] = ''
        }
        
      })
    };
    setYamlData([...yamlData])
    setnewId(`new${generatedNum}`)
  }
 const RenderYmlEntities = ({data,nested,refdata=null,nestedArr=false}) => {
    const [show,setShow] = useState(Object.keys(data).map(item=>true))
    const isNested = (entityValue) => Array.isArray(entityValue ) || (typeof entityValue  === 'object' && !(entityValue instanceof Date))
      return (
        <>
        {data?.map(([entityKey,entityValue],index) => (
            <div key={entityKey} className='entity-container' style={{left:nested?'40px':0}}>
              {isNested(entityValue) && <i className={`fa fa-sm fa-angle-${show[index]?'down':'up'}`} aria-hidden="true" onClick={()=>setShow(prev=>prev.map((it,ind)=>ind===index?!it : it))}></i>}
                {!nestedArr  && <><div className='input-key-container'>
                   <input defaultValue={entityKey} ref={entityKey===newId ? inputref : null} className='input-key yml-content' disabled={!keyEdit} onBlur={(e)=>handeKeyChange(e,data,entityKey,index,refdata)}/>
                   <button className='delete-button' typ="button" style={{display:keyEdit ? '' : 'none'}} onClick={()=>handleDelete(data,entityKey,index,refdata)}><i className="fa fa-sm fa-trash" aria-hidden="true"></i></button>
                   <button type='button' className='add-button' style={{display:keyEdit ? '' : 'none'}} onClick={()=>handleAdd(data,entityKey,index,refdata)}><i className="fa fa-plus fa-sm" aria-hidden="true"></i></button>
                 </div>
               <span></span></>}
              {
                Array.isArray(entityValue ) ? show[index] ? <RenderYmlEntities nested nestedArr data={entityValue.map(item=>[entityKey,item])} refdata={data[index][1]}/> : null:
                typeof entityValue  === 'object' &&
                !Array.isArray(entityValue ) &&  
                entityValue  !== null && !(entityValue instanceof Date)
                ? show[index] ? <RenderYmlEntities  data={Object.entries(entityValue)} refdata={data[index][1]} nested/> : null:
                <><input className='yml-content input-value' defaultValue={(entityValue instanceof Date) ? new Date(entityValue).toISOString() : entityValue} onBlur={(e)=>handeValueChange(e,data,entityKey,index,refdata,Array.isArray(entityValue),entityValue)}/><br/></>
              }
              
            </div>
          ))}
        </>
      )
 }
  return (
    <div>
      <div className='mt-2'>
      <div onClick={()=>fileref.current.click()} className='select-file'>
        Choose YML file
        {fileref.current?.value && <h5>{fileref.current?.value}</h5>}
      </div>
      <input type="file" ref={fileref} onChange={handleFileChange} style={{display:'none'}}/>
      </div>
      {yamlData && (
        <div className='container'>
          <div className='key-box'><label htmlFor="key-box">Key editable:</label><input checked={keyEdit} onChange={()=>setKeyEdit(!keyEdit)} id="key-box" type='checkbox'/></div>
          <h2>Edit YAML Data:</h2>
          <RenderYmlEntities data={yamlData} key="unique"/>
      <button onClick={handleSaveClick} className='save-button'>Save</button>
        </div>
      )}
      {/* <AddFieldModal/> */}
    </div>
  );
};

export default YamlReaderComponent;
