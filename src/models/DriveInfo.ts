// main
interface DriveInfo {
    id?: string
    name?: string
    slug?: string

    filesystem: string
    blocks: number
    used: number
    available: number
    capacity: string
    mounted: string
}

// exports
export default DriveInfo
