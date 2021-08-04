<template>
    <Card title="Applications">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('applications.create')" class="btn btn-primary">Create</Link>
        </template>

        <div v-if="applications?.length">
            <Link
                v-for="application in applications"
                class="flex items-center mb-4 last:mb-0"
                :href="$routes.get('applications.show', { id: application.slug })"
            >
                <img
                    :src="$routes.get('applications.image', { id: application.slug, type: 'sm' })"
                    class="
                        object-cover
                        h-14
                        w-14
                        rounded-full
                        shadow-2xl
                        border-2 border-primary-900
                        dark:border-primary-100
                    "
                />
                <span class="ml-4">{{ application.name }} ({{ application.port }})</span>
            </Link>
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
