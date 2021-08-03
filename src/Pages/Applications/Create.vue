<template>
    <Card title="Create new Application">
        <div class="mb-5" v-if="errors"><ErrorMessage /></div>

        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Name" name="name" />
                <Input name="name" v-model="form.name" :errors="errors?.name" />
                <FormError :errors="errors?.name" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Port" name="port" />
                <Input name="port" v-model="form.port" type="number" :errors="errors?.port" />
                <FormError :errors="errors?.port" />
            </FormGroup>
            <div class="flex mb-5 items-end">
                <div class="flex-1">
                    <FormGroup :margin="false">
                        <FormLabel label="Image" name="imageFile" />
                        <InputFile
                            v-model="form.imageFile"
                            name="image"
                            :errors="errors?.imageFile"
                        />
                        <FormError :errors="errors?.imageFile" />
                    </FormGroup>
                </div>
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
                            dark:border-primary-100
                        "
                    />
                </div>
            </div>

            <div class="flex mt-6">
                <div>
                    <Link :href="$routes.get('applications.index')" class="btn btn-muted mr-5"
                        >Cancel</Link
                    >
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

export default defineComponent({
    breadcrumb: [
        { name: 'Applications', page: 'applications.index' },
        { name: 'Create', page: 'applications.create' },
    ],
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
    },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{ name: string; port?: number; imageFile?: File }>({
            name: '',
            port: undefined,
            imageFile: undefined,
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
