import App from './../../App'
import {html, render } from 'lit'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import HaircutAPI from './../../HaircutAPI'

class HaircutsView {
  async init(){
    document.title = 'Haircuts'
    this.haircuts = null    
    this.render()    
    Utils.pageIntroAnim()
    await this.getHaircuts()
    //this.filterHaircuts('price', '20-30')
  }

  
  clearAllFilters() {
    this.getHaircuts()
    this.resetFilters()
  } 

  resetFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn')
    filterBtns.forEach(btn => btn.removeAttribute("variant"))
  }

  handleFilterButton(e) {
    // reset mutually exclusive filters 
    this.resetFilters()


    //set button to primarty (change colours to appear selected)
    e.target.setAttribute("variant", "primary")
    
    // retrieve attributes of buttons
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")

    //run filter function!
    this.filterHaircuts(field, match)

  }

  async filterHaircuts(field, match) {
    //validation check
    if(!field || !match) {
      return
    }

    //Get whole dataset of haircuts
    this.haircuts = await HaircutAPI.getHaircuts()

    let filteredHaircuts = null
    
    //check gender field
    if (field == "gender") {
      filteredHaircuts = this.haircuts.filter(haircut => haircut.gender == match)
    }
    
    //check length field
    if (field == "length") {
      filteredHaircuts = this.haircuts.filter(haircut => haircut.length == match)
    }

    //check price field
    if (field == "price") {

      // split up match string
      let priceLow = match.split('-')[0]
      let priceHigh = match.split('-')[1]

      console.log(priceLow + " and " + priceHigh)

      //filter
      filteredHaircuts = this.haircuts.filter(haircut => haircut.price >= priceLow && haircut.price <= priceHigh)
      console.log(filteredHaircuts)

    }

    //render new haircut list
    this.haircuts = filteredHaircuts
    this.render()

  }

  async getHaircuts() {
    try {
      // store JSON objects from API.getHaircuts into haircuts variable
      this.haircuts = await HaircutAPI.getHaircuts()
      console.log("Haircuts:")
      console.log(this.haircuts)
      //always put .render() after removing and gaining content in a method
      this.render()

    }
    catch(err) {
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <style>
        .filter-menu {
          display: flex;
          align-items: center;
        }

        .filter-menu > div {
          margin-right: 1em;
        }
      </style>

      <va-app-header title="Haircuts" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">
      
        <div class="filter-menu">
          <div>
            Filter By
          </div>
          
          <div>
            <strong> Gender </strong>
            <sl-button class="filter-btn" size="small" data-field="gender" data-match="m" @click=${this.handleFilterButton.bind(this)}> M </sl-button> 
            <sl-button class="filter-btn" size="small" data-field="gender" data-match="f" @click=${this.handleFilterButton.bind(this)}> F </sl-button> 
            <sl-button class="filter-btn" size="small" data-field="gender" data-match="u" @click=${this.handleFilterButton.bind(this)}> U </sl-button> 
          </div>

          <div>
            <strong> Length </strong>
            <sl-button class="filter-btn" size="small" data-field="length" data-match="s" @click=${this.handleFilterButton.bind(this)}> S </sl-button> 
            <sl-button class="filter-btn" size="small" data-field="length" data-match="m" @click=${this.handleFilterButton.bind(this)}> M </sl-button> 
            <sl-button class="filter-btn" size="small" data-field="length" data-match="l" @click=${this.handleFilterButton.bind(this)}> L </sl-button> 
          </div>

          <div>
            <strong> Price </strong>
            <sl-button class="filter-btn" size="small" data-field="price" data-match="10-20" @click=${this.handleFilterButton.bind(this)}> $10-$20 </sl-button> 
            <sl-button class="filter-btn" size="small" data-field="price" data-match="20-30" @click=${this.handleFilterButton.bind(this)}> $20-$30 </sl-button> 
            <sl-button class="filter-btn" size="small" data-field="price" data-match="30-40" @click=${this.handleFilterButton.bind(this)}> $30-$40 </sl-button> 
          </div>


          <div>
            <sl-button class="filter-btn" size="small" @click=${this.clearAllFilters.bind(this)}> Clear Filters </sl-button>
          </div>
        </div>
        
        <div class="haircuts-grid">
        ${this.haircuts == null ? html`
          <sl-spinner></sl-spinner>
        ` : html`
          ${this.haircuts.map(haircut => html`
            <va-haircut class="haircut-card"
              id= "${haircut._id}"
              name="${haircut.name}" 
              description="${haircut.description}"
              price="${haircut.price}"
              user="${JSON.stringify(haircut.user)}"
              image="${haircut.image}"
              gender="${haircut.gender}"
              length="${haircut.length}"
            >
            </va-haircut>


            <!-- sl-card class="haircut-card">
              <img src="${App.apiBase}/images/${haircut.image}" alt="${haircut.name}"  slot="image">
              <h2>${haircut.name}</h2>
              <h3>${haircut.price}</h3>
              <p>${haircut.description}</p>
              <p> By ${haircut.user.firstName} ${haircut.user.lastName}</p>
            </sl-card> -->
          
          `)}
        `}
        </div
        
      </div>      
    `
    render(template, App.rootEl)
  }
}

/* // 1st way of making filters 
            //<sl-button size="small" @click=${() => this.filterHaircuts("gender", "m")}> M </sl-button>  
            //<sl-button size="small" @click=${() => this.filterHaircuts("gender", "f")}> F </sl-button>  
            //<sl-button size="small" @click=${() => this.filterHaircuts("gender", "u")}> U </sl-button> 
*/

export default new HaircutsView()