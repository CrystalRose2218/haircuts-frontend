import Router from './Router'
import Auth from './Auth'
import Toast from './Toast'


class App {
  constructor(){
    this.name = "Haircuts"
    this.version = "1.0.0"
    this.apiBase = 'https://cpearce-haircuts-backend.onrender.com'
    this.rootEl = document.getElementById("root")
    this.version = "1.0.0"
  }
  
  init() { 
    console.log("App.init")
    
    // 1. Toast init
    Toast.init()   
    
    // 2. Authentication check    
    Auth.check(() => {
      // 3. authenticated! init Router 
      Router.init()
    })    
  }
}

export default new App()