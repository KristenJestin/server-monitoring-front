// imports
import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'
import { InertiaProgress } from '@inertiajs/progress'

import Layout from '@/components/Layout.vue'
import '@/assets/styles/app.scss'

// config
InertiaProgress.init({
    // The color of the progress bar.
    color: '#29d',
    // Whether the NProgress spinner will be shown.
    showSpinner: true,
})

// main
createInertiaApp({
    resolve: async (name) => {
        const page = await import(`./Pages/${name}.vue`).then((module) => module.default)
        page.layout = page.layout || Layout
        return page
    },
    setup({ el, app, props, plugin }) {
        createApp({ render: () => h(app, props) })
            .use(plugin)
            .mount(el)
    },
})
