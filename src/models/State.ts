// imports
import { DateTime } from 'luxon'

// main
interface State {
    id: string
    name: string
    color: string
    text_color: string
    border_color: string
    slug: string
    created_at: DateTime
    updated_at: DateTime
}

// exports
export default State
