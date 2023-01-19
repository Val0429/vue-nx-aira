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
export class Chart11 extends Vue {
    @Model('input')
    value: IDVEventsCategoryByDate;

    /// 0-4
    @Prop({ type: Number, required: false })
    colorType: number;

    private _chart;
    private chart_ready(o) { this._chart = o; window.addEventListener("resize", this.chart_handler); }
    private chart_finished() { window.removeEventListener("resize", this.chart_handler); }
    private chart_handler(o) { this._chart.resize(); }

    @Emit("click")
    private chart_clicked(e) {
        return e;
    }

    getOption() {
        const colors = ["#92C57B99", "#43A0D199", "#E4CA6D99", "#945CA899", "#9D684A99"];

        /// { id, time, count }
        let tenMinutes = 10*60*1000;
        let start = 1671588000000;
        let source = {
            "1": [
                { time: start, value: 10 },
                { time: start+tenMinutes, value: 20 },
                { time: start+tenMinutes*2, value: 15 },
                { time: start+tenMinutes*3, value: 20 },
                { time: start+tenMinutes*4, value: 5 },
                { time: start+tenMinutes*5, value: 15 },
            ],
            // "2": [
            //     { time: start, count: 10 },
            //     { time: start+tenMinutes, count: 20 },
            //     { time: start+tenMinutes*2, count: 15 },
            //     { time: start+tenMinutes*3, count: 20 },
            //     { time: start+tenMinutes*4, count: 5 },
            //     { time: start+tenMinutes*5, count: 15 },    
            // ]
        }

        let o = {
            backgroundColor: "transparent",
            tooltip: {
                position: "top",
            },

            dataset: {
                source: source["1"],
            },

            series: {
                coordinateSystem: "singleAxis", type: "scatter",
                color: colors[(this.colorType || 0)%5],
                encode: {
                    single: "time"
                },
                symbolSize: function (dataItem) {
                    return dataItem["value"] * 3;
                  }
            },

            singleAxis: {
                left: 130,
                height: "80px",
                type: "time",
                boundaryGap: false
            },

            title: {
                top: "35%",
                textBaseline: "middle", text: `Zone 1`,
            },
        }

        // let o = {
        //     backgroundColor: "transparent",
        //     tooltip: {
        //         position: "top",
        //     },

        //     series: Object.keys(source).map((key, idx) => {
        //         return {
        //             coordinateSystem: "singleAxis", type: "scatter", singleAxisIndex: idx,
        //             encode: {
        //                 single: "time"
        //             },
        //             data: source[idx]
        //         }
        //     }),

        //     singleAxis: Object.keys(source).map((key, idx) => {
        //         return {
        //             height: "4%",
        //             type: "time",
        //             boundaryGap: false
        //         }
        //     }),

        //     title: Object.keys(source).map((key, idx) => {
        //         return {
        //             textBaseline: "middle", text: `Zone ${key}`,
        //         }
        //     }),
        // }
        console.log("o!", o);
        return o;
    }

    // getOption() {
    //     let value = (this as any).chart1_value$;
    //     if (!value) return;
    //     return {
    //         backgroundColor: "transparent",
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'shadow'
    //             }
    //         },
    //         legend: { itemGap: 35, padding: 15 },
    //         dataset: {
    //             dimensions: ['time', 'Identify', 'Unknown'],
    //             source: value
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '3%',
    //             containLabel: true
    //         },
    //         xAxis: { type: 'time' },
    //         yAxis: { type: 'value' },
    //         series: [
    //         {
    //             name: 'Identify',
    //             type: 'bar',
    //             stack: 'Ad',
    //             dimensions: ['time', 'Identify'],
    //             emphasis: { focus: 'series' }
    //         },
    //         {
    //             name: 'Unknown',
    //             type: 'bar',
    //             stack: 'Ad',
    //             dimensions: ['time', 'Unknown'],
    //             emphasis: { focus: 'series' }
    //         }
    //         ]
    //     }
    // }
}
export default Chart11;