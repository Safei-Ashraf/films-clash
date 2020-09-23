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
    return resp.data.Search  
}
const input = document.querySelector('input');


const onInput = async (e)=>{
const movies = await fetchMovieData(e.target.value);
for(let movie of movies)
{
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${movie.Poster}"/>
    <h1>${movie.Title}</h1>`;
    
    document.querySelector('#target').appendChild(div);

}
}

input.addEventListener('input', debouncer(onInput));

