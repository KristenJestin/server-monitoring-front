// imports
import DeviceModel from '@/models/DeviceModel'

// main
interface Device {
    id: string
    name: string
    slug: string
    display_name: string
    os: number
    os_version: string

    model_id?: string
    model?: DeviceModel

    created_at: string
    updated_at: string
}

// exports
export default Device
