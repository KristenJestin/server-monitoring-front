<template>
    <div class="mb-2" v-if="errors"><ErrorMessage /></div>

    <div class="mt-10">
        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Name" name="name" />
                <Input :form="form" name="name" :errors="errors?.name" />
                <FormError :errors="errors?.name" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Tags" name="tags" />
                <Dropdown
                    :form="form"
                    name="tags"
                    :errors="errors?.tags"
                    :options="
                        tags.map((tag) => ({
                            label: tag.name,
                            value: tag.name,
                            color: tag.color,
                            textColor: tag.text_color,
                        }))
                    "
                />
                <FormError :errors="errors?.tags" />
            </FormGroup>

            <div class="mt-6">
                <Link :href="$routes.get('documents.index')" class="btn btn-muted mr-5"
                    >Cancel</Link
                >
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, reactive, inject, computed } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

import { RoutesModule } from '@/plugins/routes/props'
import TagModel from '@/models/Tag'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup2.vue'
import Dropdown from '@/components/forms/DropdownMultiple.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

export default defineComponent({
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
        tags: {
            type: Object as PropType<TagModel[]>,
            required: true,
        },
    },
    components: {
        Link,
        FormGroup,
        Dropdown,
        Input,
        FormLabel,
        FormError,
        ErrorMessage,
        CheckIcon,
        SelectorIcon,
    },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive({
            name: '',
            tags: [],
        })

        // methods
        const submit = () => {
            Inertia.post($routes?.get('documents.store') || '', form)
        }

        // return
        return {
            form,
            submit,
        }
    },
})
</script>
