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

//delay api calls until user finishs typing: (debouncing an input>> waiting sometime after last event to do sth)
const onInput = (e)=>{
fetchMovieData(e.target.value);
}

input.addEventListener('input', debouncer(onInput));

