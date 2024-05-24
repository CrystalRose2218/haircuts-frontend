import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class TestView {
  init(){
    console.log('test init please work')
    document.title = 'Test!'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Profile" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Test</h1>
        <p>Testing template and html stuff, give me a sec</p>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TestView()