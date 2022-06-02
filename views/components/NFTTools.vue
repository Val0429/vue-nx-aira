<template>
    <div key="main" style="padding: 5px 10px">

        <!-- filter -->
        <iv-card
            label="設定值" :visible="true"
            >
            <iv-form
                ref="setupform"
                :interface="setup_inf()"
                @update:*="setupUpdated"
                />
        </iv-card>

        <iv-card
            label="買進小工具" :visible="true"
            >
            <iv-form
                ref="buyform"
                :interface="buy_inf()"
                />
        </iv-card>
        <BR />
        <iv-auto-card
            label="賣出小工具" :visible="true"
            >
            <iv-form
                ref="sellform"
                :interface="sell_inf()"
                />
        </iv-auto-card>
    </div>
</template>

<style lang="scss" scoped>
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

enum NFTToolsMarket {
    Looks = 0,
    Opensea = 1
}

@Component({
    components: { TradingVue },
    methods: { getUsername, getSecondsText, toFixedNumber, getPercentText }
})
export default class NFTTools extends Vue {
    private mounted() {
        this.$server.R("/nfttools/yesfloor")
            .then((v: any) => {
                if (v.floor) {
                    (this.$refs.setupform as any).set("yesterdayFloor", v.floor);
                } else {
                    (this.$refs.setupform as any).set("yesterdayFloor", "昨日資料尚未整理完成");
                }
            })
            .catch(e => {
                (this.$refs.setupform as any).set("yesterdayFloor", "伺服器連線失敗");
            });
    }

    private setup_inf() {
        return `
        interface {
            /**
             * @uiLabel - 核心參數
             * @uiType - iv-form-header
             */
            header0?: any;

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
             * @uiLabel - 價位
             * @uiType - iv-form-header
             */
            header1?: any;

            /**
             * @uiLabel - 昨日平均地板價
             * @uiType - iv-form-label
             * @uiDefault - () => "正在取得..."
             */
            yesterdayFloor: string;

            /**
             * @uiLabel - 現在地板價
             */
            todayFloor: string;

            /**
             * @uiLabel - 買入策略
             * @uiType - iv-form-header
             */
            header4?: any;

            /**
             * @uiLabel - 比前一天均價 (或地板價取小值) 少 N %
             * @uiDefault - 10
             * @uiColumnGroup - 1
             */
            buyRuleLessThanYesterdayAverage: number;

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
             * @uiLabel - 認賠掛單 上限 %
             * @uiDefault - 10
             */
            listRuleLossAllow: number;
        }
        `;
    }

    private setupUpdated(v) {
        (this.$refs.buyform as any).set("suggestL", this.suggestBuyPrice(NFTToolsMarket.Looks));
        (this.$refs.buyform as any).set("suggestO", this.suggestBuyPrice(NFTToolsMarket.Opensea));
        (this.$refs.sellform as any).set("suggest", this.suggestSellPrice(NFTToolsMarket.Looks));        
    }

    private suggestBuyPrice(market: NFTToolsMarket) {
        let form = (this.$refs.setupform as any);
        if (!form) return "";
        let result = form.getResult();
        let yesFloor = result.yesterdayFloor;
        let todayFloor = result.todayFloor;
        let buyRate = result.buyRuleLessThanYesterdayAverage || 0;

        let looks_lookspt = result.looks_lookspt;
        let looks_eth = result.looks_eth;
        let tradept_eth = result.tradept_eth;
        if (!yesFloor || !todayFloor ||
            !tradept_eth || !looks_lookspt || !looks_eth) return "";

        let price = Math.min(yesFloor, todayFloor) * ((100-buyRate)/100);
        if (market === NFTToolsMarket.Opensea) price += price*tradept_eth*looks_lookspt*looks_eth;
        return price;
    }
    private suggestSellPrice(market: NFTToolsMarket) {
        let form = (this.$refs.setupform as any);
        if (!form) return "";
        let result = form.getResult();
        let todayFloor = result.todayFloor;
        let floorMultiply = result.listRuleFloorMultiply;
        let lossAllow = result.listRuleLossAllow || 0;
        if (!todayFloor || !floorMultiply) return "";

        // let buyprice = property.offer.price;
        let rate = floorMultiply;
        const royalty = 5;
        let market_fee = market === 0 ? 2 : 2.5;
        let lossallow = lossAllow - market_fee - royalty;

        let currentFloor = todayFloor;
        // let determinedPrice = Math.max(currentFloor*rate, buyprice/(1+lossallow/100));

        let determinedPrice = currentFloor * rate;
        return determinedPrice;
    }
    private buy_inf() {
        return `
        interface {
            /** 
             * @uiLabel - 計算值
             * @uiType - iv-form-header
             */
            header1?: string;

            /**
             * @uiLabel - Looksrare 建議買進價
             * @uiType - iv-form-label
             */
            suggestL?: string;

            /**
             * @uiLabel - Opensea 建議買進價
             * @uiType - iv-form-label
             */
            suggestO?: string;
        }
        `;
    }
    private sell_inf() {
        return `
        interface {
            /**
             * @uiLabel - 建議掛單價
             * @uiType - iv-form-label
             */
            suggest?: string;
        }
        `;
    }
}
</script>
