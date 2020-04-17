// import { qs, qsa, $on, $delegate } from './utils';

import '../stylesheets/style.scss';
import Service from './service.js'
import View from './view.js'


/**
 * App initializer
 *
 * async function fetches data from service
 * passes on to nested components
 */
const initiateApp = async () => {
    const dataSet = new Service()
    let authorData = await dataSet.getData()
    const view = new View('root', authorData, dataSet)
    view.bindTemplate()
}

initiateApp()