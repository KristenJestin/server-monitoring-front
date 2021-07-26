// imports
import { App } from 'vue'
import { RouteElement, RoutesModule } from './props'

// data
const PLUGIN_NAME = 'RoutesPlugin'

// main
const plugin = {
    install: (app: App) => {
        const module: RoutesModule = {
            get,
            getWithWildcard,
        }

        app.config.globalProperties.$routes = module
        app.provide('$routes', module)
    },
}

const get = (name: string, params: Record<string, string | number> | undefined = undefined) => {
    // find route with name
    const route = getRouteUrl(name)

    // get url
    let url = route.pattern
    if (params && Object.keys(params).length > 0) {
        // replace all params
        for (const [key, value] of Object.entries(params)) {
            url = url.replace(new RegExp(`:${key}`, 'gi'), value.toString())
        }
    }

    // return
    return url
}

const getWithWildcard = (name: string, params: string[] = []) => {
    // find route with name
    const route = getRouteUrl(name)

    if (!route.pattern.includes('*'))
        throw new Error(`${PLUGIN_NAME} : the pattern does not contain the character '*'.`)

    // get url
    const segments = params.join('/')
    const url = route.pattern.replace('*', segments)

    // return
    return url
}

const getRouteUrl = (name: string): RouteElement => {
    // get all routes
    const routes = (window as any).APP_ROUTES as RouteElement[]
    if (!routes)
        throw new Error(
            `${PLUGIN_NAME} : the globale routes variable was not found ('APP_ROUTES').`
        )

    // find route with name
    const route = routes.find((route) => route.name === name)
    if (!route) throw new Error(`${PLUGIN_NAME} : the route name '${name}' doesnt exists.`)
    return route
}

// exports
export default plugin
