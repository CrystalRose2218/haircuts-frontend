import { LitElement, html, render } from 'lit'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'
import UserAPI from '../UserAPI'
import Toast from '../Toast'

customElements.define('va-haircut', class Haircut extends LitElement {
  constructor(){
    // super() says to refer to the parent class 
    super()    
  }

  // Important - defines our properties that you can pass to the element
  static get properties(){
    return {
      id: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      price: {
        type: String
      },
      user: {
        type: Object
      },      
      image: {
        type: String
      },
      gender: {
        type: String
      },
      length: {
        type: String
      }
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  // FUNCTION: Open a dialog with extra object info after user clicks button
  async moreInfoHandler() {
    // create sl dialog
    const dialogEl = document.createElement('sl-dialog')
    dialogEl.className= 'haircut-dialog'
    
    // fill with content from backend
    const dialogContent = html `
        <style>
            .wrap {
                display: flex;
            }
            .image {
                width: 50%;
            }
            .image img {
                width: 100%;
            }
            .content {
                padding-left: 1em;
            }
            .gender span,
            .length span {
                text-transform: uppercase;
                font-weight: bold;
            }
            .price {
                font-size: 1.5em;
                font-weight: bold;
                color: var(--brand-color)
            }
        </style>
        <div class="wrap">
            <div class="image">
                <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
            </div>
            <div class="content">
                <h1>${this.name}</h1>
                <p>${this.description}</p>
                <p class="price">$${this.price}</p>
                <p class="gender">Gender: <span>${this.gender}</span></p>
                <p class="length">Length: <span>${this.length}</span></p>

                <sl-button @click=${this.addFavHandler.bind(this)}>
                    <sl-icon slot="prefix" name="heart-fill"></sl-icon>
                    Add to Favourites
                </sl-button>
            </div>
        </div>
    `
    // render content inside of dialogEl
    render(dialogContent, dialogEl)

    // append to document.body (so that its above everything in the root div)
    await document.body.append(dialogEl)

    // Show() the dialog
    dialogEl.show()

    // delete the dialog when closed (rather than just hiding it)
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })
  }

  async addFavHandler(){    
    try {
      await UserAPI.addFavHaircut(this.id)
      Toast.show('Haircut added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  render(){    
    // shadow DOM -> wont be affected by document styling
    return html`
    <style>
        .author {
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
        }
      
    </style>
    <sl-card> 
        <img slot="image" src="${App.apiBase}/images/${this.image}" />
        <h2> ${this.name} </h2>
        <h3> $${this.price} </h3>
        <p class="author">By ${this.user.firstName} ${this.user.lastName} </p>
        <sl-button @click=${this.moreInfoHandler.bind(this)}>More Info</sl-button>
        <!-- since this method is called below in the button, the keyword this refers to the button (not the whole object) unless you add .bind(this) -->
        <sl-icon-button name="heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>

    </sl-card>

    `
  }
  
})