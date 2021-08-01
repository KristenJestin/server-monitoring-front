<template>
    <div class="mb-10 flex justify-end">
        <Link href="/drives/create" class="btn btn-primary">Create</Link>
    </div>
    <div>
        <div v-for="drive in drives" class="block m-5">
            <Link :href="$routes.get('drives.show', { id: drive.slug })">
                <div>{{ drive.name }}</div>
            </Link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import DriveModel from '@/models/Drive'

export default defineComponent({
    props: {
        drives: {
            type: Object as PropType<DriveModel[]>,
            required: true,
        },
    },
    components: { Link },
})
</script>
