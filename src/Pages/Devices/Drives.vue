<template>
    <Card title="Device Drives">
        <ApexChart :options="chart.options" :series="chart.series"></ApexChart>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ApexChart from 'vue3-apexcharts'
import { DateTime } from 'luxon'

import useBreadcrumb from '@/composables/useBreadcrumb'
import { RoutesModule } from '@/plugins/routes/props'
import { groupBy } from '@/utils/array'
import DeviceModel from '@/models/Device'
import DeviceDriveModel from '@/models/DeviceDrive'
import Card from '@/components/Card.vue'

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
    },
    components: { Card, ApexChart },
    setup(props) {
        // data
        useBreadcrumb(
            { name: 'Devices', page: 'devices.index' },
            { name: props.device.name, page: 'devices.show', params: { id: props.device.slug } },
            { name: 'Drives' }
        )
        const results = groupBy(props.drives, (i) => i.name)
        const chart = {
            series: Object.entries(results).map(([key, elements]) => ({
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
                    categories: props.drives
                        .map((d) =>
                            DateTime.fromISO(d.created_at)
                                .endOf('minute')
                                .toISO({ includeOffset: false })
                        )
                        .filter((v, i, a) => a.indexOf(v) === i),
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
        // return
        return {
            chart,
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
