<template>
    <div class="mb-2" v-if="errors"><ErrorMessage /></div>

    <div class="mt-10">
        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Name" name="name" />
                <Input name="name" v-model="form.name" :errors="errors?.name" />
                <FormError :errors="errors?.name" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Size" name="size" />
                <Input name="size" v-model="form.size" type="number" :errors="errors?.size" />
                <FormError :errors="errors?.size" />
            </FormGroup>

            <div class="flex mt-6">
                <div>
                    <Link :href="$routes.get('drives.index')" class="btn btn-muted mr-5"
                        >Cancel</Link
                    >
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { Inertia } from '@inertiajs/inertia'

import { RoutesModule } from '@/plugins/routes/props'
import DriveModel from '@/models/Drive'
import ErrorsModel from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'

export default defineComponent({
    props: {
        drive: {
            type: Object as PropType<DriveModel>,
            required: true,
        },
        errors: {
            type: Object as PropType<ErrorsModel>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, FormLabel, FormError, Input },
    setup({ drive }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive({
            name: drive.name,
            size: drive.size,
        })

        // methods
        const submit = () => {
            Inertia.put($routes?.get('drives.update', { id: drive.slug }) || '', form)
        }

        // return
        return { form, submit }
    },
})
</script>
