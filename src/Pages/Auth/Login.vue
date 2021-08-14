<template>
    <Card title="Login">
        <div class="mb-5" v-if="errors"><ErrorMessage :message="errors['global'][0]" /></div>
        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Email" name="email" />
                <Input name="email" v-model="form.email" :errors="errors?.email" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Password" name="password" />
                <Input
                    name="password"
                    v-model="form.password"
                    type="password"
                    :errors="errors?.password"
                />
            </FormGroup>
            <FormGroup>
                <InputCheckbox
                    name="rememberMe"
                    label="Remember Me"
                    v-model="form.rememberMe"
                    :errors="errors?.rememberMe"
                />
            </FormGroup>

            <div class="flex mt-6">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import useBreadcrumb from '@/composables/useBreadcrumb'
import { RoutesModule } from '@/plugins/routes/props'
import Card from '@/components/Card.vue'
import Errors from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import InputCheckbox from '@/components/forms/InputCheckbox.vue'

export default defineComponent({
    props: {
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
        redirect: {
            type: String,
            required: false,
        },
    },
    components: { Card, FormGroup, ErrorMessage, Input, FormLabel, InputCheckbox },
    setup(props) {
        // refs
        useBreadcrumb({ name: 'Auth' }, { name: 'Login' })
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{
            email: string
            password: string
            rememberMe: boolean
            redirect: string | null
        }>({
            email: '',
            password: '',
            rememberMe: false,
            redirect: props.redirect || null,
        })

        // methods
        const submit = () => {
            Inertia.post($routes!.get('auth.login'), form)
        }

        // return
        return {
            form,
            submit,
        }
    },
})
</script>
