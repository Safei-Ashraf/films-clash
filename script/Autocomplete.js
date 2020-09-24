const createAutocomplete = ({ root,renderOptions, onOptionSelect, inputValue, fetchData })=>{
    //Autocomplete list Generation:
root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`
const results = root.querySelector('.results');
const dropdown = root.querySelector('.dropdown');
const input = root.querySelector('input');

const onInput = async (e)=>{
const elements = await fetchData(e.target.value);
clearIt(results);
dropdown.classList.add('is-active');
if(elements.length > 0){
    for(let element of elements)
    {
        const item = document.createElement('a');
        item.classList.add('dropdown-item')
        item.innerHTML =renderOptions(element);

        item.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active');
            input.value = inputValue(element);
            onOptionSelect(element);
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
//Close dropdown automatically:
document.addEventListener('click',e=>{
    if(!root.contains(e.target))
    {
        dropdown.classList.remove('is-active');
    }
});
}