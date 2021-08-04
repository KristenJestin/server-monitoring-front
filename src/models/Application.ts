// main
interface Application {
    id: string
    name: string
    slug: string
    port: number
    image: string

    service?: string
    url?: string
    website?: string
    description?: string

    created_at: string
    updated_at: string
}

// exports
export default Application
