/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Emit } from "vue-property-decorator";
import { IDVEventsCategoryByDate } from '@/config/default/globals/db';
import VChart, { THEME_KEY } from "vue-echarts";

@Component({
    components: { VChart },
    provide: { [THEME_KEY]: "dark" }
})
export class Chart1 extends Vue {
    @Model('input')
    value: IDVEventsCategoryByDate;

    private _chart;
    private chart_ready(o) { this._chart = o; window.addEventListener("resize", this.chart_handler); }
    private chart_finished() { window.removeEventListener("resize", this.chart_handler); }
    private chart_handler(o) { this._chart.resize(); }

    @Emit("click")
    private chart_clicked(e) {
        return e;
    }

    getOption() {
        let value = (this as any).chart1_value$;
        if (!value) return;
        return {
            backgroundColor: "transparent",
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: { itemGap: 35, padding: 15 },
            dataset: {
                dimensions: ['time', 'Identify', 'Unknown'],
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
                dimensions: ['time', 'Identify'],
                emphasis: { focus: 'series' }
            },
            {
                name: 'Unknown',
                type: 'bar',
                stack: 'Ad',
                dimensions: ['time', 'Unknown'],
                emphasis: { focus: 'series' }
            }
            ]
        }
    }
}
export default Chart1;