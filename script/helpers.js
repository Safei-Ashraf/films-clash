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
