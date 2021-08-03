// imports
import { DateTime } from 'luxon'

// main
interface Application {
    id: string
    name: string
    slug: string
    port: number
    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Application
