// -100 500 -700 300

const getPercentage = (val, total) => {
  return (val / total) * 100;
};

export const getDepthRecord = (list) => {
  const record = {};

  const ownList = list.filter((item) => item.amount > 0);
  const depthList = list.filter((item) => item.amount < 0);

  const totalCost = ownList.reduce((prev, curr) => prev + curr.amount, 0);

  depthList.forEach((elem) => {
    ownList.forEach((owElm) => {
      console.log(owElm, totalCost);
      const percentHold = getPercentage(owElm.amount, totalCost);
      console.log(percentHold,"percentage")
      const finalValue = (percentHold * elem.amount) / 100;
      record[elem.id]
        ? record[elem.id].push({ to: owElm, cost: finalValue })
        : (record[elem.id] = [{ to: owElm, cost: finalValue }]);
      record[owElm.id]
        ? record[owElm.id].push({ from: elem, cost: finalValue })
        : (record[owElm.id] = [{ from: elem, cost: finalValue }]);
    });
  });

  return record;
};

// export const getDepthRecordV2 = (records, record, currUser) => {
//   const {
//     cost,
//     to: { id },
//   } = record;
//   const absCost = Math.abs(cost);
//   const reciverList = records[id].filter(
//     (item) => item.from.id !== currUser.id
//   );
//   const payerList = records[currUser.id].filter((item) => item.to.id !== id);
//   const updatedRecord = {
//     ...records,
//     [id]: reciverList,
//     [currUser.id]: payerList,
//   };
//   return updatedRecord;
// };

// export const createNewRecord  = (records,entry,currUser) => {
//     const {avgAmount,users} = entry;
//     const {id} = currUser

//     const newRecords = {...records};
//     users.forEach(usr=>{
//         if(newRecords[usr.id]){
//             const presntItem = newRecords[usr.id].find(item=>item.to.id===id || item.from.id);

//             if(presntItem){
//                 if(presntItem.to)  presntItem.cost+=avgAmount
//                 else{

//                 }
//             }
//         }
//     })

// }

export const updateRecords = (records, receiver, payer) => {
  const recordCopy = { ...records };
  const { id: rvrId } = receiver;
  const { id: pyrId } = payer;
  const receiverList = recordCopy[rvrId].filter(
    (item) => item.from.id !== pyrId
  );
  const payerList = recordCopy[pyrId].filter((item) => item.to.id !== rvrId);
  return {
    ...recordCopy,
    [rvrId]: receiverList,
    [pyrId]: payerList,
  };
};

export const partiallyUpdateRecord = (records, receiver, payer,paidAmount) => {
  const recordCopy = { ...records };
  const { id: rvrId } = receiver;
  const { id: pyrId } = payer;
  const receiverList = recordCopy[rvrId].map(
    (item) => item.from.id !== pyrId ? item : ({...item,cost:item.cost+paidAmount})
  );
  const payerList = recordCopy[pyrId].map((item) => item.to.id !== rvrId ? item : ({...item,cost:item.cost+paidAmount}));
  return {
    ...recordCopy,
    [rvrId]: receiverList,
    [pyrId]: payerList,
  };
};
