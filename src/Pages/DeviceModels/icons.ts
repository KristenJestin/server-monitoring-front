// imports
import {
    DesktopComputerIcon,
    DeviceMobileIcon,
    DeviceTabletIcon,
    ServerIcon,
    DatabaseIcon,
} from '@heroicons/vue/solid'

// main
const iconComponents = {
    DesktopComputerIcon,
    DeviceMobileIcon,
    DeviceTabletIcon,
    ServerIcon,
    DatabaseIcon,
}
const icons = [
    { label: 'Computer', value: 'DesktopComputer', icon: DesktopComputerIcon },
    { label: 'Server', value: 'Server', icon: ServerIcon },
    { label: 'Mobile', value: 'DeviceMobile', icon: DeviceMobileIcon },
    { label: 'Tablet', value: 'DeviceTablet', icon: DeviceTabletIcon },
    { label: 'Database', value: 'Database', icon: DatabaseIcon },
]

// exports
export { icons, iconComponents }
