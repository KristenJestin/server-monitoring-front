import { Inertia, Page } from '@inertiajs/inertia'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $inertia: typeof Inertia
        $page: Page
    }

    export interface ComponentCustomOptions {
        layout?: any
    }
}
