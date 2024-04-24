//This Promise will Resolve the Restcountry API
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
      data.forEach((element,index) => {

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
           <h6>LatLng : <span>${element.latlng[0]+" , "+element.latlng[1]}</span></h6>
           
           <div class="alert alert-dark d-none mt-4" role="alert">
            <li class="list-unstyled"></li>
            <li class="list-unstyled"></li>
            <li class="list-unstyled"></li>
          </div>
           </div>
           </div>`

           child.classList.add('col-lg-4','col-sm-12','mt-5','mainclass')
           parent.appendChild(child)
           //Create one Button Element To Trigger weather API
           let Btn=document.createElement('button')
           Btn.innerText="Click for Weather"
           //Add event to BTN to fire weatherAPI() when user hit the BTN
           Btn.addEventListener('click',function(){
             // Here we send Country name and one callBack function to return the Weather Datas
             weatherAPI(element.name.common,(temp,humi,wind)=>{
                //Capture the Alerty Div to add data It return an HTML collection
                let Alert=document.getElementsByClassName('alert')
                //Already we r in ForEach loop Its has the INDEX with that we pick Exact Alert DIV
                Alert[index].classList.replace('d-none','d-block')
                Alert[index].firstElementChild.innerHTML=`Temperature is : ${temp}`
                Alert[index].firstElementChild.nextElementSibling.innerHTML=`Humidity is : ${humi}%`
                Alert[index].lastElementChild.innerHTML=`WindSpeed is : ${wind}Km/h`

                // After 6sec The Alert will removed
                setTimeout(()=>{
                    Alert[index].classList.replace('d-block','d-none')
                },6000)
               
             })
            })
           //BTN styles 
           Btn.classList.add('btn','mb-4','mx-5','border','border-1','border-light','text-light')
           //Finally Add the BTN to the last Child
           child.lastElementChild.appendChild(Btn)
           

      });

    

    

}
//When Browser loaded It will call this function to fetch the Country details 
  call()
// Function to capture Weather when user Click Check Weather BTN
async function weatherAPI(value,callback){
    
    let apiKey='782a08a4b55d9919749012611d329250'  
    let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?units=Metric&q=${value}&appid=${apiKey}`)
    let repo =await data.json()
    
    let Temperature=repo.main.temp+"°C"
    let humidity =repo.main.humidity
    let windSpeed=repo.wind.speed
    //Invoke this callBack send Temperature as argument 
    callback(Temperature,humidity,windSpeed)  
    
}
