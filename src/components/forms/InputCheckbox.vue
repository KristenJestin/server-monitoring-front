<template>
    <label :for="id" class="flex items-center space-x-3">
        <input
            :id="id"
            :name="'form.' + name"
            type="checkbox"
            class="
                transition-colors
                duration-300
                ease-in-out
                form-tick
                appearance-none
                h-5
                w-5
                border border-gray-300
                rounded-md
                hover:border-primary-500
                checked:bg-primary-500 checked:border-transparent
                focus:outline-none
            "
            :class="errors ? 'ring-2 ring-red-500' : ''"
            value="true"
            @input="onInput"
        />
        <span
            class="
                block
                text-gray-600
                transition
                duration-500
                ease-in-out
                dark:text-gray-300
                text-sm text-left
                font-bold
            "
        >
            {{ label }}
        </span>
    </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Boolean as PropType<boolean>,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    setup({ name }, { emit }) {
        const onInput = (event: any) => {
            const target = event.target
            emit('update:modelValue', target.checked)
        }

        return {
            id: 'form-' + name,
            onInput,
        }
    },
})
</script>

<style>
.form-tick:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
}
</style>
