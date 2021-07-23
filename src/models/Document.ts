// imports
import { DateTime } from 'luxon'

import Tag from '@/models/Tag'

// main
interface Document {
    id: string
    name: string
    description: string
    slug: string
    tags?: Tag[]
    notes?: string

    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Document
