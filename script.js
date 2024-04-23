let promise =new Promise((resolve,reject)=>{
     
    let url="https://restcountries.com/v3.1/all"
    fetch(url)
    .then((response)=>{return response.json()
   
   })
    .then((data)=>{resolve(data)})
    .catch((err)=>{reject(err)})
  


})

async function call(){
      // The Rest countries Data Once we get the values It assigned to data
      let data= await promise
       console.log(data);

      //Parent element to add the created child card
       let parent = document.getElementById('main')
      data.forEach(element => {

          //This is the child div In that we have all the content
           let child=document.createElement('div')
           //Entire Card Elements
           child.innerHTML=`<div class="card " style="width: 18rem;" id="style">
           <h5 class="card-title text-center bg-dark">${element.name.common}</h5>
           <img  src=${element.flags.png} class="card-img-top" alt="..." id="img" style="width: 200pxpx; height: 130px;">
           <div class="card-body text-center" >
           <h6>Capital : <span>${element.capital}</span></h6>
           <h6>Region : <span>${element.region}</span></h6>
           <h6>Country code : <span>${element.cca3}</span></h6>
           </div>
           </div>`

           child.classList.add('col-lg-4','col-sm-12','mt-5')
           parent.appendChild(child)
           //Create one Button Element To Trigger weather API
           let Btn=document.createElement('button')
           Btn.innerText="Show Weather"
           //Add event to BTN to fire weatherAPI() when user hit the BTN
           Btn.addEventListener('click',function(){
             weatherAPI(element.name.common)
            })
           //BTN styles 
           Btn.classList.add('btn','mb-4','btn-primary','mx-5')
           //Finally Add the BTN to the last Child
           child.lastElementChild.appendChild(Btn)
           

      });

    

    

}

call()
// Function to capture Weather when user Click Check Weather BTN
async function weatherAPI(value){
    
    let apiKey='782a08a4b55d9919749012611d329250'  
    let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?units=Metric&q=${value}&appid=${apiKey}`)
    let repo =await data.json()
    let Temperature=repo.main.temp+"°C" 

    alert(`Temperature in ${value} is ${Temperature}`)
}
