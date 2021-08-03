<template>
    <Card title="Applications">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('applications.create')" class="btn btn-primary">Create</Link>
        </template>

        <div v-if="applications?.length">
            <div v-for="application in applications" class="block mb-4 last:mb-0">
                {{ application.name }} ({{ application.port }})
            </div>
        </div>
        <div v-else class="text-gray-400 italic">no application ...</div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import ApplicationModel from '@/models/Application'
import Card from '@/components/Card.vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Applications', page: 'applications.index' }],
    props: {
        applications: {
            type: Object as PropType<ApplicationModel[]>,
            default: [],
        },
    },
    components: { Link, Card, Tooltip },
})
</script>
