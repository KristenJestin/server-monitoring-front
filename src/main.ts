// imports
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'
import { Settings } from 'luxon'

import Layout from '@/components/Layout.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Routes from '@/plugins/routes'
import '@/assets/styles/app.scss'

// config
// progress bar
InertiaProgress.init({
    // The color of the progress bar.
    color: '#a855f7',
    // Whether the NProgress spinner will be shown.
    showSpinner: true,
})
// luxon
Settings.defaultLocale = 'en-US'

// main
createInertiaApp({
    resolve: async (name) => {
        // const page = (await import(`./Pages/${name}.vue`)).default //then((module) => module.default)
        const pages = import.meta.globEager(`./Pages/**/*.vue`)
        const page = pages[`./Pages/${name}.vue`].default

        let breadcrumb
        if (page.breadcrumb) breadcrumb = page.breadcrumb

        if (!page.layout) {
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
