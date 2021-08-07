<template>
    <Card title="Models">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('devices_models.create')" class="btn btn-primary">Create</Link>
        </template>

        <div v-if="models?.length">
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
                                            Icon
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
                                            Created At
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
                                            Updated At
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
                                    <tr v-for="model in models" :key="model.id">
                                        <td class="px-6 py-2 whitespace-nowrap">
                                            <component
                                                :is="model.icon + 'Icon'"
                                                class="h-10 w-10"
                                            ></component>
                                        </td>
                                        <td class="px-6 py-2 whitespace-nowrap">
                                            <div>
                                                <div class="text-sm font-medium">
                                                    {{ model.name }}
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
                                                    {{ model.slug }}
                                                </div>
                                            </div>
                                        </td>
                                        <td
                                            class="px-6 py-2 whitespace-nowrap"
                                            v-html="formatDate(model.created_at)"
                                        ></td>
                                        <td
                                            class="px-6 py-2 whitespace-nowrap"
                                            v-html="formatDate(model.updated_at)"
                                        ></td>
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
                                                    $routes.get('devices_models.edit', {
                                                        id: model.slug,
                                                    })
                                                "
                                                class="
                                                    transition-colors
                                                    text-primary-400
                                                    hover:text-primary-700
                                                "
                                                >Edit</Link
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-gray-400 italic">no model ...</div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { DateTime } from 'luxon'

import { iconComponents } from './icons'
import DeviceModelModel from '@/models/DeviceModel'
import Card from '@/components/Card.vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Devices', page: 'devices.index' }, { name: 'Models' }],
    props: {
        models: {
            type: Object as PropType<DeviceModelModel[]>,
            default: [],
        },
    },
    components: { Link, Card, Tooltip, ...iconComponents },
    setup() {
        // methods
        const formatDate = (date: string) =>
            `${DateTime.fromISO(
                date
            ).toRelativeCalendar()}<span class='text-gray-400'> - ${DateTime.fromISO(
                date
            ).toLocaleString(DateTime.DATETIME_MED)}</span>`

        // return
        return {
            formatDate,
        }
    },
})
</script>
