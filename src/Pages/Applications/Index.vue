<template>
    <Card title="Applications">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('applications.create')" class="btn btn-primary">Create</Link>
        </template>

        <div v-if="applications?.length">
            <div
                v-for="application in applications"
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
                <div class="flex-1 flex items-center min-w-0">
                    <div class="h-16 pr-4">
                        <img
                            :src="
                                $routes.get('applications.image', {
                                    id: application.slug,
                                    type: 'original',
                                })
                            "
                            class="object-cover h-full rounded-md shadow-md"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h2 class="text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
                            <Link
                                :href="$routes.get('applications.show', { id: application.slug })"
                            >
                                {{ application.name }}
                            </Link>
                        </h2>
                        <div class="mt-0 flex flex-row space-x-6">
                            <div
                                class="
                                    mt-1
                                    flex
                                    items-center
                                    text-sm text-gray-500
                                    transition
                                    duration-500
                                    ease-in-out
                                    dark:text-gray-400
                                "
                            >
                                <StatusOnlineIcon
                                    class="
                                        flex-shrink-0
                                        mr-1.5
                                        h-5
                                        w-5
                                        text-gray-400
                                        transition
                                        duration-500
                                        ease-in-out
                                        dark:text-gray-300
                                    "
                                    aria-hidden="true"
                                />
                                {{ application.port }}
                            </div>
                            <div
                                v-if="application.service"
                                class="
                                    mt-1
                                    flex
                                    items-center
                                    text-sm text-gray-500
                                    transition
                                    duration-500
                                    ease-in-out
                                    dark:text-gray-400
                                "
                            >
                                <ServerIcon
                                    class="
                                        flex-shrink-0
                                        mr-1.5
                                        h-5
                                        w-5
                                        text-gray-400
                                        transition
                                        duration-500
                                        ease-in-out
                                        dark:text-gray-300
                                    "
                                    aria-hidden="true"
                                />
                                {{ application.service }}
                            </div>
                            <div
                                class="
                                    mt-1
                                    hidden
                                    lg:flex
                                    items-center
                                    text-sm text-gray-500
                                    transition
                                    duration-500
                                    ease-in-out
                                    dark:text-gray-400
                                "
                            >
                                <CalendarIcon
                                    class="
                                        flex-shrink-0
                                        mr-1.5
                                        h-5
                                        w-5
                                        text-gray-400
                                        transition
                                        duration-500
                                        ease-in-out
                                        dark:text-gray-300
                                    "
                                    aria-hidden="true"
                                />
                                Updated on {{ formatDate(application.updated_at) }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 flex lg:mt-0 lg:ml-4">
                    <span class="hidden xl:block">
                        <Link
                            :href="$routes.get('applications.edit', { id: application.slug })"
                            class="inline-flex items-center btn btn-muted"
                        >
                            <PencilIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Edit
                        </Link>
                    </span>

                    <span class="block sm:ml-3">
                        <Link
                            :href="$routes.get('applications.show', { id: application.slug })"
                            class="inline-flex items-center btn btn-muted"
                        >
                            <DocumentTextIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Details
                        </Link>
                    </span>

                    <span class="ml-3">
                        <a
                            :href="buildUrl(application)"
                            target="_blank"
                            class="inline-flex items-center btn btn-primary"
                        >
                            <ExternalLinkIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Open
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="text-gray-400 italic">no application ...</div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import {
    CalendarIcon,
    StatusOnlineIcon,
    ServerIcon,
    ExternalLinkIcon,
    PencilIcon,
    DocumentTextIcon,
} from '@heroicons/vue/solid'
import { DateTime } from 'luxon'

import { buildApplicationUrl as buildUrl } from '@/utils/url'
import ApplicationModel from '@/models/Application'
import Card from '@/components/Card.vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Applications' }],
    props: {
        applications: {
            type: Object as PropType<ApplicationModel[]>,
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
        // methods
        const formatDate = (date: string) =>
            DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)

        // return
        return {
            formatDate,
            buildUrl,
        }
    },
})
</script>
