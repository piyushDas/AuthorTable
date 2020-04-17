/**
 * Service - fetched data from the endpoints
 * @url - https://api.jsonbin.io/b/5e8c3aafaf7c476bc47e47a3
 * returns json formatted response
 */

const Service = function () {
    let retryCount = 0
    this.getAuthorSubmission = async userName => {
        return fetch(`https://hn.algolia.com/api/v1/users/${userName}`)
                .then((response) => {
                    return response.json()
                })
    }
    this.getData = (str='', page=0) => {
        let url = `https://hn.algolia.com/api/v1/search?query=${str}&page=${page}`
        return fetch(url)
                .then((response) => {
                    return response.json()
                }).catch(err => {
                    retryCount += 1
                    if (retryCount < 4) {
                        this.getData(str, page)
                    }
                    return {}
                })
                // .then(async res => {
                //     let data = res.hits
                //     const counts = {}
                //     for (const item of data) {
                //         if (counts[item.author]) {
                //             item.submissions = counts[item.author]
                //         } else {
                //             const submissions = await this.getAuthorSubmission(item.author)
                //             counts[item.author] = submissions.submission_count
                //             item.submissions = submissions.submission_count
                //         }
                //     }
                //     return res
                // })
    }

}

export default Service