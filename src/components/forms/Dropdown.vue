<template>
    <div class="relative">
        <button
            type="button"
            class="
                relative
                w-full
                bg-white
                text-gray-700
                border
                rounded-lg
                shadow-md
                pl-4
                pr-10
                py-2
                text-left text-base
                cursor-default
                focus:outline-none focus:ring-2
                sm:text-sm
            "
            :class="errors ? 'ring-2 ring-red-500' : ''"
            :style="
                selected && {
                    backgroundColor: extraStyleBackgroundColor
                        ? selected[extraStyleBackgroundColor]
                        : undefined,
                    color: extraStyleTextColor ? selected[extraStyleTextColor] : undefined,
                }
            "
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            @click="dropdownOpen = !dropdownOpen"
        >
            <span class="flex items-center">
                <span
                    class="block truncate"
                    v-html="
                        selected && selected[nameProperty]
                            ? selected[nameProperty]
                            : '<i>no selection</i>'
                    "
                />
            </span>
            <span
                class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
            >
                <SelectorIcon
                    class="h-5 w-5 text-gray-400 opacity-85"
                    :style="
                        selected && {
                            color: extraStyleTextColor ? selected[extraStyleTextColor] : undefined,
                        }
                    "
                />
            </span>
        </button>

        <transition
            enter-active-class="transform transition ease-out duration-200"
            enter-from-class="opacity-0 -translate-y-6"
            enter-to-class="opacity-100"
            leave-active-class="transform transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 -translate-y-6"
        >
            <ul
                class="
                    absolute
                    z-10
                    mt-1
                    w-full
                    bg-white
                    shadow-lg
                    max-h-56
                    rounded-md
                    py-1
                    text-base
                    ring-1 ring-black ring-opacity-5
                    overflow-auto
                    focus:outline-none
                    sm:text-sm
                "
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
                v-show="dropdownOpen"
            >
                <li
                    class="
                        text-gray-900
                        cursor-default
                        select-none
                        relative
                        py-2
                        pr-9
                        hover:text-white hover:bg-primary-500
                        group
                    "
                    id="listbox-option-0"
                    role="option"
                    v-for="value in options"
                    @click="select(value)"
                >
                    <div class="flex items-center">
                        <span
                            class="ml-3 block truncate"
                            :class="isSelected(value) ? 'font-semibold' : 'font-normal'"
                            >{{ value[nameProperty] }}</span
                        >
                    </div>

                    <span
                        class="
                            absolute
                            inset-y-0
                            right-0
                            flex
                            items-center
                            pr-4
                            text-primary-600
                            group-hover:text-white
                        "
                        v-show="isSelected(value)"
                    >
                        <CheckIcon class="h-5 w-5" />
                    </span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

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
        options: {
            type: Array as PropType<any[]>,
            required: true,
        },
        idProperty: {
            type: String,
            default: 'id',
        },
        nameProperty: {
            type: String,
            default: 'name',
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
        extraStyleBackgroundColor: {
            type: String,
            required: false,
        },
        extraStyleTextColor: {
            type: String,
            required: false,
        },
    },
    components: { CheckIcon, SelectorIcon },
    setup({ form, name, options, idProperty }) {
        // refs
        const dropdownOpen = ref(false)
        const selected = computed(() => options.find((option) => option[idProperty] === form[name]))

        const select = (option: any) => {
            form[name] = option[idProperty]
            dropdownOpen.value = false
        }

        const isSelected = (option: any) => form[name] === option[idProperty]

        // return
        return {
            dropdownOpen,
            selected,
            select,
            isSelected,
        }
    },
})
</script>
