import pagination from './pagination'
const authorTable = (dataList) => {
    
    let template = `
        <div class="no-data">
            <div> No matching records found </div>
            <button id="start"> Back to home </button>
        <div>
    `

    if (dataList && dataList.length) {
        let tableTemplate = ''
        for (const data of dataList) {
            tableTemplate += `<tr>
                <td><a href="${data.url || ''}" target="blank">${data.title || ''}</a></td>
                <td>${data.author} (<span class="count">${data.submissions || '--'}</span>)</td>
            </tr>`
        }
        template = `
            <table>
                <thead><tr class="table-header">
                    <th>Title</th>
                    <th>Author Submission</th>
                </tr></thead>
                <tbody id="feature-table">
                    ${tableTemplate}
                </tbody>
            </table>
            ${pagination()}`
    }

    return template
}

export default authorTable