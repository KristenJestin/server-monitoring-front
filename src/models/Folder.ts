// imports
import { DateTime } from 'luxon'

// main
interface Folder {
    id: string
    name: string
    slug: string
    color?: string
    parent_id?: string
    parent?: Folder

    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Folder
