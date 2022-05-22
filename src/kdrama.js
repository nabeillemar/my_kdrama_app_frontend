class Kdrama {

    constructor(kdramas, kdramaAttributes) { 
        
        this.id = kdramas.id
       
        this.cover_photo = kdramaAttributes.cover_photo
        this.title = kdramaAttributes.title
        this.release_year = kdramaAttributes.release_year
        this.where_to_watch = kdramaAttributes.where_to_watch
        this.my_rating = kdramaAttributes.my_rating
        this.comment = kdramaAttributes.comment
        this.category = kdramaAttributes.category
        this.watched = kdramaAttributes.watched
        Kdrama.all.push(this); 
        

    }

    renderKdramaCard() { 
        return`
        <div id='kdrama-${this.id}' data-id=${this.id}>
        <div id="column">
        <div id="Kdrama-card">
        <img src=${this.cover_photo} height="650" width="550">
        <h2> Title: ${this.title}</h2>
        <p> Release Year: ${this.release_year}<p>
        <p> Platform: ${this.where_to_watch}<p>
        <p> My Rating: ${this.my_rating}<p>
        <p> Genre: ${this.category.name}<p>
        <p> Watched? ${this.watched}<p>
        <p> Comment: ${this.comment}<p>
        

        <button id='edit-btn' class="edit-btn" data-id=${this.id}>edit</button>
        <button class="delete-btn" data-id=${this.id}>delete</button>
        </div>
        </div>
        </div>
        </div>
        <br></br>`;
    }


    static findById(id) {

        return this.all.find(kdrama => kdrama.id == id);
    }

    renderUpdateForm() {
        return `
        
        <form id="render-update-form" data-id=${this.id} name="${this.id}">
            <h3> Edit this KDrama!</h3>
            <label>Title</label>
                    <input id='title' type="text" name="title" value="${this.title}" placeholder="Enter the title of your KDrama..." class="input-text" size="30">
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

                    <p> Choose a Genre: <select id="categories" name="categories" value="${this.category}"><p/>
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

                    <label>Comment</label>
                    <textarea id='comment' name="comment" rows="5" cols="50" placeholder="Enter your comments here...">${this.comment}</textarea>
                    <br><br>

                    <input id='edit-button' type="submit" name="submit" value="Edit your KDrama" class="submit">
                    <br><br>
        
        </form>
        `;


    }

}

Kdrama.all = []; 

