// imports
import { DateTime } from 'luxon'

// main
interface Drive {
    id: string
    name: string
    slug: string
    size: string
    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Drive
