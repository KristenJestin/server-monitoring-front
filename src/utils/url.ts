// imports
import ApplicationModel from '@/models/Application'

// main
const buildApplicationUrl = (application: ApplicationModel) => {
    const host = window.location.protocol + '//' + window.location.hostname

    let url = host
    url += `:${application.port}`

    if (application.url) url += (!application.url.startsWith('/') ? '/' : '') + application.url

    return url
}

// exports
export { buildApplicationUrl }
