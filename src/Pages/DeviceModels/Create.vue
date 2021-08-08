<template>
    <Card title="Create new Model">
        <div class="mb-5" v-if="errors"><ErrorMessage /></div>

        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Name" name="name" />
                <Input name="name" v-model="form.name" :errors="errors?.name" />
                <FormError :errors="errors?.name" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Icon" name="icon" />
                <InputDropdown
                    name="icon"
                    mode="single"
                    v-model="form.icon"
                    :errors="errors?.icon"
                    :options="icons"
                />
                <FormError :errors="errors?.icon" />
            </FormGroup>

            <div class="flex mt-6">
                <div>
                    <Link :href="$routes.get('devices_models.index')" class="btn btn-muted mr-5">
                        Cancel
                    </Link>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import { icons } from './icons'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'
import InputDropdown from '@/components/forms/InputDropdown.vue'
import Card from '@/components/Card.vue'

export default defineComponent({
    breadcrumb: [
        { name: 'Devices', page: 'devices.index' },
        { name: 'Models', page: 'devices_models.index' },
        { name: 'Create' },
    ],
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, FormLabel, FormError, Input, InputDropdown, Card },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{ name: string; icon: string }>({
            name: '',
            icon: '',
        })

        // methods
        const submit = () => {
            Inertia.post($routes!.get('devices_models.store'), form)
        }

        // return
        return {
            form,
            icons,
            submit,
        }
    },
})
</script>
