// main
interface RoutesModule {
    get: (name: string, params?: Record<string, string | number>) => string
}

interface RouteElement {
    name: string
    methods: string[]
    pattern: string
}

// exports
export { RoutesModule, RouteElement }
