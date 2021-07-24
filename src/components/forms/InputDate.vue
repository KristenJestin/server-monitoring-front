<template>
    <DatePicker
        v-model="value"
        color="purple"
        :masks="{
            input: 'YYYY-MM-DD',
        }"
        :first-day-of-week="2"
        :popover="{ visibility: 'focus' }"
        @update:modelValue="onInput"
    >
        <template v-slot="{ inputValue, inputEvents, updateValue }">
            <div class="flex flex-col sm:flex-row justify-start items-center">
                <div class="relative flex-grow">
                    <CalendarIcon
                        class="text-gray-600 w-4 h-full mx-3 absolute pointer-events-none"
                    />

                    <div
                        v-if="!inputValue"
                        class="absolute flex items-center h-full pointer-events-none"
                    >
                        <span class="text-gray-400 pl-10 text-sm italic">No date selected</span>
                    </div>
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
                        :class="errors ? 'ring-2 ring-red-500' : ''"
                        :value="inputValue"
                        v-on="inputEvents"
                    />
                    <div
                        v-if="inputValue"
                        class="
                            w-12
                            h-full
                            top-0
                            right-0
                            absolute
                            cursor-pointer
                            flex
                            justify-center
                            items-center
                            opacity-40
                            hover:opacity-80
                            transition
                            duration-300
                        "
                        @click="updateValue(undefined)"
                    >
                        <XIcon class="w-4" />
                    </div>
                </div>
            </div>
        </template>
    </DatePicker>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { DatePicker } from 'v-calendar'
import { CalendarIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Object as PropType<Date>,
            required: false,
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
    setup({ name, ...props }, { emit }) {
        const value = ref(props.modelValue)
        const onInput = (v: Date | undefined) => {
            emit('update:modelValue', v)
        }

        return {
            id: 'form-' + name,
            onInput,
            value,
        }
    },
})
</script>
