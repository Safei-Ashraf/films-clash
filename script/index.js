const apiLink = `http://www.omdbapi.com/?`;
const apiKey = `ea52d5db`;
//http://www.omdbapi.com/?t=fear&apikey=ea52d5db
const autoCompleteConfig = {
    renderOptions(movie){
        const imgSrc = movie.Poster === 'N/A'? '':movie.Poster;
        return  `
        <img src="${imgSrc}"/>
        ${movie.Title}  (${movie.Year})`
    },
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchString){
            const resp = await axios.get(apiLink,{
                params:{
                    apikey: apiKey,
                    s: searchString
                }
            });
            if(resp.data.Error){
                return [];
            }
            return resp.data.Search    
    }

}
createAutocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie,document.querySelector('#left-summary'), 'left');
    }
})
createAutocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie,document.querySelector('#right-summary'), 'right');
    }
})

//2nd Request made to get full movie info from API:
let leftMovie, rightMovie;
const onMovieSelect = async (movie,summaryElement, side)=>{
    const resp = await axios.get(apiLink,{
    params:{
        apikey: apiKey,
        i: movie.imdbID
    }
    });
    summaryElement.innerHTML = renderMovie(resp.data);
    if(side === 'left')
    {
        leftMovie = resp.data;
    }else{
        rightMovie = resp.data;
    }

    if(leftMovie && rightMovie)
    {
        runComparison();
    }
}

