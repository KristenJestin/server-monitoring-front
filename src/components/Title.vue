<template>
    <h1 class="font-extrabold font-header uppercase text-3xl">
        {{ name }}
    </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
    },
})
</script>
