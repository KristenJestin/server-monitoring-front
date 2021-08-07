<template>
    <Card :title="`Edit Device : ${device.display_name || device.name}`">
        <div class="mb-5" v-if="errors"><ErrorMessage /></div>

        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Name" name="name" />
                <Input name="name" v-model="form.name" :errors="errors?.name" />
                <FormError :errors="errors?.name" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Model" name="model" />
                <InputDropdown
                    name="model"
                    mode="single"
                    v-model="form.model"
                    :errors="errors?.model"
                    :options="
                        models.map((model) => ({
                            label: model.name,
                            value: model.id,
                            /* TODO: do not use object components to send icon */
                            /* @ts-ignore */
                            icon: iconComponents[model.icon + 'Icon'],
                        }))
                    "
                />
                <FormError :errors="errors?.model" />
            </FormGroup>

            <div class="flex mt-6">
                <div>
                    <Link :href="$routes.get('devices.index')" class="btn btn-muted mr-5"
                        >Cancel</Link
                    >
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="ml-auto">
                    <button class="btn btn-danger" type="button" @click="deleteButtonPress">
                        Delete
                    </button>
                </div>
            </div>
        </form>
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
import { defineComponent, PropType, reactive, inject, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import { iconComponents } from '@/Pages/DeviceModels/icons'
import DeviceModel from '@/models/Device'
import DeviceModelModel from '@/models/DeviceModel'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'
import InputDropdown from '@/components/forms/InputDropdown.vue'
import Card from '@/components/Card.vue'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Devices', page: 'devices.index' }, { name: 'Edit' }],
    props: {
        device: {
            type: Object as PropType<DeviceModel>,
            required: true,
        },
        models: {
            type: Array as PropType<DeviceModelModel[]>,
            required: true,
        },
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: {
        Link,
        FormGroup,
        ErrorMessage,
        FormLabel,
        FormError,
        Input,
        InputDropdown,
        Card,
        Modal,
    },
    setup({ device }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)
        const form = reactive<{ name: string; model?: string }>({
            name: device.display_name,
            model: device.model_id,
        })

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const submit = () => {
            Inertia.put($routes!.get('devices.update', { id: device.slug }), form)
        }
        const destroy = () => {
            Inertia.delete($routes!.get('devices.destroy', { id: device.slug }))
        }

        // return
        return {
            form,
            submit,
            destroy,
            deleteButtonPress,
            modalOpen,
            iconComponents,
        }
    },
})
</script>
