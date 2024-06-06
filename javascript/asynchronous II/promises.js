//Promises


//1.  ->resolve
// const request = new Promise((resolve,reject)=>{

//     setTimeout(()=>
//     {
//         console.log("Promise Initiated");
//         resolve("Promise fullfilled");
//     },1000);
// });

// console.log(request);

//output : Promise Initiated


//2.  ---> resolve, then
// const request = new Promise((resolve,reject)=>{

//     setTimeout(()=>
//     {
//         console.log("Promise Initiated");
//         resolve("Promise fullfilled");
//     },1000);
// });

// request.then((value)=>  // ---> then accept the value of resolve;
// {
//     console.log(value);
// });

// console.log(request);

//output : Promise Initiated
//         Promise fullfilled


//3. ---->reject,catch
// const request = new Promise((resolve,reject)=>{

//      setTimeout(()=>
//      {
//          reject("Request has been rejected");
//      },1000);
//  });

// if we not use the catch to handle the reject it will show an error so, use 'catch'
//  request.then((value)=>  
//  {
//      console.log(value);
//  }).catch((error)=>
//     console.log(error)
//  );

//  console.log(request);

//  output: Request has been rejected


//4. ---> reject , catch , finally
//  const request = new Promise((resolve,reject)=>{

//     setTimeout(()=>
//     {
//         console.log("Promise Initiated");
//         reject("Request has been rejected");
//     },1000);
// });

// //if we not use the catch to handle the reject it will show an error so, use 'catch'
// request.then((value)=>  
// {
//     console.log(value);
// }).catch((error)=>
//    console.log(error)
// ).finally(()=> console.log("Request Completed!!"));  //-->error resolve hone ke baad finally  use karenge for confirmation of completed the request

// console.log(request);

// output: Request has been rejected
//           Request Completed


