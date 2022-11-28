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
export class Chart2 extends Vue {
    @Model('input')
    value: IDVEventsCategoryByDate;

    private _chart;
    private chart_ready(o) { this._chart = o; window.addEventListener("resize", this.chart_handler); }
    private chart_finished() { window.removeEventListener("resize", this.chart_handler); }
    private chart_handler(o) { this._chart.resize(); }

    getOption() {
        const items = {
            "Black": "#000",
            "White": "#FFF",
            "Gray": "#999",
            "Red": "#F00",
            "Orange": "#FFA500",
            "Yellow": "#FF0",
            "Violet": "#8F00FF",
            "Green": "#0F0",
            "Blue": "#00F",
            "Brown": "#964B00"
        }

        let data = (this as any).chart2_value$;
        if (!data) return;
        return {
            backgroundColor: "transparent",
            title: {
                text: 'Attributes',
                left: 'center',
                top: 20,
                textStyle: {
                color: '#ccc'
                }
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: 'center',
              left: '12%',
              orient: 'vertical'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                itemStyle: {
                    color: (idx) => {
                        return items[idx.name];
                    }
                },
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data
              }
            ]
        }
    }
}
export default Chart2;