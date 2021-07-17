<template>
    <div class="mb-5">
        <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
        <input
            :id="id"
            :name="'form.' + name"
            :type="type"
            class="
                flex-1
                appearance-none
                w-full
                bg-white
                text-gray-700
                placeholder-gray-400
                border
                rounded-lg
                shadow-md
                px-4
                py-2
                text-left text-base
                focus:outline-none focus:ring-2 focus:ring-primary-500
                sm:text-sm
            "
            :class="errors ? 'ring-2 ring-red-500' : ''"
            v-model="form[name]"
        />
        <span v-if="errors" class="font-light text-sm text-red-600">{{ errors[0] }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

export default defineComponent({
    props: {
        form: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    setup({ name }) {
        return {
            id: 'form-' + name,
        }
    },
})
</script>
