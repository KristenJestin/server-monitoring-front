<template>
    <div class="mb-2" v-if="errors"><ErrorMessage /></div>

    <div class="mt-10">
        <form @submit.prevent="submit">
            <div class="grid grid-cols-1 divide-y-2 divide-gray-300">
                <div>
                    <FormGroup>
                        <FormLabel label="Name" name="name" />
                        <Input name="name" v-model="form.name" :errors="errors?.name" />
                        <FormError :errors="errors?.name" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel label="Tags" name="tags" />
                        <InputDropdownMultiple
                            name="tags"
                            mode="tags"
                            v-model="form.tags"
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
                    <FormGroup>
                        <FormLabel label="File" name="file" />
                        <InputFile v-model="form.file" name="file" :errors="errors?.file" />
                        <FormError :errors="errors?.file" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel label="Notes" name="notes" />
                        <InputMarkdown v-model="form.notes" name="notes" :errors="errors?.notes" />
                        <FormError :errors="errors?.notes" />
                    </FormGroup>
                </div>

                <div class="pt-3">
                    <FormGroup>
                        <FormLabel label="Reception date" name="receivedAt" />
                        <InputDate
                            v-model="form.receivedAt"
                            name="receivedAt"
                            :errors="errors?.receivedAt"
                            :max="new Date()"
                        />
                        <FormError :errors="errors?.receivedAt" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel label="Amount" name="amount" />
                        <InputCurrency
                            v-model="form.amount"
                            name="amount"
                            :errors="errors?.amount"
                        />
                        <FormError :errors="errors?.amount" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel label="Duration (in months)" name="duration" />
                        <Input
                            name="duration"
                            v-model="form.duration"
                            type="number"
                            :errors="errors?.duration"
                        />
                        <FormError :errors="errors?.duration" />
                    </FormGroup>
                </div>
            </div>

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
import { defineComponent, PropType, reactive, inject, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link, useForm } from '@inertiajs/inertia-vue3'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'
import { addMonths, differenceInMonths } from 'date-fns'

import { RoutesModule } from '@/plugins/routes/props'
import TagModel from '@/models/Tag'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import InputDropdownMultiple from '@/components/forms/InputDropdown.vue'
import Input from '@/components/forms/Input.vue'
import InputFile from '@/components/forms/InputFile.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import InputMarkdown from '@/components/forms/InputMarkdown.vue'
import InputDate from '@/components/forms/InputDate.vue'
import InputCurrency from '@/components/forms/InputCurrency.vue'
import InputSlider from '@/components/forms/InputSlider.vue'

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
        InputDropdownMultiple,
        Input,
        FormLabel,
        FormError,
        ErrorMessage,
        CheckIcon,
        SelectorIcon,
        InputFile,
        InputMarkdown,
        InputDate,
        InputCurrency,
        InputSlider,
    },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')

        const form = reactive<{
            name: string
            tags: string[]
            file?: File
            notes: string
            receivedAt?: Date
            amount?: number
            duration: number | string
        }>({
            name: '',
            tags: [],
            file: undefined,
            notes: '',
            receivedAt: new Date(),
            amount: undefined,
            duration: '',
        })

        // methods
        const submit = () => {
            Inertia.post($routes?.get('documents.store') || '', form, {
                forceFormData: true,
            })
        }

        // return
        return {
            form,
            submit,
        }
    },
})
</script>
