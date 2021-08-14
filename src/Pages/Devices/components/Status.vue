<template>
    <Tooltip :message="tooltip ? formatedStatus.tooltip || undefined : undefined">
        <span
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            :class="formatedStatus.class"
        >
            {{ formatedStatus.name }}
        </span>
    </Tooltip>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { DateTime } from 'luxon'

import { STATUS } from '@/models/Device'
import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    props: {
        status: {
            type: String as PropType<STATUS>,
            required: true,
        },
        connectionDate: {
            type: String,
            required: false,
        },
        aliveDate: {
            type: String,
            required: false,
        },
        tooltip: {
            type: Boolean,
            default: true,
        },
    },
    components: { Tooltip },
    setup({ status, connectionDate, aliveDate }) {
        // refs
        const formatedStatus = computed(() => {
            if (status === STATUS.UP) {
                if (aliveDate) {
                    const alive = DateTime.fromISO(aliveDate)
                    console.log(DateTime.local().diff(alive, 'minutes').minutes)
                    if (DateTime.local().diff(alive, 'minutes').minutes >= 20)
                        return {
                            name: 'no responding',
                            class: 'bg-yellow-100 text-yellow-800',
                            tooltip: alive.toRelative(),
                        }
                }

                return {
                    name: 'on',
                    class: 'bg-green-100 text-green-800',
                    tooltip: DateTime.fromISO(connectionDate!).toRelative(),
                }
            } else if (status === STATUS.DOWN) {
                if (!connectionDate) {
                    return {
                        name: 'no connection',
                        class: 'bg-primary-100 text-primary-800',
                    }
                } else {
                    const date = DateTime.fromISO(connectionDate)
                    if (date.diffNow('weeks').weeks > 5) {
                        return {
                            name: 'not used',
                            class: 'bg-red-100 text-red-800',
                            tooltip: DateTime.fromISO(connectionDate!).toRelative(),
                        }
                    }

                    return {
                        name: 'off',
                        class: 'bg-yellow-100 text-yellow-800',
                        tooltip: DateTime.fromISO(connectionDate!).toRelative(),
                    }
                }
            }

            return {
                name: 'unknow',
                class: 'bg-gray-100 text-gray-800',
            }
        })

        // return
        return {
            formatedStatus,
        }
    },
})
</script>
