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
    let money  = moviInfo.BoxOffice;
    money =='N/A'? money = 0 :money = parseInt(moviInfo.BoxOffice.replace(/\$/g,'').replace('/,/g',''));
    let metaScore = parseInt(moviInfo.Metascore);
    let imdbRating = parseFloat(moviInfo.imdbRating);
    let imdbVotes = parseInt(moviInfo.imdbVotes.replace(/,/g,''));
    const awards = moviInfo.Awards.split(' ').reduce((prev,word)=>{
        //logic to analyz string for numbers and sum them up:
        const value = parseInt(word);
        if(isNaN(value)){
            return prev;
        }else{
            return prev + value;
        }
    },0);

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
    <article data-value=${awards} class="notification is-primary">
    <p class="title">${moviInfo.Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
    <p class="title">${moviInfo.imdbVotes}</p>
    <p class="subtitle">IMDB Votes</p>
    </article>
    <article  data-value=${money} class="notification is-primary">
    <p class="title">${moviInfo.BoxOffice}</p>
    <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metaScore} class="notification is-primary">
    <p class="title">${moviInfo.Metascore}</p>
    <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
    <p class="title">${moviInfo.imdbRating}</p>
    <p class="subtitle">IMDB Rating</p>
    </article>
    `
}

//compare movies:
const runComparison = ()=>{
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

leftSideStats.forEach((leftStat, index)=>{
    const rightStat = rightSideStats[index];
    const leftSideValue = leftStat.dataset.value;
    const rightSideValue = rightStat.dataset.value;
    if(rightSideValue>leftSideValue){
        leftStat.classList.remove('is-primary');
        leftStat.classList.add('is-dark');
    }else{
        rightStat.classList.remove('is-primary');
        rightStat.classList.add('is-dark');
    }
});
}