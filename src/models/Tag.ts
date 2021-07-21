// imports
import { DateTime } from 'luxon'

// main
interface Tag {
    id: string
    name: string
    icon: string
    color: string
    text_color: string
    slug: string
    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Tag
