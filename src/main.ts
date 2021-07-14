import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import Layout from '@/components/Layout.vue'
import '@/assets/index.css'

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
