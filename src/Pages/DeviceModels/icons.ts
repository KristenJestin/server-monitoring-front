// imports
import {
    DesktopComputerIcon,
    DeviceMobileIcon,
    DeviceTabletIcon,
    ServerIcon,
} from '@heroicons/vue/solid'

// main
const iconComponents = { DesktopComputerIcon, DeviceMobileIcon, DeviceTabletIcon, ServerIcon }
const icons = [
    { label: 'Computer', value: 'DesktopComputer', icon: DesktopComputerIcon },
    { label: 'Server', value: 'Server', icon: ServerIcon },
    { label: 'Mobile', value: 'DeviceMobile', icon: DeviceMobileIcon },
    { label: 'Tablet', value: 'DeviceTablet', icon: DeviceTabletIcon },
]

// exports
export { icons, iconComponents }
