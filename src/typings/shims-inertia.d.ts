import Vue from 'vue'
import { Inertia, Page } from '@inertiajs/inertia'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $inertia: typeof Inertia
        $page: Page
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends typeof Vue> {
        layout?: any
    }
}
