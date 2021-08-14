<template>
    <Card>
        <template v-slot:title>
            <div class="relative">
                <Title :name="`Application : ${application.name}`"></Title>
                <span class="flex absolute h-3 w-3 top-0 right-0 -mr-4" v-if="application.service">
                    <span
                        class="absolute inline-flex h-full w-full rounded-full opacity-75"
                        :class="status ? 'animate-ping bg-green-400' : 'bg-red-400'"
                    ></span>
                    <span
                        class="relative inline-flex rounded-full h-3 w-3"
                        :class="status ? 'bg-green-400' : 'bg-red-400'"
                    ></span>
                </span>
            </div>
        </template>
        <template v-slot:title-right-part>
            <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
            <Link
                :href="$routes.get('applications.edit', { id: application.slug })"
                class="btn btn-muted"
            >
                Edit
            </Link>
        </template>

        <div class="flex items-start">
            <dl class="flex-grow">
                <DetailsTable name="Name">{{ application.name }}</DetailsTable>
                <DetailsTable name="Port">{{ application.port }}</DetailsTable>
                <DetailsTable name="Url">
                    <span v-if="application.url">{{ application.url }}</span>
                </DetailsTable>
                <DetailsTable name="Service">{{ application.service }}</DetailsTable>
                <DetailsTable name="Website">
                    <a v-if="application.website" href="{{application.website}}" class="underline">
                        {{ application.website }}
                    </a>
                </DetailsTable>
                <DetailsTable name="Description">
                    <span v-if="application.description">{{ application.description }}</span>
                </DetailsTable>
                <DetailsTable name="Created At">
                    <RelativeDate :date="application.created_at"></RelativeDate>
                </DetailsTable>
                <DetailsTable name="Updted At">
                    <RelativeDate :date="application.updated_at"></RelativeDate>
                </DetailsTable>
            </dl>

            <div class="flex flex-col items-center justify-center">
                <div class="w-48">
                    <img
                        :src="
                            $routes.get('applications.image', {
                                id: application.slug,
                                type: 'original',
                            })
                        "
                        class="object-contain w-full"
                    />
                </div>

                <span class="mt-5">
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
import axios from 'axios'
import { ExternalLinkIcon } from '@heroicons/vue/solid'

import useBreadcrumb from '@/composables/useBreadcrumb'
import { buildApplicationUrl as buildUrl } from '@/utils/url'
import { RoutesModule } from '@/plugins/routes/props'
import ApplicationModel from '@/models/Application'
import Modal from '@/components/Modal.vue'
import Card from '@/components/Card.vue'
import Title from '@/components/Title.vue'
import DetailsTable from '@/components/DetailsTable.vue'
import RelativeDate from '@/components/RelativeDate.vue'

export default defineComponent({
    props: {
        application: {
            type: Object as PropType<ApplicationModel>,
            required: true,
        },
    },
    components: { Link, Modal, Card, Title, ExternalLinkIcon, DetailsTable, RelativeDate },
    setup({ application }) {
        // variables
        let statusInterval: NodeJS.Timer | undefined = undefined

        // refs
        useBreadcrumb({ name: 'Applications', page: 'applications.index' }, { name: 'Show' })
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)
        const status = ref(false)
        onMounted(() => {
            if (!application.service) return

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
            status,
            buildUrl,
        }
    },
})
</script>
