const divEl=document.querySelector('.card-container');

// function getDetails(id)
// {
//     // agar link galat hua aur fetch ni kar paa rha hoga to promise-->response--> ok=false and status=404 hoga
//     //aur agar sahi hua to ok=true and status=200 hoga
//     const request=fetch(`https://dummyjson.com/users/${id}`);
//    // console.log(request);
//     const response=request.then((response)=>
//     {
//        // console.log(response.status);     //---->200 if corect else 404;
//       //console.log(response.ok);         //---->true if correct false;
//       return response.json();

//     });

//     response.then((user)=>
//         {
//             //it will print the fetched data from api
//             console.log(user);
//         }
//     );

    
// }

// getDetails(4);


//same as above code but srinked
// function getDetails(id)
//  {
// fetch(`https://dummyjson.com/users/${id}`).then((response)=>
//     {
       
//       return response.json().then((user)=>console.log(user));
//     }
//     );
//  }
//     getDetails(4);



//error handling using catch and throw 

// function getDetails(id)
//  {

// fetch(`https://dummyjson.com/users/${id}`)
// .then((response)=>
//     {
//         if(!response.ok)
//         {
//             //if error then show this messages
//             throw new Error("It does not match any data");
//         }
       
//       return response.json()
//       .then((user)=>
//       {displayUser(user,'beforeend')  
//       return   fetch(`https://dummyjson.com/users/${id-1}`)
//       })

//       //--->Here we can remove the catxh fn because last me catch fn hai hi wo upar se niche tak error handle kar lega 
//     // .catch((err)=>
//     //   {
//     //     //console.error(err))
//     //     console.log(err);
//     //   }
//     // )
//     .then((response)=>
//     {
//         if(!response.ok)
//         {
//             //if error then show this messages
//             throw new Error("No Previous ID exist");
//         }
       
//       return response.json()
//       .then((user)=>
//       {displayUser(user,'afterbegin','other');
//       })
//     .catch((err)=>
//       {
//         //console.error(err))
//         console.log(err);
//       }
//     );
//     }
//     );
//  });
// }
//  function displayUser(data,pos,className='')
// {
//     //we can shift the html element into .js file in inner HTML

//     const card=`<div class="user-card ${className}">
//     <img src="${data.image}" alt="Profile Image">
//     <h3>${data.firstName}</h3>
//     <h3>${data.lastName}</h3>
//     <p class="email">${data.email}</p>
//     <button class="btn">View Profile</button>
//     </div>`;

//     //divEle.innerHTML=card;  ---> this is for one html show at a time 
//     divEl.insertAdjacentHTML(pos,card);     //--> this is for multiple card you can put more than one card at a time
    

// }

//     getDetails(1);




// same as just above code but shrinked


function getUser(url)
{
   return  fetch(url)
.then((response)=>
    {
        if(!response.ok)
        {
            //if error then show this messages
            throw new Error("It does not match any data");
        }
       
      return response.json();
    });
}

function getDetails(id)
 {
    getUser(`https://dummyjson.com/users/${id}`)
      .then((user)=>
      {displayUser(user,'beforeend');
      return   getUser(`https://dummyjson.com/users/${id-1}`);
      })
      .then((user)=>
      {displayUser(user,'afterbegin','other');
      return getUser(`https://dummyjson.com/users/${id-2}`);
      })
      .then((user)=>
      {displayUser(user,'afterbegin','back');
    })
    .catch((err)=>
      {
        console.log(err);
      }
    );
 }
 function displayUser(data,pos,className='')
{
    //we can shift the html element into .js file in inner HTML

    const card=`<div class="user-card ${className}">
    <img src="${data.image}" alt="Profile Image">
    <h3>${data.firstName}</h3>
    <h3>${data.lastName}</h3>
    <p class="email">${data.email}</p>
    <button class="btn">View Profile</button>
    </div>`;

    //divEle.innerHTML=card;  ---> this is for one html show at a time 
    divEl.insertAdjacentHTML(pos,card);     //--> this is for multiple card you can put more than one card at a time
    

}

    getDetails(3);