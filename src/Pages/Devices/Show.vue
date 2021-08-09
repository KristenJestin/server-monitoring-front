<template>
    <Card :title="`Device : ${device.name}`">
        <template v-slot:title-right-part>
            <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
            <Link
                :href="$routes.get('devices.deactivate', { id: device.slug })"
                method="patch"
                class="btn btn-danger-light mr-4"
            >
                {{ !device.deactivated_at ? 'Deactivate' : 'Reactivate' }}
            </Link>
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
            <DetailsTable name="Status">
                <Status
                    :status="device.status"
                    :connection-date="device.connection_updated_at"
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
import { defineComponent, PropType, ref, inject, onMounted } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'
import axios from 'axios'
import { DateTime } from 'luxon'

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
    breadcrumb: [{ name: 'Devices', page: 'devices.index' }, { name: 'Show' }],
    props: {
        device: {
            type: Object as PropType<DeviceModel>,
            required: true,
        },
    },
    components: { Link, Modal, Card, DetailsTable, RelativeDate, Status, Uptime, Title },
    setup({ device }) {
        // data
        const now = DateTime.now()

        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)
        const uptime = ref<DeviceUptimeModel[]>([])
        onMounted(() => {
            axios
                .get<DeviceUptimeModel[]>($routes!.get('devices.uptime', { id: device.slug }))
                .then((response) => (uptime.value = response.data))
        })

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes!.get('devices.destroy', { id: device.slug }))
        }

        // return
        return {
            destroy,
            deleteButtonPress,
            modalOpen,
            uptime,
            now,
        }
    },
})
</script>
