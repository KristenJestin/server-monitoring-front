<template>
    <Card title="Drives">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('drives.index')" class="btn btn-muted">GET ALL</Link>
        </template>

        <div v-if="drives?.length">
            <div v-for="drive in drives" class="block mb-4 last:mb-0">
                <div class="flex">
                    <div>
                        <component
                            :is="drive.id ? 'Link' : 'div'"
                            :href="$routes.get('drives.show', { id: drive.slug })"
                        >
                            <Tooltip :message="drive.filesystem">
                                {{ drive.name || drive.mounted }}
                            </Tooltip>
                        </component>
                    </div>
                    <div class="ml-auto font-bold inline-block">
                        <small class="text-sm">
                            ({{ humanFileSize(drive.used) }}/{{ humanFileSize(drive.blocks) }})
                        </small>
                        {{ drive.capacity }}
                    </div>
                </div>
                <div class="pt-1">
                    <div class="overflow-hidden h-2 text-xs flex rounded bg-primary-200">
                        <div
                            :style="{ width: drive.capacity }"
                            class="
                                shadow-none
                                flex flex-col
                                text-center
                                whitespace-nowrap
                                text-white
                                justify-center
                            "
                            :class="{
                                'bg-primary-500': (drive.used * 100) / drive.blocks <= 85,
                                'bg-red-500': (drive.used * 100) / drive.blocks > 85,
                            }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-gray-400 italic">no drive ...</div>
    </Card>

    <Card title="Applications" class="mt-16">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('applications.index')" class="btn btn-muted">GET ALL</Link>
        </template>

        <div v-if="applications?.length" class="flex flex-wrap flex-row">
            <a
                v-for="application in applications"
                :href="buildUrl(application)"
                target="_blank"
                class="h-32 w-32 m-5 relative overflow-hidden rounded-md shadow-md"
            >
                <img
                    :src="
                        $routes.get('applications.image', {
                            id: application.slug,
                            type: 'original',
                        })
                    "
                    class="object-cover h-full"
                />
                <div
                    class="
                        bg-gradient-to-b
                        from-transparent
                        to-gray-800
                        absolute
                        inset-0
                        h-full
                        w-full
                        flex
                        items-end
                        justify-center
                        font-bold
                        uppercase
                        opacity-0
                        hover:opacity-100
                        transition-opacity
                        duration-300
                        ease-in-out
                        text-white
                    "
                >
                    <span class="absolute bottom-1">{{ application.name }}</span>
                </div>
            </a>
        </div>
        <div v-else class="text-gray-400 italic">no application ...</div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import DriveInfoModel from '@/models/DriveInfo'
import ApplicationModel from '@/models/Application'
import { humanFileSize } from '@/utils/readable'
import Card from '@/components/Card.vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    props: {
        drives: {
            type: Object as PropType<DriveInfoModel[]>,
            default: [],
        },
        applications: {
            type: Object as PropType<ApplicationModel[]>,
            default: [],
        },
    },
    components: { Link, Card, Tooltip },
    setup() {
        // refs
        const host = computed(() => window.location.protocol + '//' + window.location.hostname)

        // methods
        const buildUrl = (application: ApplicationModel) => {
            let url = host.value
            url += `:${application.port}`

            if (application.url)
                url += (!application.url.startsWith('/') ? '/' : '') + application.url

            return url
        }

        // return
        return {
            humanFileSize,
            buildUrl,
        }
    },
})
</script>
