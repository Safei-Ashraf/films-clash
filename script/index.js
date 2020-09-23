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
    console.log(resp.data);  
}
const input = document.querySelector('input');
let timeoutId;

const onInput = (e)=>{
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(()=>{fetchMovieData(e.target.value)},800);
    
    }

input.addEventListener('input', onInput)

