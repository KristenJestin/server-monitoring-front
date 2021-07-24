<template>
    <DatePicker
        v-model="form[name]"
        color="purple"
        :masks="{
            input: 'YYYY-MM-DD',
        }"
        :first-day-of-week="2"
    >
        <template v-slot="{ inputValue, inputEvents, isDragging, updateValue }">
            <div class="flex flex-col sm:flex-row justify-start items-center">
                <div class="relative flex-grow">
                    <CalendarIcon
                        class="text-gray-600 w-4 h-full mx-3 absolute pointer-events-none"
                    />

                    <span
                        v-if="!inputValue"
                        class="
                            text-gray-400
                            h-full
                            pl-10
                            text-sm
                            mx-3
                            absolute
                            pointer-events-none
                            italic
                        "
                        >No date selected</span
                    >
                    <input
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
                            pl-10
                            pr-4
                            py-2
                            text-left text-base
                            focus:outline-none focus:ring-2 focus:ring-primary-500
                            sm:text-sm
                        "
                        :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                        :value="inputValue"
                        v-on="inputEvents"
                    />
                    <XIcon
                        class="
                            text-red-600
                            w-4
                            h-full
                            mx-3
                            top-0
                            right-0
                            absolute
                            transition-all
                            hover:bg-gray-200
                        "
                        @click="updateValue(undefined)"
                    />
                </div>
            </div>
        </template>
    </DatePicker>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DatePicker } from 'v-calendar'
import { CalendarIcon, XIcon } from '@heroicons/vue/outline'

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
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    components: {
        DatePicker,
        CalendarIcon,
        XIcon,
    },
    setup({ name }) {
        return {
            id: 'form-' + name,
        }
    },
})
</script>
