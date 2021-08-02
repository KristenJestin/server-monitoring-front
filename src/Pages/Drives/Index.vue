<template>
    <Card title="Drives">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('drives.create')" class="btn btn-primary">Create</Link>
        </template>

        <div>
            <h4 class="text-lg upperace font-bold">Enabled</h4>
            <div v-if="drives?.length">
                <div v-for="drive in drives" class="block">
                    <Link :href="$routes.get('drives.show', { id: drive.slug })">
                        <p>{{ drive.name }}</p>
                    </Link>
                </div>
            </div>
            <div v-else class="text-gray-400 dark:text-gray-300 italic">no drive ...</div>
        </div>
        <div class="mt-5">
            <h4 class="text-lg upperace font-bold">Disks</h4>
            <div v-if="disks?.length">
                <div v-for="disk in disks" class="block">
                    <div>
                        {{ disk._mounted }} <small class="text-sm">({{ disk._filesystem }})</small>
                        <div class="ml-2 font-bold inline-block">{{ disk._capacity }}</div>
                    </div>
                    <div class="relative pt-1">
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-300">
                            <div
                                :style="{ width: disk._capacity }"
                                class="
                                    shadow-none
                                    flex flex-col
                                    text-center
                                    whitespace-nowrap
                                    text-white
                                    justify-center
                                    bg-primary-500
                                "
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-gray-400 italic">no disk ...</div>
        </div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import Layout from '@/components/Layout.vue'
import DriveModel from '@/models/Drive'
import DiskModel from '@/models/Disk'
import Title from '@/components/Title.vue'
import Card from '@/components/Card.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Drives', page: 'drives.index' }],
    props: {
        drives: {
            type: Object as PropType<DriveModel[]>,
            default: [],
        },
        disks: {
            type: Object as PropType<DiskModel[]>,
            default: [],
        },
    },
    components: { Link, Title, Card },
})
</script>
