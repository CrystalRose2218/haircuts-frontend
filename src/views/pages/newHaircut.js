import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import HaircutAPI from './../../HaircutAPI'
import Toast from './../../Toast'

class newHaircutView {
  init(){
    document.title = 'New Haircut'    
    this.render()    
    Utils.pageIntroAnim()
  }

  async newHaircutSubmitHandler(e) {
    // prevent form from refreshing page when submitted
    e.preventDefault()

    // Create loading icon
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')  

    // Send form data to HaircutAPI.newHaircut()  
    const formData = new FormData(e.target)
    try {
      await HaircutAPI.newHaircut(formData)
      Toast.show("Haircut successfully added!")

      //reset form -- 
      // remove loading icon
      submitBtn.removeAttribute('loading')

      // reset text inputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      console.log(textInputs)
      if(textInputs) textInputs.forEach(textInputs => textInputs.value = null) 

      // reset radio buttons
      const radioInputs = document.querySelectorAll('sl-radio-group')
      if (radioInputs) radioInputs.forEach(radioInput => radioInput.value = null)

      //rest image upload
      const fileInput = document.querySelector('input[type=file')
      console.log(fileInput)
      if (fileInput) fileInput.value = null



    }
    catch(err) {
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  }

  render(){
    const template = html`
      <va-app-header title="New Haircut" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Add New Haircut</h1>
        <form class="page-form" @submit=${this.newHaircutSubmitHandler}>
          
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Haircut Name" required></sl-input>
          </div>
          
          <div class="input-group">              
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>
          
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-radio-group name="gender" label="Gender">
              <sl-radio value="m">Male</sl-radio>
              <sl-radio value="f">Female</sl-radio>
              <sl-radio value="u">Unisex</sl-radio>
            </sl-radio-group>
          </div>
          
          <div class="input-group" style="margin-bottom: 2em;">
            <sl-radio-group name="length" label="Length">
              <sl-radio value="s">Short</sl-radio>
              <sl-radio value="m">Medium</sl-radio>
              <sl-radio value="l">Long</sl-radio>
            </sl-radio-group>
          </div>
          
          <sl-button variant="primary" type="submit" class="submit-btn">Add Haircut</sl-button>
        
          </form>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newHaircutView()