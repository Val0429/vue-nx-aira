/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model } from "vue-property-decorator";
import { IDVEventsCategoryByDate } from '@/config/default/globals/db';
import VChart, { THEME_KEY } from "vue-echarts";

@Component({
    components: { VChart },
    provide: { [THEME_KEY]: "dark" }
})
export class Chart1 extends Vue {
    @Model('input')
    value: IDVEventsCategoryByDate;

    private chart_ready(o, v) {
        window.addEventListener("resize", () => {
            (o as any).resize();
        });
    }

    getOption() {
        let value = this.chart1_value$;
        if (!value) return;
        return {
            backgroundColor: "transparent",
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            dataset: {
                dimensions: ['time', 'identify', 'unknown'],
                source: value
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: { type: 'time' },
            yAxis: { type: 'value' },
            series: [
            {
                name: 'Identify',
                type: 'bar',
                stack: 'Ad',
                dimensions: ['time', 'identify'],
                emphasis: { focus: 'series' }
            },
            {
                name: 'Unknown',
                type: 'bar',
                stack: 'Ad',
                dimensions: ['time', 'unknown'],
                emphasis: { focus: 'series' }
            }
            ]
        }
    }
}
export default Chart1;