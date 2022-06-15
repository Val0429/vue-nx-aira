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

        <BR />
        <fragment v-if="value && value.chartType === 'A'">
            <div v-if="value && ($refs['table']||{}).result" style="font-weight: bold; font-size: 20px">
                <div style="float:left; width: 120px">剩餘資金:</div>{{ toFixedNumber(($refs['table']||{}).result.Funds, 5) }} ETH<BR/>
                <div style="float:left; width: 120px">Looks點數:</div>{{ toFixedNumber(($refs['table']||{}).result.LooksPoints, 5) }}
                {{ '(約 '+ toFixedNumber(($refs['table']||{}).result.LooksPoints*value.looks_eth*value.looks_lookspt,5) +' ETH)' }}
                <BR/>
                <div style="float:left; width: 120px">資產價值:</div>{{ toFixedNumber(($refs['table']||{}).result.Total, 5) }} ETH<BR/>
                <div style="float:left; width: 120px">資產總值:</div>
                {{ toFixedNumber(($refs['table']||{}).result.Funds+($refs['table']||{}).result.Total+($refs['table']||{}).result.LooksPoints*value.looks_eth*value.looks_lookspt, 5) }} ETH
                ( {{ getPercentText( toFixedNumber( (1- (((($refs['table']||{}).result.Funds+($refs['table']||{}).result.Total+($refs['table']||{}).result.LooksPoints*value.looks_eth*value.looks_lookspt)) / value.funds)) * (-1), 5)) }} )        </div>
            <BR />
        </fragment>

        <iv-table
            v-if="value"
            :interface="value.chartType === 'A' ? table_inf() : table_inf_b()"
            :server="{ path: '/looksrare-revenue' }"
            :params="value"
            @update:result="onTableResultChanged"
            ref="table"
        >
            <template #type="{$attrs}">
                {{
                    $attrs.value === "collect" ? "收集Looks點數" :
                    $attrs.value === "offering" ? "在市場開價" :
                    $attrs.value === "bought" ? "成功買入" :
                    $attrs.value === "listing" ? "在市場掛單" :
                    $attrs.value === "sold" ? "意外賣出" :
                    $attrs.value === "message" ? "重要事件" :
                    ""
                }}
            </template>

            <template #date="{$attrs}">
                {{ new Date($attrs.value).getUTCFullYear()+"/"+PadLeft(new Date($attrs.value).getUTCMonth()+1)+"/"+PadLeft(new Date($attrs.value).getUTCDate())+" "+PadLeft(new Date($attrs.value).getUTCHours())+":"+PadLeft(new Date($attrs.value).getUTCMinutes()) }}
            </template>

            <template #duration="{$attrs}">
                {{ getSecondsText($attrs.value / 1000) }}
            </template>

            <template #data="{$attrs}">
                <template v-if="$attrs.row.type === 'collect'">
                    <span v-html="'資產總數: ' + $attrs.row.properties + '<BR>'+'收集點數: ' + $attrs.row.points +'<BR>'+'(約 '+toFixedNumber($attrs.row.points*value.looks_lookspt*value.looks_eth,5)+' ETH)'"></span>
                </template>
                <template v-if="$attrs.row.type === 'offering'">
                    <span v-html="'開價價格: ' + $attrs.row.price + '<BR>'+'開價數量: ' + $attrs.row.properties"></span>
                </template>
                <template v-if="$attrs.row.type === 'bought'">
                    <span v-html="'買入價格: ' + $attrs.row.price"></span>
                </template>
                <template v-if="$attrs.row.type === 'listing'">
                    <span v-html="getListingInfo($attrs.row)"></span>
                </template>
                <template v-if="$attrs.row.type === 'sold'">
                    <span v-html="'買入價格: ' + $attrs.row.bought_price + '<BR>'+'賣出價格: ' + toFixedNumber($attrs.row.sold_price, 3) + '<BR>'+'手續費: ' + toFixedNumber($attrs.row.royalty,3) + '<BR>'+'實際收入: ' + toFixedNumber($attrs.row.sold_price-$attrs.row.royalty-$attrs.row.bought_price, 3)"></span>
                </template>
                <template v-if="$attrs.row.type === 'message'">
                    <span v-html="getMessageInfo($attrs.row)" />
                </template>
            </template>
        </iv-table>
    </div>
</template>

<style lang="scss" scoped>
.radioboxes {
    position: absolute;
    right: 100px;
    top: 15px;
    list-style-type: none;
    padding: 0;

    li {
        float: left;
        width: 40px;
        height: 30px;
        position: relative;
    }

    label, input {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }    

    input[type="radio"] {
        opacity: 0.01;
        z-index: 100;

        &:checked+label {
            background: #868;
        }
    }

    label {
        padding: 1px 5px;
        border: 1px solid #557;
        border-radius: 3px;
        cursor: pointer;
        z-index: 90;
        background: #335;
        color: white;
        font-size: 12px;
        text-align: center;

        &:hover {
            background: #446;
        }
    }    
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { NumberHelper, toEnumInterface, toFixedNumber } from '@/../core';
import { detectTradeTypeSuccess, getPercentText, getSecondsText, getUsername, NFTCollections } from '@/helpers';
import $ from 'jquery';
import TradingVue, { DataCube } from 'trading-vue-js';
import Data from './data.json';
import PreviewChartHistoryModal from '@/components/modals/preview-chart-history-modal/preview-chart-history-modal.vue';

@Component({
    components: { TradingVue },
    methods: { getUsername, getSecondsText, toFixedNumber, getPercentText }
})
export default class Chart extends Vue {
    private eth_image_url: string = "https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg";

    /// chart value
    private value: any = null;

    /// chart options
    private chartTypeBOptions = {
        buyStrategy: "買入策略",
        allowLoss: "認賠賣出",
        floorRate: "地板倍率",
        tradeTime: "交易時間"
    }

    /// private helper
    private getMessageInfo(o) {
        return `${o.owner}: <a href="${o.link}" target="_blank">${o.content}</a>`;
    }

    private getListingInfo(o) {
        let result = o.data.reduce((final, value) => {
            let idx = -1;
            let bought_price = value.bought_price;
            let list_price = value.list_price;
            for (let i=0; i<final.length; i++) {
                let obj = final[i];
                if (obj.data.bought_price === bought_price &&
                    obj.data.list_price === list_price) {
                        idx = i; break;
                    }
            }
            if (idx === -1) {
                final.push({
                    data: { bought_price, list_price },
                    count: 1
                })
            } else {
                final[idx].count++;
            }

            return final;
        }, []);

        return result.map(o => {
            return '買入價格: ' + o.data.bought_price + ', 掛單價格: ' + o.data.list_price + ', X ' + o.count;
        }).join("<BR/>");
    }

    /// interaction handler
    private doPreview(o) {
        // let modal = new PreviewChartHistoryModal();
        // (modal as any).setData(o);
        // modal.$modal();
    }

    private filter_submit(value) {
        value.start_date = new Date(value.start_date).toISOString();
        value.end_date = new Date(value.end_date).toISOString();
        this.value = value;
    }

    /// send query
    // private query_chart(param?) {
    //     if (!param) param = {};
    //     !param.duration && (param.duration = this.duration);
    //     !param.nft && (param.nft = this.nft);
    //     this.$server.R("/chart", param)
    //         .then(data => {
    //             this.chartValue = new DataCube(data);
    //         });
    // }

    /// private helpers

    /// interfaces
    private search_inf() {
        let defStart = new Date(2022, 5, 2, 0, 0, 0);
        let defEnd = new Date(2022, 5, 16, 0, 0, 0);

        return `
        interface {
            /**
             * @uiLabel - 核心參數
             * @uiType - iv-form-header
             */
            header1?: any;

            /**
             * @uiLabel - Looks / ETH
             * @uiDefault - 0.0002838
             * @uiColumnGroup - 1
             */
            looks_eth: number;

            /**
             * @uiLabel - Looks / Looks PT
             * @uiDefault - 0.0006256102
             * @uiColumnGroup - 1
             */
            looks_lookspt: number;

            /**
             * @uiLabel - Trade PT / ETH
             * @uiDefault - 16.8754615385
             * @uiColumnGroup - 1
             */
            tradept_eth: number;

            /**
             * @uiLabel - Base PT
             * @uiDefault - 200
             * @uiColumnGroup - 2
             */
            basept: number;

            /**
             * @uiLabel - Gas Fee / ETH
             * @uiDefault - 0.01
             * @uiColumnGroup - 2
             */
            gasfee_eth: number;

            /**
             * @uiLabel - Market Fee %
             * @uiDefault - 2
             * @uiColumnGroup - 3
             */
            market_fee: number;

            /**
             * @uiLabel - Royalty %
             * @uiDefault - 5
             * @uiColumnGroup - 3
             */
            royalty: number;

            /**
             * @uiLabel - 基礎設定
             * @uiType - iv-form-header
             */
            header22?: any;

            /**
             * @uiLabel - 資金 (ETH)
             * @uiDefault - 40
             */
            funds: number;

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
             * @uiLabel - NFT
             * @uiDefault - otherdeed
             */
            nft: ${toEnumInterface(NFTCollections)};

            /**
             * @uiLabel - 手動或自動
             * @uiType - iv-form-header
             */
            header2?: any;

            /**
             * @uiLabel - 手動或自動
             * @uiDefault - manual
             */
            manualOrRobot: ${toEnumInterface({
                manual: "手動",
                auto: "使用機器人"
            })};

            /**
             * @uiLabel - 手動買入時間 (幾點)
             * @uiHidden - ${this.$form("searchform", "manualOrRobot") !== "manual"}
             * @uiDefault - () => [11]
             */
            manualHours: number[];

            /**
             * @uiLabel - 對買賣事件即時反應
             * @uiDefault - () => false
             */
            reactToSoldBought: boolean;

            /**
             * @uiLabel - 成交模擬
             * @uiType - iv-form-header
             */
            header3?: any;

            /**
             * @uiLabel - 成交的規則
             * @uiDefault - less
             * @uiColumnGroup - 1
             */
            dealRuleType: ${toEnumInterface({
                floor: "基於地板價 (買單大於地板則算買入，掛單小於地板則算賣出)",
                less: "基於實際成交價格 (成交價小於開價n個則成交)"
            })};

            /**
             * @uiLabel - 幾個?
             * @uiDefault - 3
             * @uiHidden - ${this.$form("searchform", "dealRuleType") !== "less"}
             * @uiColumnGroup - 1
             */
            dealRuleLessThanPriceNumber: number;

            /**
             * @uiLabel - 買入策略
             * @uiType - iv-form-header
             */
            header4?: any;

            /**
             * @uiLabel - 比前一天均價 (或地板價取小值) 少 N %
             * @uiDefault - 0
             * @uiColumnGroup - 1
             */
            buyRuleLessThanYesterdayAverage: number;

            /**
             * @uiLabel - 賣掉獲利的Looks，進入投資池
             * @uiDefault - () => false
             * @uiColumnGroup - 1
             */
            buyRuleSellAllLooksReward: boolean;

            /**
             * @uiLabel - 掛單策略
             * @uiType - iv-form-header
             */
            header5?: any;

            /**
             * @uiLabel - 地板倍率 (1.0x-1.1x 10倍，1.1x-1.2x 4倍，1.2x-1.3x 2倍，1.3x-1.4x 1倍)
             * @uiDefault - 1.12
             */
            listRuleFloorMultiply: number;

            /**
             * @uiLabel - 啟用機器人重新下單
             * @uiDefault - () => false
             * @uiHidden - ${this.$form("searchform", "manualOrRobot") !== "auto"}
             * @uiColumnGroup - 1
             */
            listRuleEnableRobotAutoRestart: boolean;

            /**
             * @uiLabel - 機器人重新下單下限
             * @uiDefault - 1.08
             * @uiHidden - ${this.$form("searchform", "listRuleEnableRobotAutoRestart") !== true}
             * @uiColumnGroup - 1
             */
            listRuleFloorMultiplyAutoMin: number;

            /**
             * @uiLabel - 機器人重新下單上限
             * @uiDefault - 1.22
             * @uiHidden - ${this.$form("searchform", "listRuleEnableRobotAutoRestart") !== true}
             * @uiColumnGroup - 1
             */
            listRuleFloorMultiplyAutoMax: number;

            /**
             * @uiLabel - 認賠掛單 上限 %
             * @uiDefault - 10
             */
            listRuleLossAllow: number;

            /**
             * @uiLabel - 表單形式
             * @uiType - iv-form-header
             */
            header6?: any;

            /**
             * @uiLabel - 表單形式
             * @uiDefault - A
             */
            chartType: ${toEnumInterface({
                A: "標準",
                B: "比較"
            })};

            /**
             * @uiLabel - 縱軸
             * @uiHidden - ${this.$form("searchform", "chartType") !== "B"}
             * @uiColumnGroup - 1
             * @uiDefault - buyStrategy
             */
            chartTypeBRow: ${toEnumInterface(this.chartTypeBOptions)};

            /**
             * @uiLabel - 橫軸
             * @uiHidden - ${this.$form("searchform", "chartType") !== "B"}
             * @uiColumnGroup - 1
             * @uiDefault - floorRate
             */
            chartTypeBCol: ${toEnumInterface(this.chartTypeBOptions)};

            /**
             * @uiLabel - 其他
             * @uiType - iv-form-header
             */
            header7?: any;

            /**
             * @uiLabel - 忽略 0 點數
             * @uiDefault - () => true
             */
            ignoreZero: boolean;
        }
        `;
    }

    private getChartTypeBLooksETH(v) {
        return toFixedNumber(v.LooksPoints * this.value.looks_lookspt * this.value.looks_eth, 3);
    }
    private getChartTypeBTotalETH(v) {
        return toFixedNumber(v.Funds+v.Total+this.getChartTypeBLooksETH(v), 3);
    }

    private chartTypeBFieldConverter(v) {
        let looks = this.getChartTypeBLooksETH(v);
        let total = this.getChartTypeBTotalETH(v);
        let funds = this.value.funds;
        return `<div style="background: ${this.chartTypeBGetColor(v)}; margin: -12px; padding: 8px 0">
            Looks: ${looks} ETH
            <BR/>
            總額: ${total} ETH 
            (${getPercentText((1-total/funds)*(-1))})
        </div>`;
    }

    private chartTypeBColorMax = 0xC6ECAE;
    private chartTypeBColorMin = 0xFE5F55;
    private chartTypeBLossColorMax = 0x254711;
    private chartTypeBLossColorMin = 0xC6ECAE;
    private chartTypeBWinColorMax = 0xA70C01;
    private chartTypeBWinColorMin = 0xFFAEA9;
    private chartTypeBMinMax: { min: number, max: number } = {} as any;
    private onTableResultChanged(value) {
        if (this.value.chartType !== "B") return;
        let result = value.results.reduce((final, row) => {
            Object.keys(row).forEach(key => {
                if (key === "title") return;
                let col = row[key];
                let value = this.getChartTypeBTotalETH(col);
                final.min = Math.min(value, final.min);
                final.max = Math.max(value, final.max);
            });
            return final;
        }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

        this.chartTypeBMinMax = result;
    }
    private chartTypeBGetColor(v) {
        let { min, max } = this.chartTypeBMinMax;
        if (!min || !max) return;
        let value = this.getChartTypeBTotalETH(v);
        let baseValue = this.value.funds;

        let minR, minG, minB, maxR, maxG, maxB, R, G, B;
        if (value >= baseValue) {
            minR = (this.chartTypeBWinColorMin & 0xFF0000) / (Math.pow(16, 4));
            minG = (this.chartTypeBWinColorMin & 0x00FF00) / (Math.pow(16, 2));
            minB = (this.chartTypeBWinColorMin & 0x0000FF) / 1;
            maxR = (this.chartTypeBWinColorMax & 0xFF0000) / (Math.pow(16, 4));
            maxG = (this.chartTypeBWinColorMax & 0x00FF00) / (Math.pow(16, 2));
            maxB = (this.chartTypeBWinColorMax & 0x0000FF) / 1;
            R = Math.floor(minR+(maxR-minR)*((value-baseValue)/(max-baseValue))).toString(16);
            G = Math.floor(minG+(maxG-minG)*((value-baseValue)/(max-baseValue))).toString(16);
            B = Math.floor(minB+(maxB-minB)*((value-baseValue)/(max-baseValue))).toString(16);

        } else {
            minR = (this.chartTypeBLossColorMin & 0xFF0000) / (Math.pow(16, 4));
            minG = (this.chartTypeBLossColorMin & 0x00FF00) / (Math.pow(16, 2));
            minB = (this.chartTypeBLossColorMin & 0x0000FF) / 1;
            maxR = (this.chartTypeBLossColorMax & 0xFF0000) / (Math.pow(16, 4));
            maxG = (this.chartTypeBLossColorMax & 0x00FF00) / (Math.pow(16, 2));
            maxB = (this.chartTypeBLossColorMax & 0x0000FF) / 1;
            R = Math.floor(minR+(maxR-minR)*((value-baseValue)/(min-baseValue))).toString(16);
            G = Math.floor(minG+(maxG-minG)*((value-baseValue)/(min-baseValue))).toString(16);
            B = Math.floor(minB+(maxB-minB)*((value-baseValue)/(min-baseValue))).toString(16);
        }

        return `#${this.PadLeft(R, '0', 2)}${this.PadLeft(G, '0', 2)}${this.PadLeft(B, '0', 2)}`;
    }

    private table_inf_b() {
        let tt = ((this.$refs['table']||{} as any).result||{} as any).results;

        let result;
        if (tt && tt.length > 0) {
            let row = tt[0];
            result = Object.keys(row).map((key, idx) => {
                if (key === "title") return;
                return `
            /**
             * @uiLabel - ${key.replace("column_", "").replace("_", ".")}
             * @uiType - iv-cell-html-string
             * @uiConverter - chartTypeBFieldConverter
             **/
            ${key}: any;
                `;
            }).filter(v => !!v).join("\r\n");

            result = `
            /**
             * @uiLabel - ${this.chartTypeBOptions[this.value.chartTypeBRow]} | ${this.chartTypeBOptions[this.value.chartTypeBCol]}
             */
            title: string;
            ` + result;

        }

        return (!tt || tt.length === 0) ? null : `
        interface {
${result}
        }
        `;
    }

    private table_inf() {
        return `
        interface {
            /**
             * @uiLabel - 類別
             */
            type: string;
            /**
             * @uiLabel - 日期
             */
            date: Date;
            /**
             * @uiLabel - 持續時間
             */
            duration: string;

            /**
             * @uiLabel - 當前地板價
             */
            floor: number;

            /**
             * @uiLabel - 詳細資訊
             */
            data: any;
        }
        `;
    }

    PadLeft(str: string, char: string = '0', length: number = 2): string {
        str += "";
        while (str.length < length) {
            str = `${char}${str}`;
        }
        return str;
    }
}
</script>
