<template>
    <Card :title="`Device : ${device.name}`">
        <template v-slot:title-right-part>
            <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
            <button class="btn btn-danger-light mr-4" @click="deactivateButtonPress">
                {{ !device.deactivated_at ? 'Deactivate' : 'Reactivate' }}
            </button>
            <Link :href="$routes.get('devices.edit', { id: device.slug })" class="btn btn-muted">
                Edit
            </Link>
        </template>

        <dl>
            <DetailsTable name="Device Id">{{ device.device }}</DetailsTable>
            <DetailsTable name="Name">
                <span>{{ device.name }}</span>
                <span class="ml-3 text-gray-400">/{{ device.slug }}</span>
            </DetailsTable>
            <DetailsTable name="Display Name">
                <span v-if="device.display_name">{{ device.display_name }}</span>
            </DetailsTable>
            <DetailsTable name="OS">
                <span v-if="device.os">{{ device.os }}</span>
            </DetailsTable>
            <DetailsTable name="OS Version">
                <span v-if="device.os_version">{{ device.os_version }}</span>
            </DetailsTable>
            <DetailsTable name="Api Key">
                <div class="flex items-center">
                    <div class="flex-grow">
                        <span v-if="device.api_key">{{ device.api_key }}</span>
                        <i v-else class="italic text-gray-400">null</i>
                    </div>

                    <button @click="regenerateApiKeyButtonClick" class="btn btn-muted">
                        Regenerate
                    </button>
                </div>
            </DetailsTable>
            <DetailsTable name="Status">
                <Status
                    :status="device.status"
                    :connection-date="device.connection_updated_at"
                    :alive-date="device.alive_updated_at"
                    :tooltip="false"
                ></Status>
            </DetailsTable>
            <DetailsTable name="Last Connection Updated At">
                <RelativeDate
                    v-if="device.connection_updated_at"
                    :date="device.connection_updated_at"
                ></RelativeDate>
            </DetailsTable>
            <DetailsTable name="Deactivate At">
                <RelativeDate
                    v-if="device.deactivated_at"
                    :date="device.deactivated_at"
                ></RelativeDate>
            </DetailsTable>

            <DetailsTable name="Created At">
                <RelativeDate :date="device.created_at"></RelativeDate>
            </DetailsTable>
            <DetailsTable name="Updted At">
                <RelativeDate :date="device.updated_at"></RelativeDate>
            </DetailsTable>
        </dl>

        <div class="my-5">
            <Link :href="$routes.get('devices.drives', { id: device.slug })" class="btn btn-muted">
                Drives
            </Link>
        </div>

        <div class="mt-10">
            <div class="mb-2">
                <Title name="Uptime of day" size="text-xl" class="mb-0"></Title>
            </div>
            <div class="flex items-center">
                <Uptime :dates="uptime"></Uptime>
            </div>
        </div>
    </Card>

    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete Device"
        :message="`Are you sure you want to delete the device '${device.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject, onMounted, toRefs } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'
import axios from 'axios'
import { DateTime } from 'luxon'

import useBreadcrumb from '@/composables/useBreadcrumb'
import { RoutesModule } from '@/plugins/routes/props'
import DeviceModel from '@/models/Device'
import DeviceUptimeModel from '@/models/partials/DeviceUptime'
import Modal from '@/components/Modal.vue'
import Card from '@/components/Card.vue'
import DetailsTable from '@/components/DetailsTable.vue'
import RelativeDate from '@/components/RelativeDate.vue'
import Status from './components/Status.vue'
import Uptime from '@/components/Uptime.vue'
import Title from '@/components/Title.vue'

export default defineComponent({
    props: {
        device: {
            type: Object as PropType<DeviceModel>,
            required: true,
        },
    },
    components: { Link, Modal, Card, DetailsTable, RelativeDate, Status, Uptime, Title },
    setup(props) {
        // data
        const now = DateTime.now()

        // refs
        const { device } = toRefs(props)
        useBreadcrumb({ name: 'Devices', page: 'devices.index' }, { name: device.value.name })
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)
        const uptime = ref<DeviceUptimeModel[]>([])
        onMounted(() => {
            axios
                .get<DeviceUptimeModel[]>($routes!.get('devices.uptime', { id: device.value.slug }))
                .then((response) => (uptime.value = response.data))
        })

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes!.get('devices.destroy', { id: device.value.slug }))
        }
        const deactivateButtonPress = () => {
            Inertia.patch($routes!.get('devices.deactivate', { id: device.value.slug }))
        }
        const regenerateApiKeyButtonClick = async () => {
            try {
                const result = await axios.patch<{ key: string }>(
                    $routes!.get('devices.regenerateApiKey', { id: device.value.slug })
                )
                device.value.api_key = result.data.key
            } catch {
                alert('Error when regenerating api key')
            }
        }

        // return
        return {
            destroy,
            deleteButtonPress,
            deactivateButtonPress,
            modalOpen,
            uptime,
            now,
            regenerateApiKeyButtonClick,
        }
    },
})
</script>
