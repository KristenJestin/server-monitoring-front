// imports
import { DateTime } from 'luxon'

import Tag from '@/models/Tag'
import Folder from '@/models/Folder'

// main
interface Document {
    id: string
    name: string
    description: string
    slug: string
    tags?: Tag[]
    notes?: string
    file_id: string
    received_at?: string
    amount?: string
    duration?: number
    folder_id?: string
    folder?: Folder

    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Document
