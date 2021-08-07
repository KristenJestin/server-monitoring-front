<template>
    <Card title="devices">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('devices_models.index')" class="btn btn-muted mr-4"
                >Models</Link
            >
            <Link :href="$routes.get('devices.create')" class="btn btn-primary">Create</Link>
        </template>

        <div v-if="devices?.length">
            <div
                v-for="device in devices"
                class="
                    lg:flex lg:items-center lg:justify-between
                    mb-3
                    pt-3
                    border-t border-gray-300
                    transition
                    duration-500
                    ease-in-out
                    dark:border-gray-500
                    first:border-0
                    last:mb-0
                "
            >
                <span>{{ device.display_name || device.name }}</span>
            </div>
        </div>
        <div v-else class="text-gray-400 italic">no device ...</div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import {
    CalendarIcon,
    StatusOnlineIcon,
    ServerIcon,
    ExternalLinkIcon,
    PencilIcon,
    DocumentTextIcon,
} from '@heroicons/vue/solid'

import deviceModel from '@/models/device'
import Card from '@/components/Card.vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Devices' }],
    props: {
        devices: {
            type: Object as PropType<deviceModel[]>,
            default: [],
        },
    },
    components: {
        Link,
        Card,
        Tooltip,
        CalendarIcon,
        StatusOnlineIcon,
        ServerIcon,
        ExternalLinkIcon,
        PencilIcon,
        DocumentTextIcon,
    },
    setup() {
        // refs
        const host = computed(() => window.location.protocol + '//' + window.location.hostname)

        // methods

        // return
        return {}
    },
})
</script>
