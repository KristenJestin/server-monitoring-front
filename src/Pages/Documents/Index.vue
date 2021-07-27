<template>
    <div class="mb-10 flex justify-end">
        <Link href="/documents/create" class="btn btn-primary">Create</Link>
    </div>
    <div>
        <div class="flex">
            <div class="flex-1 pr-3">
                <Input
                    name="search"
                    v-model="form.search"
                    placeholder="Search some documents ..."
                />
            </div>
            <div class="pl-3">
                <InputDropdown
                    name="tags"
                    mode="tags"
                    v-model="form.tags"
                    placeholder="Pick some tags ..."
                    :options="
                        tags.map((tag) => ({
                            label: tag.name,
                            value: tag.slug,
                            color: tag.color,
                            textColor: tag.text_color,
                        }))
                    "
                />
            </div>
        </div>
        <div v-for="document in documents" class="block m-5">
            <Link :href="$routes.get('documents.show', { id: document.slug })">
                {{ document.name }}
            </Link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import DocumentModel from '@/models/Document'
import SearchDocumentModel from '@/models/SearchDocument'
import TagModel from '@/models/Tag'
import { RoutesModule } from '@/plugins/routes/props'
import { debounce } from '@/utils/functions'
import Input from '@/components/forms/Input.vue'
import InputDropdown from '@/components/forms/InputDropdown.vue'

export default defineComponent({
    props: {
        documents: {
            type: Object as PropType<DocumentModel[]>,
            required: true,
        },
        filters: {
            type: Object as PropType<SearchDocumentModel>,
            default: { search: '', tags: [] },
        },
        tags: {
            type: Object as PropType<TagModel[]>,
            required: true,
        },
    },
    components: { Link, Input, InputDropdown },
    setup({ filters }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')

        const form = reactive<SearchDocumentModel>(filters)

        watch(
            () => form,
            (values) => {
                submit(values)
            },
            { deep: true }
        )

        // methods
        const submit = debounce(
            (values) =>
                Inertia.get($routes?.get('documents.index') || '', values, {
                    preserveState: true,
                    preserveScroll: true,
                }),
            200
        )

        // return
        return {
            form,
            submit,
        }
    },
})
</script>
