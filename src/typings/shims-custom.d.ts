import { RoutesModule } from '@/plugins/routes/props'
import BreadcrumbItem from '@/models/extras/BreadcrumbItem'

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $routes: RoutesModule
    }

    export interface ComponentCustomOptions {
        breadcrumb?: BreadcrumbItem[]
    }
}
