<template>
    <Card :title="`Edit Drive : ${drive.name}`">
        <div class="mb-5" v-if="errors"><ErrorMessage /></div>

        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Name" name="name" />
                <Input name="name" v-model="form.name" :errors="errors?.name" />
                <FormError :errors="errors?.name" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Filesystem" name="mounted" />
                <InputDropdown
                    name="mounted"
                    mode="single"
                    v-model="form.mounted"
                    :errors="errors?.mounted"
                    :options="
                        mounteds.map((mounted) => ({
                            label: mounted,
                            value: mounted,
                        }))
                    "
                />
                <FormError :errors="errors?.mounted" />
            </FormGroup>

            <div class="flex mt-6">
                <div>
                    <Link
                        :href="$routes.get('drives.show', { id: drive.slug })"
                        class="btn btn-muted mr-5"
                        >Cancel</Link
                    >
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
import DriveModel from '@/models/Drive'
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
        { name: 'Drives', page: 'drives.index' },
        { name: 'Edit', page: 'drives.edit' },
    ],
    props: {
        drive: {
            type: Object as PropType<DriveModel>,
            required: true,
        },
        mounteds: {
            type: Array as PropType<string[]>,
            default: [],
        },
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, FormLabel, FormError, Input, InputDropdown, Card },
    setup({ drive }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{ name: string; mounted: string }>({
            name: drive.name,
            mounted: drive.mounted,
        })

        // methods
        const submit = () => {
            Inertia.put($routes!.get('drives.update', { id: drive.slug }) || '', form)
        }

        // return
        return { form, submit }
    },
})
</script>
