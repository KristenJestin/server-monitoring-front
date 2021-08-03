<template>
    <Card title="Drives">
        <template v-slot:title-right-part>
            <Link :href="$routes.get('drives.create')" class="btn btn-primary">Create</Link>
        </template>

        <div>
            <div v-if="drives?.length">
                <div v-for="drive in drives" class="block">
                    <div class="flex">
                        <div>
                            <Tooltip :message="drive.filesystem">
                                {{ drive.name || drive.mounted }}
                            </Tooltip>
                        </div>
                        <div class="ml-auto font-bold inline-block">
                            <small class="text-sm"
                                >({{ humanFileSize(drive.used) }}/{{
                                    humanFileSize(drive.blocks)
                                }})</small
                            >
                            {{ drive.capacity }}
                        </div>
                    </div>
                    <div class="relative pt-1">
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
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
        </div>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import DriveInfoModel from '@/models/DriveInfo'
import { humanFileSize } from '@/utils/readable'
import Title from '@/components/Title.vue'
import Card from '@/components/Card.vue'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Drives', page: 'drives.index' }],
    props: {
        drives: {
            type: Object as PropType<DriveInfoModel[]>,
            default: [],
        },
    },
    components: { Link, Title, Card, Tooltip },
    setup() {
        return {
            humanFileSize,
        }
    },
})
</script>
