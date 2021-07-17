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
                <FormLabel label="State" name="state" />
                <Dropdown
                    :form="form"
                    name="state"
                    :errors="errors?.state"
                    :options="states"
                    idProperty="slug"
                    extra-style-background-color="color"
                    extra-style-text-color="text_color"
                />
                <FormError :errors="errors?.state" />
            </FormGroup>

            <div class="mt-6">
                <Link :href="$routes.get('projects.index')" class="btn btn-muted mr-5">Cancel</Link>
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
import StateModel from '@/models/State'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup2.vue'
import Dropdown from '@/components/forms/Dropdown.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import FormLabel1 from '@/components/forms/FormLabel.vue'

export default defineComponent({
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
        states: {
            type: Object as PropType<StateModel[]>,
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
    setup({ states }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive({
            name: '',
            state: '',
        })
        const stateDropdownOpen = ref(false)
        const selectedState = computed<StateModel | undefined>(() =>
            states.find((s) => s.slug === form.state)
        )

        // methods
        const submit = () => {
            Inertia.post($routes?.get('projects.store') || '', form)
        }

        const selectState = (state: StateModel) => {
            form.state = state.slug
            stateDropdownOpen.value = false
        }

        const isStateSelected = (state: StateModel) => state.slug === form.state

        // return
        return {
            form,
            submit,
            stateDropdownOpen,
            selectedState,
            selectState,
            isStateSelected,
        }
    },
})
</script>
