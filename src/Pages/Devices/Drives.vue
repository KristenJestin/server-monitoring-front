<template>
    <Card title="Device Drives">
        <ApexChart type="area" :options="chart.chartOptions" :series="chart.series"></ApexChart>
    </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ApexChart from 'vue3-apexcharts'
import { DateTime } from 'luxon'

import { RoutesModule } from '@/plugins/routes/props'
import { addZeroes } from '@/utils/number'
import { groupBy } from '@/utils/array'
import DeviceModel from '@/models/Device'
import DeviceDriveModel from '@/models/DeviceDrive'
import Card from '@/components/Card.vue'

export default defineComponent({
    breadcrumb: [{ name: 'Devices', page: 'devices.index' }, { name: 'Drives' }],
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
        const results = groupBy(props.drives, (i) => i.name)
        const chart = {
            series: Object.entries(results).map(([key, elements]) => ({
                name: key,
                data: elements.map((d) => d.total_used_percentage),
            })),

            chartOptions: {
                chart: {
                    height: 350,
                    type: 'area',
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
                            DateTime.fromISO(d.created_at).toFormat("yyyy-MM-dd'T'HH:mm:'00'")
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
            series: [
                {
                    name: 'series1',
                    data: [31, 40, 28, 51, 42, 109, 100],
                },
                {
                    name: 'series2',
                    data: [11, 32, 45, 32, 34, 52, 41],
                },
            ],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'area',
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    type: 'datetime',
                    categories: [
                        '2018-09-19T00:00:00.000Z',
                        '2018-09-19T01:30:00.000Z',
                        '2018-09-19T02:30:00.000Z',
                        '2018-09-19T03:30:00.000Z',
                        '2018-09-19T04:30:00.000Z',
                        '2018-09-19T05:30:00.000Z',
                        '2018-09-19T06:30:00.000Z',
                    ],
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
                    },
                },
            },
        }
    },
})
</script>
