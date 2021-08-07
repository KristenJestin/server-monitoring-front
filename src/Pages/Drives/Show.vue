<template>
    <Card :title="`Drive : ${drive.name}`">
        <template v-slot:title-right-part>
            <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
            <Link :href="$routes.get('drives.edit', { id: drive.slug })" class="btn btn-muted"
                >Edit</Link
            >
        </template>

        <div class="block">
            <div class="flex">
                <div>{{ drive.mounted }}</div>
                <div class="ml-auto font-bold inline-block">
                    <small class="text-sm"
                        >({{ humanFileSize(drive.used) }}/{{ humanFileSize(drive.blocks) }})</small
                    >
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

        <div class="mt-8">
            <dl>
                <div
                    v-for="([name, value], index) in Object.entries(infos)"
                    class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    :class="{
                        'bg-gray-100 transition duration-500 ease-in-out dark:bg-gray-700':
                            index % 2 === 0,
                    }"
                >
                    <dt
                        class="
                            text-sm
                            font-medium
                            text-gray-500
                            transition
                            duration-500
                            ease-in-out
                            dark:text-gray-300
                        "
                    >
                        {{ name }}
                    </dt>
                    <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
                        {{ value }}
                    </dd>
                </div>
            </dl>
        </div>
    </Card>

    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete Drive"
        :message="`Are you sure you want to delete the drive '${drive.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import { humanFileSize } from '@/utils/readable'
import DriveInfoModel from '@/models/DriveInfo'
import Modal from '@/components/Modal.vue'
import Card from '@/components/Card.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Drives', page: 'drives.index' }, { name: 'Show' }],
    props: {
        drive: {
            type: Object as PropType<DriveInfoModel>,
            required: true,
        },
    },
    components: { Link, Modal, Card },
    setup({ drive }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)

        // data
        const infos = {
            'Name': drive.name,
            'Filesystem name': drive.filesystem,
            'Mounted name': drive.mounted,
            'Used Size': humanFileSize(drive.used),
            'Max Size': humanFileSize(drive.blocks),
            'Available  Size': humanFileSize(drive.available),
        }

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes!.get('drives.destroy', { id: drive.slug }))
        }

        // return
        return {
            destroy,
            deleteButtonPress,
            modalOpen,
            humanFileSize,
            infos,
        }
    },
})
</script>
