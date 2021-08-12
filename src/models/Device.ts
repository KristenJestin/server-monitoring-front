// imports
import DeviceModel from '@/models/DeviceModel'

// main
enum STATUS {
    UP = 'up',
    DOWN = 'down',
}
interface Device {
    id: string
    device: string
    name: string
    slug: string
    display_name: string
    os: number
    os_version: string
    status: STATUS
    connection_updated_at?: string
    deactivated_at?: string
    api_key: string

    model_id?: string
    model?: DeviceModel

    created_at: string
    updated_at: string
}

// exports
export default Device
export { STATUS }
