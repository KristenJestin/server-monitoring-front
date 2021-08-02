// imports
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

import Layout from '@/components/Layout.vue'
import Routes from '@/plugins/routes'
import '@/assets/styles/app.scss'

// config
InertiaProgress.init({
    // The color of the progress bar.
    color: '#a855f7',
    // Whether the NProgress spinner will be shown.
    showSpinner: true,
})

// main
createInertiaApp({
    resolve: async (name) => {
        const page = await import(`./Pages/${name}.vue`).then((module) => module.default)

        if (page.layout === undefined) {
            const breadcrumb = page.breadcrumb
            page.layout = h(Layout, { breadcrumb }, () => page)
        }

        return page
    },
    setup({ el, app, props, plugin }) {
        createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(Routes)
            .mount(el)
    },
})
