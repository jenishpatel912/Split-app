import React, { useEffect, useState } from "react";
import "./table.css";

const NestedTable = ({
  data,
  root = 0,
  width = 15,
  isExpand,
  nested,
  draggedItem,
  setDraggedItem,
  setData,
}) => {
  const [show, setShow] = useState([]);
  useEffect(() => {
    if (isExpand) setShow(data.map(() => true));
    else setShow([]);
  }, [isExpand]);

  const handleShow = (ind) => {
    show[ind] = !show[ind];
    setShow([...show]);
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetItem) => {
    if (
      !draggedItem ||
      draggedItem.ID === targetItem.ID ||
      draggedItem.ParentID === targetItem.ID ||
      !data.some((itm) => itm.ID === draggedItem.ID)
    )
      return;
    setData((prev) =>
      prev.map((item) =>
        item.ID === draggedItem.ID ? { ...item, ParentID: targetItem.ID } : item
      )
    );
    setDraggedItem(null);
  };

  return (
    <>
      {data
        .filter((item) => item.ParentID === root)
        .map((item, index) => (
          <React.Fragment key={item.ID}>
            <tr
            className={`table-row`}
               style={{
                backgroundColor: nested ?"darkgrey": "#cbbebe" ,
               
                // height: "50px",
              }}
              draggable
              onDragStart={() => handleDragStart(item)}
              onDragOver={(e) => handleDragOver(e)}
              onDrop={() => handleDrop(item)}
            >
              <td
                onClick={() => handleShow(index)}
                className="first-column"
                style={{ cursor: "grab" }}
              >
                {data.some((nes) => nes.ParentID === item.ID) ? (
                  <div
                    className="arrow"
                    style={{
                      width: `${width}px`,
                      display: "inline-block",
                      textAlign: "right",
                    }}
                  >
                    <i
                      className={`fa fa-sm fa-angle-${
                        show[index] ? "down" : "right"
                      }`}
                      aria-hidden="true"
                    ></i>
                  </div>
                ) : (
                  <div
                    style={{
                      width: `${width}px`,
                      display: "inline-block",
                      textAlign: "right",
                    }}
                  />
                )}
                {item.ID}
              </td>
              <td>{item.Name}</td>
              <td>{item.type}</td>
              <td>{item.item}</td>
            </tr>
            {data.some((nes) => nes.ParentID === item.ID) && show[index] ? (
              <NestedTable
                data={data.filter((itm) => itm.ID !== item.ID)}
                root={item.ID}
                width={width + 35}
                isExpand={isExpand}
                draggedItem={draggedItem}
                setDraggedItem={setDraggedItem}
                setData={setData}
                visible={!!show[index]}
                nested
              />
            ) : null}
          </React.Fragment>
        ))}
    </>
  );
};

export default NestedTable;
