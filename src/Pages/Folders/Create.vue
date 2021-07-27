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
                <FormLabel label="Color" name="color" />
                <div class="flex items-center">
                    <div class="flex-grow">
                        <Input name="color" v-model="form.color" :errors="errors?.color" />
                    </div>

                    <div class="flex-none">
                        <div
                            class="ml-6 h-10 w-10 shadow-md rounded-lg"
                            :style="{ backgroundColor: form.color }"
                        ></div>
                    </div>
                </div>
                <FormError :errors="errors?.color" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Parent" name="parent_id" />
                <InputDropdown
                    name="parent_id"
                    mode="single"
                    v-model="form.parentId"
                    :errors="errors?.parent_id"
                    :options="
                        folders.map((folder) => ({
                            label: folder.name,
                            value: folder.id,
                        }))
                    "
                />
                <FormError :errors="errors?.parent_id" />
            </FormGroup>

            <div class="mt-6">
                <Link :href="$routes.get('folders.index')" class="btn btn-muted mr-5">Cancel</Link>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import InputDropdown from '@/components/forms/InputDropdown.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import FolderModel from '@/models/Folder'

export default defineComponent({
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
        folders: {
            type: Object as PropType<FolderModel[]>,
            default: [],
        },
    },
    components: {
        Link,
        FormGroup,
        ErrorMessage,
        Input,
        FormLabel,
        FormError,
        InputDropdown,
    },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{
            name: string
            color?: string
            parentId?: string
        }>({
            name: '',
            color: '',
            parentId: undefined,
        })

        // methods
        const submit = () => {
            Inertia.post($routes?.get('folders.store') || '', form)
        }

        // return
        return { form, submit }
    },
})
</script>
