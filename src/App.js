// import { useEffect, useRef, useState } from 'react';
// import NestedTable from './components/nestedtable/NestedTable';
// import clr from 'ansi-colors'
// import Test from './components/Test';
// import AnimatedSlider from './components/Slider/AnimatedSlider';
// import Slider from './components/Slider/Slider';
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import "./App.css";
// import ResizableTable from './components/resizableTable/resizableTable';
// import SnakeGame from './components/snakeGame/SnakeGame';
import SplitsVilla from "./components/splitsvilla/SplitVillaV3";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { privateRoutes, publicRoutes } from "./routes/routes";
import Header from "./components/layout/Header";

function App() {
  // const [draggedItem, setDraggedItem] = useState(null);
  // const [isExpand,setIsExpand] = useState(false)
  // const ref = useRef();
  // const tableRef = useRef()
  // console.log(clr.red('This is a red string!'));
  // useEffect(()=>{
  //   function handleMouseMove(event) {
  //       const tableWidth = event.clientX - tableRef.current.getBoundingClientRect().left;
  //       tableRef.current.style.width = `${tableWidth}px`;
  //   }
  //    ref.current.addEventListener("mousedown",(event)=>{
  //     document.addEventListener('mousemove', handleMouseMove);
  //     document.addEventListener('mouseup', () => {
  //       document.removeEventListener('mousemove', handleMouseMove);
  //     });
  //    })
  // },[ref])
  // const [data,setData] = useState([
  //   { ID: 1, ParentID: 0, type:"footware",item:"shoes" , Name: 'Category 1' },
  //   { ID: 2, ParentID: 1, type:"footware",item:"shoes" , Name: 'Subcategory 1.1' },
  //   { ID: 3, ParentID: 1, type:"footware",item:"shoes" , Name: 'Subcategory 1.2' },
  //   { ID: 4, ParentID: 0, type:"footware",item:"shoes" , Name: 'Category 2' },
  //   { ID: 5, ParentID: 4, type:"footware",item:"shoes" , Name: 'Subcategory 2.1' },
  //   { ID: 6, ParentID: 4, type:"footware",item:"shoes" , Name: 'Subcategory 2.2' },
  //   { ID: 7, ParentID: 6, type:"footware",item:"shoes" , Name: 'Subcategory 2.2' },
  //   { ID: 8, ParentID: 5, type:"footware",item:"shoes" , Name: 'Subcategory 2.2' },
  //   { ID: 9, ParentID: 2, type:"footware",item:"shoes" , Name: 'Subcategory 2.2' },
  // ]);
  // const handleExpand = () => {
  //   setIsExpand(!isExpand)
  // }
  const { userData } = useAuth();
  const currentRoutes = userData?.token ? privateRoutes : publicRoutes;
  console.log("new toaster arrived")
  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route element={<Header isLoggedin={userData?.token}/>}>

          {currentRoutes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={
                route.redirectRoute ? (
                  <Navigate to={route.navigation} />
                ) : (
                  <route.component />
                )
              }
            />
          ))}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Test/> */}
      {/* <AnimatedSlider/> */}
      {/* <Slider/> */}
      {/* <SplitsVilla/>  */}
      {/* <SnakeGame/> */}
      {/*<ResizableTable/>*/}
      {/* <table ref={tableRef}>
        <div className='resizable' ref={ref}></div>
    <thead>
      <tr>
        <th>ID</th>
        <th>Category</th>
        <th>type</th>
        <th>product</th>
      </tr>
    </thead>
    <tbody>

      <NestedTable data={data} setData={setData} isExpand={isExpand} draggedItem={draggedItem} setDraggedItem={setDraggedItem}/>
    </tbody>
    </table>
    <button type='button' onClick={handleExpand} style={{marginTop:'30px',padding:'10px 20px'}}>{isExpand ? "Collapse": "Expand"}</button> */}
    </div>
  );
}

export default App;
