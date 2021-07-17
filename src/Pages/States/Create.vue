<template>
    <Link href="/states" class="btn">Home</Link>
    <div class="my-5" v-if="errors">
        <div class="w-full text-white bg-red-500">
            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                <div class="flex">
                    <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                        <path
                            d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
                        ></path>
                    </svg>

                    <p class="mx-3">Validation Error.</p>
                </div>

                <!-- <button
                    class="
                        p-1
                        transition-colors
                        duration-200
                        transform
                        rounded-md
                        hover:bg-opacity-25 hover:bg-gray-600
                        focus:outline-none
                    "
                >
                    <svg
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 18L18 6M6 6L18 18"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button> -->
            </div>
        </div>
    </div>

    <div class="mt-10">
        <form @submit.prevent="submit">
            <FormGroup :form="form" name="name" label="Name" :errors="errors?.name" />

            <div class="form-group">
                <label for="form-color" class="label">Background Color</label>
                <input
                    id="form-color"
                    type="text"
                    class="input"
                    :class="errors?.color ? 'input-error' : ''"
                    v-model="form.color"
                />
                <span v-if="errors?.color" class="font-light text-sm text-red-600">{{
                    errors.color[0]
                }}</span>
            </div>

            <div class="form-group">
                <label for="form-border-color" class="label">Border Color</label>
                <input
                    id="form-border-color"
                    type="text"
                    class="input"
                    :class="errors?.borderColor ? 'input-error' : ''"
                    v-model="form.borderColor"
                />
                <span v-if="errors?.borderColor" class="font-light text-sm text-red-600">{{
                    errors.borderColor[0]
                }}</span>
            </div>

            <div class="form-group">
                <label for="form-textc-color" class="label">Text Color</label>
                <input
                    id="form-textc-color"
                    type="text"
                    class="input"
                    :class="errors?.textColor ? 'input-error' : ''"
                    v-model="form.textColor"
                />
                <span v-if="errors?.textColor" class="font-light text-sm text-red-600">{{
                    errors.textColor[0]
                }}</span>
            </div>

            <button type="submit" class="btn">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import Errors from '@/models/Error'
import FormGroup from '@/components/FormGroup.vue'

export default defineComponent({
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: { Link, FormGroup },
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
