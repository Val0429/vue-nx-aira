<template>
    <div key="main" style="padding: 5px 10px">

        <!-- filter -->
        <iv-auto-card
            label="搜尋條件" :visible="true"
            >
            <iv-form
                ref="searchform"
                :interface="search_inf()"
                :data="{ 't-submit': _('w_Filter'), 't-reset': _('wb_Reset') }"
                @submit="filter_submit"
                @reset="filter_submit"
                />
        </iv-auto-card>

        <iv-scrollbar>
            <iv-table
                v-if="value"
                :interface="value.chartType == 'A' ? table_inf() : value.chartType == 'B' ? table_inf_B() : table_inf_C()"
                :server="{ path: '/saleanalyze' }"
                :params="value"
                ref="table"
            >
                <template #avg_floor="{$attrs}">
                    {{ toFixedPrice($attrs.value) + " / " + getPercentText($attrs.row.avg_floor_diff) }}
                </template>

                <template v-for="num in percents_list" v-slot:[getVKey(num)]="{$attrs}">
                    {{ toFixedPrice($attrs.value) + " / " + getPercentText($attrs.row["v_"+num+"_price_diff"]) }}
                </template>

                <template v-for="num in stages_list" v-slot:[getBKey(num)]="{$attrs}">
                    {{ $attrs.value + " / " + getPercentPlainText($attrs.row[getBKey2(num)]) }}
                </template>
            </iv-table>
        </iv-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { NumberHelper, toEnumInterface } from '@/../core';
import { detectTradeTypeSuccess, getPercentText, getUsername, getUTCDateString, NFTCollections, toFixedPrice } from '@/helpers';
import $ from 'jquery';
import TradingVue, { DataCube } from 'trading-vue-js';
import Data from './data.json';
import PreviewChartHistoryModal from '@/components/modals/preview-chart-history-modal/preview-chart-history-modal.vue';

@Component({
    methods: { toFixedPrice, getUTCDateString, getPercentText }
})
export default class Chart extends Vue {
    /// value
    private value: any = null;
    private nft: any = "proof-moonbirds";
    private percents_list = [1,5,10,15,20,25,30,35,40,45,50,55,60,65,70];
    private stages_list = [-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40];
    private timezones = {
        all: "全部時區",
        us: "歐美時區",
        asia: "亞洲時區"
    };

    /// interaction handler
    private filter_submit(value) {
        value.start_date = new Date(value.start_date).toISOString();
        value.end_date = new Date(value.end_date).toISOString();
        this.value = value;
    }

    /// private helpers
    private toFixedPrice(num) { return toFixedPrice(num, 3); }
    private getUTCDateString(date: Date) { return getUTCDateString(new Date(date)); }
    private getPercentPlainText(value: number) { return getPercentText(value, false); }
    private getPercentText(value: number) { return getPercentText(value); }
    private getVKey(num) { return `v_${num}_price`; }
    private getBKey(num) { return `v_${num < 0 ? 'N' : ''}${Math.abs(num)}_volume` };
    private getBKey2(num) { return `v_${num < 0 ? 'N' : ''}${Math.abs(num)}_volume_percent` };
    private getTimezoneText(str) { return this.timezones[str] };

    /// basic helper
    mounted() {
    }

    /// interfaces
    private search_inf() {
        let now = new Date();
        let defStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()-11);
        let defEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate()-1);
        return `
        interface {
            /**
             * @uiLabel - NFT
             * @uiDefault - proof-moonbirds
             */
            nft: ${toEnumInterface(NFTCollections)};

            /**
             * @uiLabel - 開始日期
             * @uiDefault - ${defStart}
             * @uiType - iv-form-date
             */
            start_date: Date;

            /**
             * @uiLabel - 結束日期
             * @uiDefault - ${defEnd}
             * @uiType - iv-form-date
             */
            end_date: Date;

            /**
             * @uiLabel - 時區
             * @uiDefault - all
             */
            timezone: ${toEnumInterface(this.timezones, true)};

            /**
             * @uiLabel - 圖表類型
             * @uiDefault - A
             */
            chartType: ${toEnumInterface({
                A: "圖表類型A",
                B: "圖表類型B",
                C: "圖表類型C"
            })};
        }
        `;
    }

    private table_inf_C() {
        // [v_n_volume: string]: number;
        // [v_n_volume_percent: string]: number;
        let percents = this.stages_list.map((value) => {
            return `
            /**
             * @uiLabel - ${value}%
             */
            v_${value < 0 ? 'N' : ''}${Math.abs(value)}_volume: number;
            `;
        }).join("\r\n");

        return `
        interface {
            /**
             * @uiLabel - 小時
             */
            hour: string;

            /**
             * @uiLabel - 交易量
             */
            volume: number;

            ${percents}
        };
        `;                
    }

    private table_inf_B() {
        // [v_n_volume: string]: number;
        // [v_n_volume_percent: string]: number;
        let percents = this.stages_list.map((value) => {
            return `
            /**
             * @uiLabel - ${value}%
             */
            v_${value < 0 ? 'N' : ''}${Math.abs(value)}_volume: number;
            `;
        }).join("\r\n");

        return `
        interface {
            /**
             * @uiLabel - 日期
             * @uiConverter - getUTCDateString
             */
            date: string;
            
            /**
             * @uiLabel - 時區
             * @uiConverter - getTimezoneText
             */
            timezone: ${toEnumInterface(this.timezones)};

            /**
             * @uiLabel - 地板價
             */
            avg_floor: number;
            /**
             * @uiLabel - 交易量
             */
            volume: number;

            ${percents}
        };
        `;        
    }

    private table_inf() {
        let percents = this.percents_list.map((value) => {
            return `
            /**
             * @uiLabel - ${value}%
             */
            v_${value}_price: number;
            `;
            // /**
            //  * @uiLabel - ${value}% 價格漲跌
            //  */
            // v_${value}_price_diff: number;
        }).join("\r\n");

        return `
        interface {
            /**
             * @uiLabel - 日期
             * @uiConverter - getUTCDateString
             */
            date: string;
            
            /**
             * @uiLabel - 時區
             * @uiConverter - getTimezoneText
             */
            timezone: ${toEnumInterface(this.timezones)};

            /**
             * @uiLabel - 地板價
             */
            avg_floor: number;
            /**
             * @uiLabel - 交易量
             */
            volume: number;

            ${percents}
        };
        `;
    }
}
</script>
