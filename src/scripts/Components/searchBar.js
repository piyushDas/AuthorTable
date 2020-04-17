const searchBar = () => {
    let template =  `
        <div class="flex flex-center search-bar">
            <input type="text" id="search-input" placeholder="search">
            <button type="button" id="search">
                Search
            </button>
        </div>`
    return template
}

export default searchBar