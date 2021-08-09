// main
interface DeviceDrive {
    id: string
    device: string

    name: string
    volume_label?: string
    drive_format: string
    drive_type: string
    is_ready: boolean
    available_free_space: number
    total_free_space: number
    total_size: number

    total_used_space: number
    total_used_percentage: number

    created_at: string
}

// exports
export default DeviceDrive
