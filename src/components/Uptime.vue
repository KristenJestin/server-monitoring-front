<template>
    <div class="inline-flex space-x-2">
        <div v-for="time in [...Array(24).keys()]" class="w-2 h-8 bg-gray-300">
            <div v-if="time < now.hour && !data[time]" class="h-full w-full bg-red-500"></div>
            <div
                v-else-if="data[time] && isAllIndexIn(data[time])"
                class="h-full w-full bg-green-500"
            ></div>
            <div
                v-else
                v-for="index in displayOptions.divider"
                :key="index"
                class="w-full"
                :class="getPartedHourSize(displayOptions.divider)"
            >
                <div
                    v-if="data[time] && isInInterval(data[time], index)"
                    class="h-full w-full bg-green-500"
                ></div>
                <div
                    v-else-if="isInOffInterval(time, index)"
                    class="h-full w-full bg-red-500"
                ></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs, ref, watch } from 'vue'
import { DateTime } from 'luxon'

import DeviceUptimeModel from '@/models/partials/DeviceUptime'

export default defineComponent({
    props: {
        dates: {
            type: Array as PropType<DeviceUptimeModel[]>,
            required: true,
        },
    },
    setup(props) {
        // data
        const displayOptions = {
            total: 60,
            divider: 6,
        }
        const now = DateTime.now()

        // private methods
        const getHours = (uptime: DeviceUptimeModel[]): Record<number, number[]> => {
            let values: Record<number, number[]> = {}

            for (const date of uptime) {
                const datetime = DateTime.fromISO(date.interval)
                if (!(datetime.hour in values)) values[datetime.hour] = []
                values[datetime.hour].push(datetime.minute)
            }

            return values
        }

        // refs
        const { dates } = toRefs(props)
        const data = ref<Record<number, number[]>>(getHours(dates.value))
        watch(dates, (ds) => {
            data.value = getHours(ds)
        })

        // methods
        const isInInterval = (minutes: number[], index: number): boolean => {
            const difference = displayOptions.total / displayOptions.divider
            const min = difference * (index - 1)
            const max = difference * index

            for (const minute of minutes) {
                if (minute >= min && minute < max) return true
            }

            return false
        }
        const isInOffInterval = (time: number, index: number): boolean => {
            const difference = displayOptions.total / displayOptions.divider

            return time < now.hour || (time === now.hour && difference * index <= now.minute)
        }
        const isAllIndexIn = (minutes: number[]): boolean => {
            const interval = displayOptions.total / displayOptions.divider
            for (let i = 0; i < displayOptions.divider; i++) {
                if (!minutes.includes(i * interval)) return false
            }

            return true
        }

        const getPartedHourSize = (divider: number) => {
            switch (divider) {
                case 6:
                    return 'h-1/6'
                case 5:
                    return 'h-1/5'
                case 4:
                    return 'h-1/4'
                case 3:
                    return 'h-1/3'
                default:
                    return 'h-1/2'
            }
        }

        // return
        return {
            displayOptions,
            data,
            now: {
                hour: now.hour,
                minute: now.minute,
            },
            isAllIndexIn,
            isInInterval,
            isInOffInterval,
            getPartedHourSize,
        }
    },
})
</script>
