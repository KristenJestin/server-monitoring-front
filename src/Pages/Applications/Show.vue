<template>
    <Card>
        <template v-slot:title>
            <div class="relative">
                <Title :name="`Application : ${application.name}`"></Title>
                <span class="flex absolute h-3 w-3 top-0 right-0 -mr-4">
                    <span
                        class="absolute inline-flex h-full w-full rounded-full opacity-75"
                        :class="status ? 'animate-ping bg-green-400' : 'bg-red-400'"
                    >
                    </span>
                    <span
                        class="relative inline-flex rounded-full h-3 w-3"
                        :class="status ? 'bg-green-400' : 'bg-red-400'"
                    >
                    </span>
                </span>
            </div>
        </template>
        <template v-slot:title-right-part>
            <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
            <Link
                :href="$routes.get('applications.edit', { id: application.slug })"
                class="btn btn-muted"
                >Edit</Link
            >
        </template>

        <div class="flex items-start">
            <dl class="flex-grow">
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
                    <dd
                        class="mt-1 text-sm sm:mt-0 sm:col-span-2"
                        v-html="value || `<i class='italic text-gray-400'>null</i>`"
                    ></dd>
                </div>
            </dl>
            <img
                :src="$routes.get('applications.image', { id: application.slug, type: 'original' })"
                class="object-contain w-48"
            />
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
import { defineComponent, PropType, ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'
import { DateTime } from 'luxon'
import axios from 'axios'

import { RoutesModule } from '@/plugins/routes/props'
import { humanFileSize } from '@/utils/readable'
import ApplicationModel from '@/models/Application'
import Modal from '@/components/Modal.vue'
import Card from '@/components/Card.vue'
import Title from '@/components/Title.vue'

export default defineComponent({
    breadcrumb: [
        { name: 'Applications', page: 'applications.index' },
        { name: 'Show' },
    ],
    props: {
        application: {
            type: Object as PropType<ApplicationModel>,
            required: true,
        },
    },
    components: { Link, Modal, Card, Title },
    setup({ application }) {
        // variables
        let statusInterval: NodeJS.Timer | undefined = undefined

        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)
        const status = ref(false)
        onMounted(() => {
            axios
                .get($routes!.get('applications.status', { id: application.slug }))
                .then((response) => (status.value = response.data.active))
            statusInterval = setInterval(() => {
                axios
                    .get($routes!.get('applications.status', { id: application.slug }))
                    .then((response) => (status.value = response.data.active))
            }, 10 * 1000)
        })
        onBeforeUnmount(() => {
            if (statusInterval) clearInterval(statusInterval)
        })

        // data
        const infos = {
            'Name': application.name,
            'Port': application.port,
            'Url': application.url,
            'Service': application.service,
            'Website': application.website
                ? `<a href='${application.website}' class='underline'>${application.website}</a>`
                : undefined,
            'Description': application.description?.replace(/\n/g, '<br />'),
            'Created At': `${DateTime.fromISO(
                application.created_at
            ).toRelativeCalendar()}<span class='text-gray-400'> - ${DateTime.fromISO(
                application.created_at
            ).toLocaleString(DateTime.DATETIME_MED)}</span>`,
            'Updated At': `${DateTime.fromISO(
                application.updated_at
            ).toRelativeCalendar()}<span class='text-gray-400'> - ${DateTime.fromISO(
                application.updated_at
            ).toLocaleString(DateTime.DATETIME_MED)}</span>`,
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
            status,
        }
    },
})
</script>
