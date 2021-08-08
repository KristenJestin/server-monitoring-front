<template>
    <Card title="devices">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('devices_models.index')" class="btn btn-muted mr-4">
                Models
            </Link>
            <Link :href="$routes.get('devices.create')" class="btn btn-primary">Create</Link>
        </template>

        <div v-if="devices?.length">
            <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="shadow overflow-hidden sm:rounded-lg">
                            <table
                                class="
                                    min-w-full
                                    divide-y divide-gray-200
                                    transition-colors
                                    duration-500
                                    ease-in-out
                                    dark:divide-gray-800
                                "
                            >
                                <thead
                                    class="
                                        bg-gray-100
                                        transition-colors
                                        duration-500
                                        ease-in-out
                                        dark:bg-gray-700
                                    "
                                >
                                    <tr>
                                        <th
                                            scope="col"
                                            class="
                                                px-6
                                                py-3
                                                text-left text-xs
                                                font-medium
                                                text-gray-500
                                                transition-colors
                                                duration-500
                                                ease-in-out
                                                dark:text-gray-300
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Model
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                                                px-6
                                                py-3
                                                text-left text-xs
                                                font-medium
                                                text-gray-500
                                                transition-colors
                                                duration-500
                                                ease-in-out
                                                dark:text-gray-300
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                                                px-6
                                                py-3
                                                text-left text-xs
                                                font-medium
                                                text-gray-500
                                                transition-colors
                                                duration-500
                                                ease-in-out
                                                dark:text-gray-300
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                                                px-6
                                                py-3
                                                text-left text-xs
                                                font-medium
                                                text-gray-500
                                                transition-colors
                                                duration-500
                                                ease-in-out
                                                dark:text-gray-300
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            OS
                                        </th>
                                        <th
                                            scope="col"
                                            class="
                                                px-6
                                                py-3
                                                text-left text-xs
                                                font-medium
                                                text-gray-500
                                                transition-colors
                                                duration-500
                                                ease-in-out
                                                dark:text-gray-300
                                                uppercase
                                                tracking-wider
                                            "
                                        >
                                            Created At
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Edit / Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    class="
                                        bg-white
                                        divide-y divide-gray-200
                                        transition-colors
                                        duration-500
                                        ease-in-out
                                        dark:bg-gray-700 dark:divide-gray-600
                                    "
                                >
                                    <tr v-for="device in devices" :key="device.id">
                                        <td class="px-6 py-2 whitespace-nowrap">
                                            <Tooltip :message="device.model?.name || 'not defined'">
                                                <component
                                                    :is="(device.model?.icon || 'Hashtag') + 'Icon'"
                                                    class="h-10 w-10"
                                                ></component>
                                            </Tooltip>
                                        </td>
                                        <td class="px-6 py-2 whitespace-nowrap">
                                            <div>
                                                <div class="text-sm font-medium">
                                                    <Tooltip :message="device.device">
                                                        {{ device.display_name || device.name }}
                                                    </Tooltip>
                                                </div>
                                                <div
                                                    class="
                                                        text-sm text-gray-500
                                                        transition-colors
                                                        duration-500
                                                        ease-in-out
                                                        dark:text-gray-400
                                                    "
                                                >
                                                    {{ device.slug }}
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-2 whitespace-nowrap">
                                            <Status
                                                :status="device.status"
                                                :connection-date="device.connection_updated_at"
                                            ></Status>
                                        </td>
                                        <td class="px-6 py-2 whitespace-nowrap">
                                            <Tooltip :message="device.os_version">
                                                <div v-if="device.os">{{ device.os }}</div>
                                                <i v-else class="italic">not defined</i>
                                            </Tooltip>
                                        </td>
                                        <td class="px-6 py-2 whitespace-nowrap">
                                            <RelativeDate :date="device.created_at"></RelativeDate>
                                        </td>
                                        <td
                                            class="
                                                px-6
                                                py-2
                                                whitespace-nowrap
                                                text-right text-sm
                                                font-medium
                                            "
                                        >
                                            <Link
                                                :href="
                                                    $routes.get('devices.edit', {
                                                        id: device.slug,
                                                    })
                                                "
                                                class="
                                                    transition-colors
                                                    text-primary-400
                                                    hover:text-primary-700
                                                "
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                :href="
                                                    $routes.get('devices.show', {
                                                        id: device.slug,
                                                    })
                                                "
                                                class="
                                                    ml-3
                                                    transition-colors
                                                    text-primary-400
                                                    hover:text-primary-700
                                                "
                                            >
                                                Show
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-gray-400 italic">no device ...</div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { HashtagIcon } from '@heroicons/vue/outline'

import { iconComponents } from '@/Pages/DeviceModels/icons'
import DeviceModel from '@/models/Device'
import Status from './components/Status.vue'
import Card from '@/components/Card.vue'
import RelativeDate from '@/components/RelativeDate.vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Devices' }],
    props: {
        devices: {
            type: Object as PropType<DeviceModel[]>,
            default: [],
        },
    },
    components: {
        Link,
        Card,
        Status,
        Tooltip,
        ...iconComponents,
        RelativeDate,
        HashtagIcon,
    },
    setup() {},
})
</script>
