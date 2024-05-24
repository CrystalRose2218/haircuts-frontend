import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class HaircutAPI {

  async newHaircut(formData){
    console.log("In newHaircut()...")

    // send fetch request
    const response = await fetch(`${App.apiBase}/haircuts`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })

    console.log("Sent fetch request...")
  
    // if response not ok
    if(!response.ok){ 
      let message = 'Problem adding haircut'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
        console.log("reponse not ok: ", message)
      }      
      // throw error (exit this function)      
      throw new Error(message)
    }

    console.log("Response was ok!")
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }



  async getHaircuts(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/haircuts`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting haircuts')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }
}

export default new HaircutAPI()