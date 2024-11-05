import React, { useEffect, useState } from "react";

const LightsOut = () => {

    const [cordinate,setCordinate] = useState({x:0,y:0})

  useEffect(() => {

    const handleMouseOVer = (e) => {
        setCordinate({x:e.clientX,y:e.clientY})
    }
     
   window.addEventListener("mousemove",handleMouseOVer)
   return () => window.removeEventListener(handleMouseOVer)
  }, []);

  return (
    <>
    <div
      style={{
        position: "absolute",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        zIndex:"1",
        background:`radial-gradient(${'100px'} at ${cordinate.x+'px'} ${cordinate.y+"px"}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0) 100%)`
      }}
    >
    </div>
    <div style={{height:'100vh',color:'white',fontSize:'20px',overflow:'hidden'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis modi commodi alias delectus minima, enim, soluta dicta dolore sed, unde doloribus fugit deleniti dignissimos provident aliquid minus ex totam molestias.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio hic a iusto saepe praesentium, harum fugiat. Officiis, libero corrupti cumque facere itaque repellat rem accusamus officia fugit veniam. Sed.
    </div>
    </>
  );
};

export default LightsOut;
