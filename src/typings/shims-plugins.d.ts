import { Inertia } from '@inertiajs/inertia'
import { RoutesModule } from '@/plugins/routes/props'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $inertia: typeof Inertia
        $routes: RoutesModule
    }
}
