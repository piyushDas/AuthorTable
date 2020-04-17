
import searchBar from './Components/searchBar'
import authorTable from  './Components/authorTable'
// import pagination from './Components/pagination'

/**
 * View component
 *
 * @param {string} id Selector to html component
 * @param {Object} data fetched from service
 */

const View = function (id, data, service) {

    /**
     * Whenever new instance of View is created 
     * the first function to be invoked to intialize view
     * 
     * Invoked only once
     */
    this.filteredData = []
     if (data && data.hits && data.hits.length) {
        this.filteredData = [...data.hits]
     }
     
     this.searchString = ''
     this.currentPage = 0

     this.bindTemplate = () => {
        document.getElementById(id).innerHTML = `
            ${searchBar()}
            ${authorTable(this.filteredData)}
        `
        this.bindSearchBehaviour()
        this.bindPagination()
        this.getUserCount()
     }

     this.bindSearchBehaviour = () => {
        const getInput = e => {
            this.searchString = e.currentTarget.value
            console.log(this.searchString)
        }
        const searchInput = document.getElementById('search-input')
        searchInput.removeEventListener('keyup', getInput)
        searchInput.addEventListener('keyup', getInput)

        const searchFunc = async () => {
            if (!this.searchString) {
                return
            }
            this.currentPage = 0
            const data = await service.getData(this.searchString, this.currentPage)
            this.filteredData = [...data.hits]
            this.bindTemplate()
        }
        const searchEl = document.getElementById('search')
        searchEl.removeEventListener('click', searchFunc)
        searchEl.addEventListener('click', searchFunc)

        const back = document.getElementById('start')
        if (back) {
            const firstPage = async () => {
                this.searchString = ''
                this.currentPage = 0
                const data = await service.getData(this.searchString, this.currentPage)
                this.filteredData = [...data.hits]
                this.bindTemplate()
            }
            back.removeEventListener('click', firstPage)
            back.addEventListener('click', firstPage)
        }
     }

     this.bindPagination = () => {
        const next =  document.getElementById('next')
        const previous = document.getElementById('previous')
        const nextPage = async e => {
            this.currentPage += 1
            if (this.currentPage <= data.nbPages) {
                const data = await service.getData(this.searchString, this.currentPage)
                this.filteredData = [...data.hits]
                this.bindTemplate()
            }
        }
        const previousPage = async e => {
            this.currentPage -= 1
            if (this.currentPage >= 0) {
                const data = await service.getData(this.searchString, this.currentPage)
                this.filteredData = [...data.hits]
                this.bindTemplate()
            }
        }
        if (next) {
            if (this.currentPage === data.nbPages) {
                next.setAttribute('disabled', true)
            } else {
                next.removeAttribute('disabled')
            }
            next.removeEventListener('click', nextPage)
            next.addEventListener('click', nextPage)
        }

        if (previous) {
            if (this.currentPage === 0) {
                previous.setAttribute('disabled', true)
            } else {
                previous.removeAttribute('disabled')
            }
            previous.removeEventListener('click', previousPage)
            previous.addEventListener('click', previousPage)
        }
     }

     this.getUserCount = () => {
        const countEls = document.getElementsByClassName('count')
        const counts = {}
        for (const [index, data] of this.filteredData.entries()) {
            if (!counts[data.author]) {
                service.getAuthorSubmission(data.author).then(res => {
                    counts[data.author] = res.submission_count || ''
                    countEls[index].innerHTML = counts[data.author]
                })
                
            }
            countEls[index].innerHTML = counts[data.author] || '--'
        }
     }

}

export default View