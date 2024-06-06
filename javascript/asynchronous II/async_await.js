const divEl=document.querySelector('.card-container');


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

async function getDetails(id)
 {
    try{
        const response= await fetch(`https://dummyjson.com/users/${id}`);
        if(!response.ok)
        {
            throw new Error ('No Data Present');
        }
        const userdata=await response.json();
        displayUser(userdata,'beforeend'); 
    }catch(err)
    {
        console.log(err);
    }

        
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

    getDetails(0);