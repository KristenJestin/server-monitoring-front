<template>
    <Card title="Create new Application">
        <div class="mb-5" v-if="errors"><ErrorMessage /></div>

        <form @submit.prevent="submit">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 mb-0 md:mb-5">
                <FormGroup class="col-span-2 md:mb-0">
                    <FormLabel label="Name" name="name" />
                    <Input name="name" v-model="form.name" :errors="errors?.name" />
                    <FormError :errors="errors?.name" />
                </FormGroup>
                <FormGroup class="md:mb-0">
                    <FormLabel label="Service" name="service" />
                    <Input name="service" v-model="form.service" :errors="errors?.service" />
                    <FormError :errors="errors?.service" />
                </FormGroup>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 mb-0 md:mb-5">
                <FormGroup class="md:mb-0">
                    <FormLabel label="Port" name="port" />
                    <Input name="port" v-model="form.port" type="number" :errors="errors?.port" />
                    <FormError :errors="errors?.port" />
                </FormGroup>
                <FormGroup class="col-span-2 md:mb-0">
                    <FormLabel label="Url" name="url" />
                    <Input name="url" v-model="form.url" :errors="errors?.url" />
                    <FormError :errors="errors?.url" />
                </FormGroup>
            </div>

            <div class="flex mb-5 items-center">
                <FormGroup :margin="false" class="flex-1">
                    <FormLabel label="Image" name="imageFile" />
                    <InputFile v-model="form.imageFile" name="image" :errors="errors?.imageFile" />
                    <FormError :errors="errors?.imageFile" />
                </FormGroup>
                <div v-if="form.imageFile" class="ml-6">
                    <img
                        :src="imageUrl"
                        class="
                            object-cover
                            h-14
                            w-14
                            rounded-full
                            shadow-2xl
                            border-2 border-primary-900
                            transition
                            duration-500
                            ease-in-out
                            dark:border-primary-100
                        "
                    />
                </div>
            </div>

            <FormGroup>
                <FormLabel label="Website" name="website" />
                <Input name="website" v-model="form.website" :errors="errors?.website" />
                <FormError :errors="errors?.website" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Description" name="description" />
                <InputTextArea
                    name="description"
                    v-model="form.description"
                    :errors="errors?.description"
                />
                <FormError :errors="errors?.description" />
            </FormGroup>

            <div class="flex mt-6">
                <div>
                    <Link :href="$routes.get('applications.index')" class="btn btn-muted mr-5">
                        Cancel
                    </Link>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, computed, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import Card from '@/components/Card.vue'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'
import InputDropdown from '@/components/forms/InputDropdown.vue'
import InputFile from '@/components/forms/InputFile.vue'
import InputTextArea from '@/components/forms/InputTextArea.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Applications', page: 'applications.index' }, { name: 'Create' }],
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: {
        Card,
        Link,
        FormGroup,
        ErrorMessage,
        FormLabel,
        FormError,
        Input,
        InputDropdown,
        InputFile,
        InputTextArea,
    },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{
            name: string
            service?: string
            port?: number
            url?: string
            imageFile?: File
            website?: string
            description?: string
        }>({
            name: '',
            service: undefined,
            port: undefined,
            url: undefined,
            imageFile: undefined,
            website: undefined,
            description: undefined,
        })
        const imageUrl = computed(() => form.imageFile && URL.createObjectURL(form.imageFile))

        // methods
        const submit = () => {
            Inertia.post($routes!.get('applications.store'), form)
        }

        // return
        return {
            form,
            submit,
            imageUrl,
        }
    },
})
</script>
