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
                        name="borderColor"
                        label="Border Color"
                        :errors="errors?.borderColor"
                    />
                </div>
                <div class="flex-none">
                    <div
                        class="ml-6 h-10 w-10 shadow-md rounded-lg"
                        :style="{ backgroundColor: form.borderColor }"
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
                    <Link :href="$routes.get('states.index')" class="btn btn-muted mr-5"
                        >Cancel</Link
                    >
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <div class="ml-auto">
                    <Tag
                        :name="form.name"
                        :background-color="form.color"
                        :border-color="form.borderColor"
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
import StateModel from '@/models/State'
import ErrorsModel from '@/models/Error'
import FormGroup from '@/components/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Tag from '@/components/Tag.vue'

export default defineComponent({
    props: {
        state: {
            type: Object as PropType<StateModel>,
            required: true,
        },
        errors: {
            type: Object as PropType<ErrorsModel>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, Tag },
    setup({ state }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        // data
        const form = reactive({
            name: state.name,
            color: state.color,
            textColor: state.text_color,
            borderColor: state.border_color,
        })

        // methods
        const submit = () => {
            Inertia.put($routes?.get('states.update', { id: state.slug }) || '', form)
        }

        // return
        return { form, submit }
    },
})
</script>
