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
                    <Link href="/states" class="btn btn-muted mr-5">Cancel</Link>
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
import { defineComponent, reactive, PropType } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import Errors from '@/models/Error'
import FormGroup from '@/components/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Tag from '@/components/Tag.vue'

export default defineComponent({
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, Tag },
    setup() {
        const form = reactive({
            name: '',
            color: '',
            textColor: '',
            borderColor: '',
        })

        const submit = () => {
            Inertia.post('/states', form)
        }

        return { form, submit }
    },
})
</script>
