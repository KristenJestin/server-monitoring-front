// main
interface RoutesModule {
    get: (name: string, params?: Record<string, string | number | undefined>) => string
    getWithWildcard: (name: string, params?: string[]) => string
}

interface RouteElement {
    name: string
    methods: string[]
    pattern: string
}

// exports
export { RoutesModule, RouteElement }
