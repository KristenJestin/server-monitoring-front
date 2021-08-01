import { RoutesModule } from '@/plugins/routes/props'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $routes: RoutesModule
    }
}
