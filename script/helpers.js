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
    `
}
