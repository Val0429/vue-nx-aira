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
export class Chart3 extends Vue {
    @Model('input')
    value: IDVEventsCategoryByDate;

    private _chart;
    private chart_ready(o) { this._chart = o; window.addEventListener("resize", this.chart_handler); }
    private chart_finished() { window.removeEventListener("resize", this.chart_handler); }
    private chart_handler(o) { this._chart.resize(); }

    getOption() {
        let data = (this as any).chart3_value$;
        if (!data) return;
        return {
          backgroundColor: "transparent",
          title: {
            text: 'Identify',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '70%',
              center: ['50%', '50%'],
              data,
              roseType: 'radius',
              label: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: '#007fff',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        }
    }
}
export default Chart3;