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
console.log(movies)
}

input.addEventListener('input', debouncer(onInput));

