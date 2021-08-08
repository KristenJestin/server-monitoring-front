<template>
    <div
        class="bg-white transition duration-500 ease-in-out dark:bg-gray-700 flex items-center h-10"
    >
        <div class="px-5 py-2">
            <Link
                :href="$routes.get('home')"
                :class="{ 'text-gray-400': $page.component.startsWith('Home') }"
            >
                <HomeIcon class="h-5" />
            </Link>
        </div>
        <template v-for="item in items">
            <ChevronRightIcon class="h-4 text-gray-400" />
            <div class="px-5 py-2">
                <Link v-if="item.page" :href="$routes.get(item.page)" class="font-bold">
                    {{ item.name }}
                </Link>
                <div v-else class="font-bold text-gray-400">{{ item.name }}</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { HomeIcon, ChevronRightIcon } from '@heroicons/vue/solid'

import BreadcrumbItem from '@/models/extras/BreadcrumbItem'
import { Link } from '@inertiajs/inertia-vue3'

export default defineComponent({
    props: {
        items: {
            type: Array as PropType<BreadcrumbItem[]>,
            default: [],
        },
    },
    components: { Link, HomeIcon, ChevronRightIcon },
})
</script>
