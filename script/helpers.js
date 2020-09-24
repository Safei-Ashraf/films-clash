//delay api calls until user finishs typing: (debouncing an input>> waiting sometime after last event to do sth)
const debouncer = (callback,delay = 800)=>{
    let timeoutId;
    return(...args)=>{
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(()=>{ 
            callback.apply(null,args)
        },delay);
    }
}

//Clear html:
const clearIt = (elem)=>{
elem.innerHTML= '';
}

//Render Movie Data:
const renderMovie = (moviInfo)=>{
    return `
    <article class="media">
    <figure class="media-left">
    <p class="image">
    <img src="${moviInfo.Poster}">
    </p>
    </figure>
    <div class="media-content">
    <h1>${moviInfo.Title}</h1>
    <h4>${moviInfo.Genre}</h4>
    <p>${moviInfo.Plot}</p>
    </div>
    </article>
    <article class="notification is-warning">
    <p class="title">${moviInfo.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${moviInfo.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${moviInfo.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${moviInfo.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
    <p class="title">${moviInfo.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    `
}
