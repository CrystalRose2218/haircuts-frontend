import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute } from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class HomeView {
  init(){    
    console.log('HomeView.init')
    document.title = 'Home'    
    this.render()    
    Utils.pageIntroAnim()    
  }

  render(){
    const template = html`
      <va-app-header title="Home" user=${JSON.stringify(Auth.currentUser)}></va-app-header>
      
      <div class="page-content">
        <h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute('/profile')}>View Profile</sl-button>
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a>
        <br>
        <sl-button @click=${() => gotoRoute('/test')}>TEST</sl-button> <p></p>

        <!-- 
        <va-haircut 
          name="Ace Venture" 
          description="Best haircut when you're saving people's pets"
          price="30"
          user="${JSON.stringify({firstName: "Peter", lastName: "Parker"})}"
          image="https://m.media-amazon.com/images/M/MV5BZDkxOGM3OTAtMDdlMi00NzZmLThhNmMtMDExNDRmMGQ4MTZjXkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_FMjpg_UX956_.jpg"
          gender="m"
          length="m"
        >
        </va-haircut> -->
        
      </div>
     
    `
    render(template, App.rootEl)
  }
}

export default new HomeView()