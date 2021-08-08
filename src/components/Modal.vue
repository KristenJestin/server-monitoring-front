<template>
    <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        v-if="open"
    >
        <div
            class="
                flex
                items-end
                justify-center
                min-h-screen
                pt-4
                px-4
                pb-20
                text-center
                sm:block sm:p-0
            "
        >
            <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="opacity-0"
                enter-to-class=" opacity-100"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    class="
                        fixed
                        inset-0
                        bg-gray-500
                        dark:bg-gray-900
                        bg-opacity-75
                        transition-all
                        duration-500
                        ease-in-out
                        dark:bg-opacity-90
                    "
                    aria-hidden="true"
                ></div>
            </transition>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
            </span>

            <transition
                enter-active-class="transform transition ease-out duration-300"
                enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to-class=" opacity-100"
                leave-active-class="transform transition ease-in duration-200"
                leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <div
                    class="
                        inline-block
                        align-bottom
                        bg-white
                        duration-500
                        ease-in-out
                        dark:bg-gray-600
                        rounded-lg
                        text-left
                        overflow-hidden
                        shadow-xl
                        transform
                        transition-all
                        sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
                    "
                >
                    <div
                        class="
                            bg-white
                            transition
                            duration-500
                            ease-in-out
                            dark:bg-gray-600
                            px-4
                            pt-5
                            pb-4
                            sm:p-6 sm:pb-4
                        "
                    >
                        <div class="sm:flex sm:items-start">
                            <div
                                class="
                                    mx-auto
                                    flex-shrink-0 flex
                                    items-center
                                    justify-center
                                    h-12
                                    w-12
                                    rounded-full
                                    bg-red-100
                                    transition
                                    duration-500
                                    ease-in-out
                                    dark:bg-red-800
                                    sm:mx-0 sm:h-10 sm:w-10
                                "
                            >
                                <ExclamationIcon
                                    class="
                                        h-6
                                        w-6
                                        text-red-600
                                        transition
                                        duration-500
                                        ease-in-out
                                        dark:text-red-100
                                    "
                                />
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium" id="modal-title">
                                    {{ title }}
                                </h3>
                                <div class="mt-2">
                                    <p
                                        class="
                                            text-sm text-gray-500
                                            transition
                                            duration-500
                                            ease-in-out
                                            dark:text-gray-300
                                        "
                                    >
                                        {{ message }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="
                            bg-gray-100
                            transition
                            duration-500
                            ease-in-out
                            dark:bg-gray-700
                            px-4
                            py-3
                            sm:px-6 sm:flex sm:flex-row-reverse
                        "
                    >
                        <button
                            type="button"
                            class="w-full btn btn-danger sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="action"
                        >
                            {{ button }}
                        </button>
                        <button
                            type="button"
                            class="mt-3 w-full btn btn-muted sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="close"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ExclamationIcon } from '@heroicons/vue/outline'

export default defineComponent({
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        button: {
            type: String,
            required: true,
        },
        action: {
            type: Function as PropType<() => void>,
            required: true,
        },
    },
    components: { ExclamationIcon },
    setup({}, { emit }) {
        const close = () => {
            emit('update:open', false)
        }

        return { close }
    },
})
</script>
