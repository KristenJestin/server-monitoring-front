<template>
    <div class="mb-2" v-if="errors"><ErrorMessage /></div>

    <div class="mt-10">
        <form @submit.prevent="submit">
            <FormGroup :form="form" name="name" label="Name" :errors="errors?.name" />

            <div class="flex items-center">
                <div class="flex-grow">
                    <FormGroup
                        :form="form"
                        name="color"
                        label="Background Color"
                        :errors="errors?.color"
                    />
                </div>
                <div class="flex-none">
                    <div
                        class="ml-6 h-10 w-10 shadow-md rounded-lg"
                        :style="{ backgroundColor: form.color }"
                    ></div>
                </div>
            </div>

            <div class="flex items-center">
                <div class="flex-grow">
                    <FormGroup
                        :form="form"
                        name="textColor"
                        label="Text Color"
                        :errors="errors?.textColor"
                    />
                </div>
                <div class="flex-none">
                    <div
                        class="ml-6 h-10 w-10 shadow-md rounded-lg"
                        :style="{ backgroundColor: form.textColor }"
                    ></div>
                </div>
            </div>

            <div class="flex mt-6">
                <div>
                    <Link :href="$routes.get('tags.index')" class="btn btn-muted mr-5">Cancel</Link>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="ml-auto">
                    <Tag
                        :name="form.name"
                        :background-color="form.color"
                        :text-color="form.textColor"
                    />
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
import TagModel from '@/models/Tag'
import ErrorsModel from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Tag from '@/components/Tag.vue'

export default defineComponent({
    props: {
        tag: {
            type: Object as PropType<TagModel>,
            required: true,
        },
        errors: {
            type: Object as PropType<ErrorsModel>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, Tag },
    setup({ tag }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive({
            name: tag.name,
            color: tag.color,
            textColor: tag.text_color,
        })

        // methods
        const submit = () => {
            Inertia.put($routes?.get('tags.update', { id: tag.slug }) || '', form)
        }

        // return
        return { form, submit }
    },
})
</script>
