import { Inertia } from '@inertiajs/inertia'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $inertia: typeof Inertia
    }
}
