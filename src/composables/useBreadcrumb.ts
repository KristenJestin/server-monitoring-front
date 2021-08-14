// imports
import { reactive, toRefs } from 'vue'

import BreadcrumbItem from '@/models/extras/BreadcrumbItem'

// main
const state = reactive<{ crumbs: BreadcrumbItem[] }>({ crumbs: [] })

const useBreadcrumb = (...crumbs: BreadcrumbItem[]) => {
    if (crumbs) {
        state.crumbs = crumbs
    }

    return {
        breadcrumbs: toRefs(state),
    }
}

// exports
export default useBreadcrumb
