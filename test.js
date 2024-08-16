// function memoize(fn) {
//     const storedRes = {}
//     return function(...args) {
//         const [a,b] = args;
//         if(typeof a )
//         console.log(a,b)
//         const arr = JSON.stringify(args);
//         const fetchRes = storedRes[arr]
//         if(fetchRes!==undefined){
//             return fetchRes
//         }
//             const result = fn(...args)
//             storedRes[arr] = result;
//             return result

//     }
// }

//   let callCount = 0;
//   const memoizedFn = memoize(function (a, b) {
//  	 callCount += 1;
//     return a + b;
//   })
//   memoizedFn(0, 0) // 5
//   memoizedFn(0, 0) // 5
//   console.log(callCount) // 1

// let lastActivityTime = Date.now();
// const inactivityThreshold = 5000;
// let timer;

// const activityUpdate = () => {
//     setInterval(() => {
//         const currentTime = Date.now();
//         const inactiveTime = currentTime - lastActivityTime > inactivityThreshold
//         console.log('inactiveTime: ', inactiveTime);
//         if (inactiveTime) {
//           chrome.runtime.sendMessage({ type: "inactive" });
//         }
//       }, 1000);
// }
// activityUpdate()

// var myInterval;
// console.log("serviceWorker" in navigator)
// navigator.serviceWorker.register('/sw.js');
// Notification.requestPermission(function(result) {
//  if (result === 'granted') {
//   navigator.serviceWorker.ready.then(function(registration) {
//    myInterval = setInterval(function () {
//      registration.showNotification('Notification with ServiceWorker')
//    }, 10000);
//   });
//  }
// });
// window.addEventListener("keydown", () => {
//   lastActivityTime = Date.now();
// });

// document.addEventListener("click", () => {
//   lastActivityTime = Date.now();
// });

// Periodically check for inactivity

// setInterval(() => {
//   const currentTime = Date.now();
//   const inactiveTime = currentTime - lastActivityTime > inactivityThreshold
//   console.log('inactiveTime: ', inactiveTime);
//   if (inactiveTime) {
//     chrome.runtime.sendMessage({ type: "inactive" });
//   }
// }, 1000);

console.log("Hello, World!");

// Input: s = "aab"Output: [["a","a","b"],["aa","b"]]

const str = "bcaaa";

function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

function partitionPalindrome(s) {
  const result = [];
  function backtrack(start, currentPartition) {
    if (start === s.length) {
      result.push([...currentPartition]);
    }
    for (let end = start + 1; end <= s.length; end++) {
      const substring = s.slice(start, end);
      console.log(start,substring)
      // a a b ab aa
      if (isPalindrome(substring)) {
        currentPartition.push(substring);
        backtrack(end, currentPartition);
        console.log(currentPartition);
        currentPartition.pop();
      }
    }
  }
  backtrack(0, []);
  return result;
}
const output = partitionPalindrome(str);
console.log(output);
