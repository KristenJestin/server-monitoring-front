<template>
    <div class="mb-5">
        <label :for="id" class="label">{{ label }}</label>
        <input
            :id="id"
            :name="'form.' + name"
            :type="type"
            class="
                flex-1
                appearance-none
                border
                w-full
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-md
                rounded-lg
                text-base
                focus:outline-none focus:ring-2 focus:ring-primary-500
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
        label: {
            type: String,
            required: true,
        },
        form: {
            type: Object,
            required: true,
        },
        name: {
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
