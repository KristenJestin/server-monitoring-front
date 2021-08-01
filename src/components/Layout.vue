<template>
    <div>
        <nav class="bg-gray-800 fixed w-full z-10 top-0">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img
                                class="h-8 w-8"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-4">
                                <Link
                                    v-for="item in menu"
                                    :href="item.href"
                                    class="
                                        text-gray-300
                                        hover:bg-gray-700 hover:text-white
                                        px-3
                                        py-2
                                        rounded-md
                                        text-sm
                                        font-medium
                                    "
                                    :class="{
                                        'bg-gray-900 text-white':
                                            $page.component.startsWith('Drives'),
                                    }"
                                    >{{ item.name }}</Link
                                >
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">
                            <button href="/drives/create" class="btn btn-primary">Login</button>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <button
                            type="button"
                            class="
                                bg-gray-800
                                inline-flex
                                items-center
                                justify-center
                                p-2
                                rounded-md
                                text-gray-400
                                hover:text-white hover:bg-gray-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-offset-gray-800
                                focus:ring-white
                            "
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span class="sr-only">Open main menu</span>
                            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
                            <svg
                                class="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            <!--
              Heroicon name: outline/x

              Menu open: "block", Menu closed: "hidden"
            -->
                            <svg
                                class="hidden h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <main class="mt-16">
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <slot />
            </div>
        </main>
    </div>

    <div class="static">
        <div class="absolute bottom-10 left-10">
            <transition
                enter-active-class="transform transition duration-500 ease-out"
                enter-from-class="-translate-x-8 opacity-0"
                enter-to-class="translate-x-0 opacity-100"
                leave-active-class="transform transition duration-200 ease-in"
                leave-from-class="translate-x-0 opacity-100"
                leave-to-class="translate-x-4 opacity-0"
            >
                <Alert v-if="alert" :value="alert" />
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import Alert from '@/components/Alert.vue'
import AlertModel from '@/models/extras/Alert'

export default defineComponent({
    props: {
        alert: {
            type: Object as PropType<AlertModel>,
            required: false,
        },
    },
    components: { Alert, Link },
    setup() {
        // refs
        const $routes = inject<RoutesModule>('$routes')

        // data
        const menu = [
            {
                name: 'Drives',
                href: $routes!.get('drives.index'),
            },
        ]

        // return
        return {
            menu,
        }
    },
})
</script>
