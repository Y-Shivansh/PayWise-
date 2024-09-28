
## Built a basic Transaction WebApp PayWise
<!-- 
Axios vs Fetch
// Axios Vs Fetch
const axios = require('axios')
// const { log } = require('console')

 async function fetching(){
 //    // fetch("https://sum-server.100xdevs.com/todos")
 //    //   .then(async response=>{
 //    //     const json = await response.json()
 //    //     console.log(json)
 //    //   })    

   const response = await fetch("https://www.postb.in/1727094698837-7403042644727",{
    method: 'POST',
     body:{
       username: "100xdevs",
       password: "100xdevs"
     },
    headers: {
      "Authorization": "Bearer h5vmpbrhoxkv1dgjoc8ebhmhzfxhcbml",
    }  
   });
   const textualData = await response.text()
   console.log(textualData)
   
 }

  async function axiosreq(){
    const response = await axios.post(" https://httpdump.app/dumps/15612040-31e2-4dbe-be31-a3d7ac997c9b",{
        username: "100xdevs",
        password: "100xdevs"
    },{
      headers: {
        "Authorization": "Bearer h5vmpbrhoxkv1dgjoc8ebhmhzfxhcbml",
      }  
    })
    console.log(response.data)
  }

// fetching();
axiosreq();
 -->