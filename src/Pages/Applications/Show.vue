<template>
    <Card :title="`Application : ${application.name}`">
        <template v-slot:title-right-part>
            <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
            <Link
                :href="$routes.get('applications.edit', { id: application.slug })"
                class="btn btn-muted"
                >Edit</Link
            >
        </template>

        <div class="block">
            <div class="flex">
                <div>{{ application.mounted }}</div>
                <div class="ml-auto font-bold inline-block">
                    <small class="text-sm"
                        >({{ humanFileSize(application.used) }}/{{
                            humanFileSize(application.blocks)
                        }})</small
                    >
                    {{ application.capacity }}
                </div>
            </div>
            <div class="pt-1">
                <div class="overflow-hidden h-2 text-xs flex rounded bg-primary-200">
                    <div
                        :style="{ width: application.capacity }"
                        class="
                            shadow-none
                            flex flex-col
                            text-center
                            whitespace-nowrap
                            text-white
                            justify-center
                        "
                        :class="{
                            'bg-primary-500': (application.used * 100) / application.blocks <= 85,
                            'bg-red-500': (application.used * 100) / application.blocks > 85,
                        }"
                    ></div>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <!-- <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium">Informations</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                    All information about the '{{ application.name }}' disks
                </p>
            </div> -->
            <dl>
                <div
                    v-for="([name, value], index) in Object.entries(infos)"
                    class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    :class="{ 'bg-gray-50 dark:bg-gray-700': index % 2 === 0 }"
                >
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-300">
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
        title="Delete Application"
        :message="`Are you sure you want to delete the application '${application.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import { humanFileSize } from '@/utils/readable'
import ApplicationInfoModel from '@/models/ApplicationInfo'
import Modal from '@/components/Modal.vue'
import Card from '@/components/Card.vue'

export default defineComponent({
    breadcrumb: [
        { name: 'Applications', page: 'applications.index' },
        { name: 'Show', page: 'applications.show' },
    ],
    props: {
        application: {
            type: Object as PropType<ApplicationInfoModel>,
            required: true,
        },
    },
    components: { Link, Modal, Card },
    setup({ application }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)

        // data
        const infos = {
            'Name': application.name,
            'Filesystem name': application.filesystem,
            'Mounted name': application.mounted,
            'Used Size': humanFileSize(application.used),
            'Max Size': humanFileSize(application.blocks),
            'Available  Size': humanFileSize(application.available),
        }

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes!.get('applications.destroy', { id: application.slug }))
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
