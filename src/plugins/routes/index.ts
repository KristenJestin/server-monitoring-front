// imports
import { App } from 'vue'
import { RouteElement, RoutesModule } from './props'

// main
const plugin = {
    install: (app: App) => {
        const module: RoutesModule = {
            get,
        }

        app.config.globalProperties.$routes = module
        app.provide('$routes', module)
    },
}

const get = (name: string, params: Record<string, string | number> | undefined = undefined) => {
    // get all routes
    const routes = (window as any).APP_ROUTES as RouteElement[]
    if (!routes)
        throw new Error(`RoutesPlugin : the globale routes variable was not found ('APP_ROUTES').`)

    // find route with name
    const route = routes.find((route) => route.name === name)
    if (!route) throw new Error(`RoutesPlugin : the route name '${name}' doesnt exists.`)

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

// exports
export default plugin
