class Kdrama {

    constructor(kdramas, kdramaAttributes) { //we are creating new instances 
        //debugger // put it there so we don't assume our data good to test it out 
        this.id = kdramas.id
        //debugger
        this.cover_photo = kdramaAttributes.cover_photo
        this.title = kdramaAttributes.title
        this.release_year = kdramaAttributes.release_year
        this.where_to_watch = kdramaAttributes.where_to_watch
        this.my_rating = kdramaAttributes.my_rating
        this.comment = kdramaAttributes.comment
        this.category = kdramaAttributes.category
        this.watched = kdramaAttributes.watched
        Kdrama.all.push(this); // that new instance gets pushed to the new array called Kdrama.all
        //debugger

    }

    renderKdramaCard() { //created a card this is a refactor adds to the create and get fetch method 
        return`
        <div data-id=${this.id}>
        <img src=${this.cover_photo} height="550" width="450">
        <h3>${this.title}</h3>
        <p> ${this.release_year}<p>
        <p> ${this.where_to_watch}<p>
        <p> ${this.my_rating}<p>
        <p> ${this.comment}<p>
        <p> ${this.category.name}<p>
        <p> ${this.watched}<p>
        <button data=id${this.id}>edit</button>
        </div>
        <br></br>`;
    }



}

Kdrama.all = []; //becomes more valuable 
