<template>
    <Multiselect
        v-model="value"
        ref="input"
        :options="options"
        :mode="mode"
        :searchable="true"
        :createTag="true"
        :filterResults="false"
        :addTagOn="['enter', ';', ',']"
        :classes="{
            container:
                'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border rounded-lg shadow-md bg-white text-base leading-snug outline-none placeholder-gray-400',
            containerDisabled: 'cursor-default bg-gray-100',
            containerOpen: 'rounded-b-none',
            containerOpenTop: 'rounded-t-none',
            containerActive: 'ring ring-primary-500',
            singleLabel:
                'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5',
            multipleLabel:
                'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5',
            search: 'w-full h-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded pl-3.5',
            tags: 'flex-grow flex-shrink flex flex-wrap mt-1 pl-2',
            tag: 'bg-primary-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap',
            tagDisabled: 'pr-2 !bg-gray-400 text-white',
            tagRemove:
                'flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 group',
            tagRemoveIcon:
                'bg-multiselect-remove bg-center bg-no-repeat opacity-30 inline-block w-3 h-3 group-hover:opacity-60',
            tagsSearch:
                'h-full border-0 outline-none appearance-none p-0 text-base font-sans mx-1 mb-1 box-border flex-grow flex-shrink',
            placeholder:
                'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400',
            caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform',
            caretOpen: 'rotate-180',
            clear: 'pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80',
            clearIcon:
                'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
            spinner:
                'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0',
            dropdown:
                'absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
            dropdownTop:
                '-translate-y-full top-px bottom-auto flex-col-reverse rounded-b-none rounded-t',
            options: 'flex flex-col p-0 m-0 list-none',
            optionsTop: 'flex-col-reverse',
            option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
            optionPointed: 'text-gray-800 bg-gray-100',
            optionSelected: 'text-white bg-green-500',
            optionDisabled: 'text-gray-300 cursor-not-allowed',
            optionSelectedPointed: 'text-white bg-primary-500 opacity-90',
            optionSelectedDisabled:
                'text-primary-100 bg-primary-500 bg-opacity-50 cursor-not-allowed',
            noOptions: 'py-2 px-3 text-gray-600 bg-white',
            noResults: 'py-2 px-3 text-gray-600 bg-white',
            fakeInput:
                'bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
            spacer: 'h-9 py-px box-content',
        }"
    >
        <template v-slot:tag="{ option, handleTagRemove, disabled }">
            <Tag
                :name="option.label"
                :background-color="option.color"
                :text-color="option.textColor"
                extra-class="pr-0  mr-1 mb-1"
            >
                <span
                    class="
                        flex
                        items-center
                        justify-center
                        p-1
                        mx-0.5
                        rounded-sm
                        hover:bg-black hover:bg-opacity-10
                        group
                    "
                    :style="{
                        backgroundColor: option.color,
                        color: option.textColor,
                    }"
                >
                    <XIcon
                        v-if="!disabled"
                        @click.prevent
                        @mousedown.prevent.stop="handleTagRemove(option, $event)"
                        class="
                            bg-center bg-no-repeat
                            inline-block
                            w-3
                            h-3
                            opacity-70
                            group-hover:opacity-100
                        "
                    />
                </span>
            </Tag>
        </template>

        <template v-if="mode === 'tags'" v-slot:option="{ option }">
            <span
                class="flex-1 py-2 px-3"
                :style="{
                    backgroundColor: option.color,
                    color: option.textColor,
                }"
                >{{ option.label }}</span
            >
        </template>
        <template v-slot:caret>
            <ChevronDownIcon
                class="
                    bg-center bg-no-repeat
                    w-5
                    h-5
                    py-px
                    box-content
                    mr-3.5
                    relative
                    z-10
                    opacity-40
                    flex-shrink-0 flex-grow-0
                "
            />
        </template>
        <template v-slot:clear>
            <XIcon
                class="
                    bg-center bg-no-repeat
                    w-4
                    h-4
                    py-px
                    box-content
                    mr-3.5
                    relative
                    z-10
                    opacity-40
                    hover:opacity-80
                    flex-shrink-0 flex-grow-0
                    transition
                    duration-300
                "
                @click="input.clear()"
            />
        </template>
    </Multiselect>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import Multiselect from '@vueform/multiselect'
import { ChevronDownIcon, XIcon } from '@heroicons/vue/solid'

import Tag from '@/components/Tag.vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        mode: {
            type: String as PropType<'single' | 'multiple' | 'tags'>,
            required: true,
        },
        modelValue: {
            type: [Array, String] as PropType<string[] | string | undefined>,
            required: false,
        },
        options: {
            type: Array as PropType<any[]>,
            required: true,
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    components: { Multiselect, Tag, ChevronDownIcon, XIcon },
    setup({ name, modelValue }, { emit }) {
        const input = ref()
        const value = ref(modelValue)
        watch(value, (v) => {
            emit('update:modelValue', v)
        })

        return {
            id: 'form-' + name,
            input,
            value,
        }
    },
})
</script>
