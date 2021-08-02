<template>
    <Card title="Create new Drive">
        <div class="mb-2" v-if="errors"><ErrorMessage /></div>

        <div class="mt-10">
            <form @submit.prevent="submit">
                <FormGroup>
                    <FormLabel label="Name" name="name" />
                    <Input name="name" v-model="form.name" :errors="errors?.name" />
                    <FormError :errors="errors?.name" />
                </FormGroup>
                <FormGroup>
                    <FormLabel label="Filesystem" name="filesystem" />
                    <InputDropdown
                        name="folderId"
                        mode="single"
                        v-model="form.filesystem"
                        :errors="errors?.filesystem"
                        :options="
                            filesystems.map((filesystem) => ({
                                label: filesystem,
                                value: filesystem,
                            }))
                        "
                    />
                    <FormError :errors="errors?.filesystem" />
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
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
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
        { name: 'Create', page: 'drives.create' },
    ],
    props: {
        filesystems: {
            type: Array as PropType<string[]>,
            default: [],
        },
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, FormLabel, FormError, Input, InputDropdown, Card },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{ name: string; filesystem: string }>({
            name: '',
            filesystem: '',
        })

        // methods
        const submit = () => {
            Inertia.post($routes!.get('drives.store'), form)
        }

        // return
        return { form, submit }
    },
})
</script>
