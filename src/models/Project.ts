// imports
import { DateTime } from 'luxon'

import State from '@/models/State'

// main
interface Project {
    id: string
    name: string
    description: string
    slug: string
    state_id: string
    state?: State
    created_at: DateTime
    updated_at: DateTime
}

// exports
export default Project
