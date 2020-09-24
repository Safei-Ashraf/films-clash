const apiLink = `http://www.omdbapi.com/?`;
const apiKey = `ea52d5db`;
//http://www.omdbapi.com/?t=fear&apikey=ea52d5db

const fetchMovieData = async (searchString)=>{
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

//Autocomplete list Generation:
const root = document.querySelector('.autocomplete');
root.innerHTML = `
<label><b>Search Films</b></label>
<input class="input"/>
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results">
        </div>
    </div>
</div>
`
const results = document.querySelector('.results');
const dropdown = document.querySelector('.dropdown');
const input = document.querySelector('input');

const onInput = async (e)=>{
const movies = await fetchMovieData(e.target.value);
clearIt(results);
dropdown.classList.add('is-active');
if(movies.length > 0){
    for(let movie of movies)
    {
        const item = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A'? '':movie.Poster;
        item.classList.add('dropdown-item')
        item.innerHTML = `
        <img src="${imgSrc}"/>
        ${movie.Title}`;

        item.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        })

        results.appendChild(item);
     
    }
} else{
    const item = document.createElement('a');
    item.classList.add('dropdown-item')
    item.innerHTML = `
    No result Found`;
    results.appendChild(item);
}
    }

input.addEventListener('input', debouncer(onInput));

//2nd Request made to get full movie info from API:
const onMovieSelect = async (movie)=>{
   const resp = await axios.get(apiLink,{
    params:{
        apikey: apiKey,
        i: movie.imdbID
    }
   });
   document.querySelector('#summary').innerHTML = renderMovie(resp.data);
}
//Close dropdown automatically:
document.addEventListener('click',e=>{
    if(!root.contains(e.target))
    {
        dropdown.classList.remove('is-active');
    }
})

