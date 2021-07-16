<template>
    <div
        class="
            flex
            w-full
            max-w-sm
            mx-auto
            overflow-hidden
            bg-white
            rounded-lg
            shadow-md
            dark:bg-gray-800
        "
        v-show="open"
    >
        <div class="flex items-center justify-center w-12" :class="data.backgroundColor">
            <svg
                class="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path :d="data.path" />
            </svg>
        </div>

        <div class="px-4 py-2 -mx-3">
            <div class="mx-3">
                <span class="font-semibold" :class="data.textColor">{{ data.title }}</span>
                <p class="text-sm text-gray-600 dark:text-gray-200">{{ value.message }}</p>
            </div>
        </div>
        <button
            class="
                ml-2
                p-2
                transition-colors
                duration-200
                transform
                rounded-md
                hover:bg-opacity-25 hover:bg-gray-300
                focus:outline-none
            "
            @click="close"
        >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import Alert from '@/models/Alert'

export default defineComponent({
    props: {
        value: {
            type: Object as PropType<Alert>,
            required: true,
        },
    },
    setup({ value }) {
        const open = ref(true)

        const getData = (
            type: string
        ): { title: string; backgroundColor: string; textColor: string; path: string } => {
            switch (type) {
                case 'success':
                    return {
                        title: 'Success',
                        backgroundColor: 'bg-green-500',
                        textColor: 'text-green-500 dark:text-green-400',
                        path: 'M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z',
                    }
                case 'warning':
                    return {
                        title: 'Warning',
                        backgroundColor: 'bg-yellow-400',
                        textColor: 'text-yellow-400 dark:text-yellow-300',
                        path: 'M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z',
                    }
                case 'error':
                    return {
                        title: 'Error',
                        backgroundColor: 'bg-red-500',
                        textColor: 'text-red-500 dark:text-red-400',
                        path: 'M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z',
                    }
                default:
                    return {
                        title: 'Info',
                        backgroundColor: 'bg-blue-500',
                        textColor: 'text-blue-500 dark:text-blue-400',
                        path: 'M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z',
                    }
            }
        }

        const timeout = setTimeout(() => {
            if (open.value) {
                open.value = false
            }
        }, 7500)

        const close = () => {
            if (open.value) {
                open.value = false
                clearTimeout(timeout)
            }
        }

        return {
            data: getData(value.type),
            open,
            close,
        }
    },
})
</script>
