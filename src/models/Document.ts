// imports
import { DateTime } from 'luxon'

import Tag from '@/models/Tag'

// main
interface Document {
    id: string
    name: string
    description: string
    slug: string
    tag_id: string
    tag?: Tag
    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Document
