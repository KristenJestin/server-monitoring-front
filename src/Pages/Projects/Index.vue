<template>
    <div class="mb-10 flex justify-end">
        <Link href="/projects/create" class="btn btn-primary">Create</Link>
    </div>
    <div>
        <div v-for="project in projects" class="block m-5">
            <Link :href="$routes.get('projects.show', { id: project.slug })">
                {{ project.name }}
            </Link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import Project from '@/models/Project'

export default defineComponent({
    props: {
        projects: {
            type: Object as PropType<Project[]>,
            required: true,
        },
    },
    components: { Link },
})
</script>
