<template>
    <Card title="Device Drives">
        <form @submit.prevent="submit" class="flex">
            <InputDateRange
                name="date"
                v-model="form.date"
                range
                :errors="errors?.name"
                :max="now.toJSDate()"
                class="flex-grow"
            />

            <button type="submit" class="btn btn-primary ml-10">Submit</button>
        </form>

        <div class="mt-5"></div>
        <ApexChart :options="chart.options" :series="chart.series"></ApexChart>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject } from 'vue'
import ApexChart from 'vue3-apexcharts'
import { DateTime } from 'luxon'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import useBreadcrumb from '@/composables/useBreadcrumb'
import { RoutesModule } from '@/plugins/routes/props'
import { groupBy } from '@/utils/array'
import DeviceModel from '@/models/Device'
import DeviceDriveModel from '@/models/DeviceDrive'
import Errors from '@/models/extras/Error'
import Card from '@/components/Card.vue'
import FormGroup from '@/components/forms/FormGroup.vue'
import InputDateRange from '@/components/forms/InputDateRange.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'

interface DriveQueries {
    start: string
    end: string
}

export default defineComponent({
    props: {
        device: {
            type: Object as PropType<DeviceModel>,
            required: true,
        },
        drives: {
            type: Array as PropType<DeviceDriveModel[]>,
            default: [],
        },
        queries: {
            type: Object as PropType<DriveQueries>,
            default: {},
        },
        errors: {
            type: Object as PropType<Errors>,
            required: false,
        },
    },
    components: { Card, ApexChart, Link, FormGroup, InputDateRange, FormLabel, FormError },
    setup(props) {
        // refs
        useBreadcrumb(
            { name: 'Devices', page: 'devices.index' },
            { name: props.device.name, page: 'devices.show', params: { id: props.device.slug } },
            { name: 'Drives' }
        )
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive<{ date: { start?: Date; end?: Date } }>({
            date: {
                start: DateTime.fromISO(props.queries.start).toJSDate(),
                end: DateTime.fromISO(props.queries.end).toJSDate(),
            },
        })

        // data
        const chart = {
            series: Object.entries(groupBy(props.drives, (i) => i.name)).map(([key, elements]) => ({
                name: key,
                data: elements.map((d) => d.total_used_percentage),
            })),

            options: {
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        tools: {
                            download: false,
                        },
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    type: 'datetime',
                    // categories: props.drives
                    //     .map((d) =>
                    //         DateTime.fromISO(d.created_at)
                    //             .endOf('minute')
                    //             .toISO({ includeOffset: false })
                    //     )
                    //     .filter((v, i, a) => a.indexOf(v) === i),
                    categories: Object.entries(groupBy(props.drives, (i) => i.group)).map(
                        ([key, elements]) =>
                            DateTime.fromISO(elements[0].created_at).toISO({ includeOffset: false })
                    ),
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    labels: {
                        formatter: (value: number) => value + '%',
                    },
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
                    },
                    y: {
                        formatter: (value: number) => value.toFixed(2) + '%',
                    },
                },
            },
        }
        const now = DateTime.now()

        // methods
        const submit = () => {
            Inertia.get($routes!.get('devices.drives', { id: props.device.slug }), {
                start: form.date.start ? DateTime.fromJSDate(form.date.start).toISODate() : null,
                end: form.date.end ? DateTime.fromJSDate(form.date.end).toISODate() : null,
            })
        }

        // return
        return {
            form,
            chart,
            now,
            submit,
        }
    },
})
</script>

<style>
.apexcharts-legend-text,
.apexcharts-text,
.apexcharts-tooltip-text {
    @apply transition-colors duration-500 ease-in-out text-gray-700 dark:text-gray-200 fill-current !important;
}

.apexcharts-toolbar svg {
    @apply transition-colors duration-500 ease-in-out text-gray-400 dark:text-gray-400 fill-current !important;
}
.apexcharts-selected svg {
    @apply transition-colors duration-500 ease-in-out text-gray-900 dark:text-gray-100 fill-current !important;
}

.apexcharts-tooltip-title {
    @apply transition-colors duration-500 ease-in-out bg-gray-100 dark:bg-gray-700 fill-current border-b border-gray-300 dark:border-gray-900 !important;
}
.apexcharts-tooltip {
    @apply transition-colors duration-500 ease-in-out bg-gray-50 dark:bg-gray-800 fill-current border-0 !important;
}
</style>
