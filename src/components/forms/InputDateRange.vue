<template>
    <DatePicker
        v-model="value"
        color="purple"
        :masks="{
            input: 'YYYY-MM-DD',
        }"
        :first-day-of-week="2"
        :popover="{ visibility: 'focus' }"
        :max-date="max"
        @update:modelValue="onInput"
        :is-dark="dark"
        :is-range="true"
    >
        <template v-slot="{ inputValue, inputEvents, updateValue }">
            <div class="flex flex-col sm:flex-row justify-start items-center space-x-6">
                <div class="relative flex-grow">
                    <CalendarIcon
                        class="
                            text-gray-600
                            dark:text-gray-400
                            w-4
                            h-full
                            mx-3
                            absolute
                            pointer-events-none
                        "
                    />

                    <div
                        v-if="!inputValue.start"
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
                            border-gray-100
                            transition
                            duration-500
                            ease-in-out
                            dark:bg-gray-700 dark:text-gray-100 dark:border-gray-800
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
                        :value="inputValue.start"
                        v-on="inputEvents.start"
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

                <ArrowSmRightIcon class="h-6 w-6 text-gray-400 dark:text-gray-500" />

                <div class="relative flex-grow">
                    <CalendarIcon
                        class="
                            text-gray-600
                            dark:text-gray-400
                            w-4
                            h-full
                            mx-3
                            absolute
                            pointer-events-none
                        "
                    />

                    <div
                        v-if="!inputValue.end"
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
                            border-gray-100
                            transition
                            duration-500
                            ease-in-out
                            dark:bg-gray-700 dark:text-gray-100 dark:border-gray-800
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
                        :value="inputValue.end"
                        v-on="inputEvents.end"
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
import { defineComponent, PropType, ref, watch } from 'vue'
import { DatePicker } from 'v-calendar'
import { CalendarIcon, ArrowSmRightIcon } from '@heroicons/vue/outline'
import { XIcon } from '@heroicons/vue/solid'

import useDarkMode from '@/composables/useDarkMode'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Object as PropType<{ start?: Date; end?: Date }>,
            required: false,
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
        max: {
            type: Date,
            default: undefined,
        },
    },
    components: { DatePicker, CalendarIcon, XIcon, ArrowSmRightIcon },
    setup({ name, ...props }, { emit }) {
        // refs
        const { darkMode } = useDarkMode()
        const value = ref(props.modelValue)

        // methods
        const onInput = (v: Date | undefined) => {
            emit('update:modelValue', v)
        }

        // return
        return {
            id: 'form-' + name,
            onInput,
            value,
            ...darkMode,
        }
    },
})
</script>
