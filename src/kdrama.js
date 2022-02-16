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

    update({title, release_year, watched, where_to_watch, cover_photo, my_rating, comment, category_id}) {
        this.title = title;
        this.release_year = release_year;
        this.watched = watched;
        this.where_to_watch = where_to_watch;
        this.my_rating = my_rating;
        this.comment = comment;
        this.category = category;
        this.watched = watched;
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
        <button class="edit-btn" data-id=${this.id}>edit</button>
        <button class="delete-btn" data-id=${this.id}>delete</button>
        </div>
        <br></br>`;
    }


    static findById(id) {
        //debugger
        return this.all.find(kdrama => kdrama.id == id);
    }

    renderUpdateForm() {
        return `
        <form data-id=${this.id}>
            <h3> Edit this KDrama!</h3>
            <p>"${this.id}"<p>

            <label>Title</label>
                    <input id='title' type="text" name="title" value="${this.title}" placeholder="Enter the title of your KDrama..." class="input-text">
                    <br><br>
                    <label>Comment</label>
                    <textarea id='comment' name="comment" rows="5" cols="50" value="${this.comment}" placeholder="Enter your comments here..."></textarea>
                    <br><br>
                    <label>Cover Poster</label>
                    <input id='cover_photo' type="text" name="cover_photo" value="${this.cover_photo}" placeholder="Enter the poster image URL..." class="input-text">
                    <br><br>
                    <label>Release Year</label>
                    <input id='release_year' type="text" name="release_year" value="${this.release_year}" placeholder="Release Year" class="input-text">
                    <br><br>
                    <label>Have you watched it?</label>
                    <input id='watched' type="text" name="watched" value="${this.watched}" placeholder="Have you watched this?" class="input-text">
                    <br><br>
                    <label>Your Rating</label>
                    <input id='my_rating' type="text" name="my_rating" value="${this.my_rating}" placeholder="What do you rate this?" class="input-text">
                    <br><br>
                    <label>Where can you watch it?</label>
                    <input id='where_to_watch' type="text" name="where_to_watch" value="${this.where_to_watch}" placeholder="Where can you watch it?" class="input-text">
                    <br><br>

                    <label>Category</label>
                    <p> Choose a Genre</p>
                    <select id="categories" name="categories" value="${this.category}"> 
                    <option value="1">Action</option>
                    <option value="2">Romance</option>
                    <option value="3">Gender Reversal</option>
                    <option value="4">Saguk (Historical)</option>
                    <option value="5">Time Travel</option>
                    <option value="6">Horror</option>
                    <option value="7">Professional</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Family</option>
                    <option value="10">Coming of Age</option>
                    <option value="11">Web</option>
                    <option value="12">Melodrama</option>
                    <option value="13">Thriller</option>
                    <option value="14">LGBTQ+</option>



                    </select>
                    <br><br>

                    <input id='edit-button' type="submit" name="submit" value="Edit your KDrama" class="submit">
                    <br><br>
        
        </form>
        `;


    }




}

Kdrama.all = []; //becomes more valuable 

// question not sure why the category.name is not working in the update form, how would i debug this?
