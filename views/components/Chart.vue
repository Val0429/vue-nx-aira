<template>
    <div key="main" style="padding: 5px 10px">

        <!-- filter -->
        <iv-auto-card
            label="Search" :visible="true"
            >
            <iv-form
                :interface="search_inf()"
                :data="{ 't-submit': _('w_Filter'), 't-reset': _('wb_Reset') }"
                @submit="filter_submit"
                @reset="filter_submit"
                />
        </iv-auto-card>

        <!-- chart -->
        <div @wheel.stop="() => {}"
            style="position: relative">
            <trading-vue
                titleTxt="Val Chart"
                :data="chartValue"
                @grid-mousedown="chart_clicked"
                :width="width" :height="height" ref="Trading">
            </trading-vue>
            <ul class="radioboxes">
                <li>
                    <input type="radio" id="10m" value="10" name="duration" v-model="duration" @change="duration_submit">
                    <label for="10m">10分</label>
                </li>
                <li>
                    <input type="radio" id="1h" value="60" name="duration" v-model="duration" @change="duration_submit">
                    <label for="1h">1時</label>
                </li>
                <li>
                    <input type="radio" id="3h" value="180" name="duration" v-model="duration" @change="duration_submit">
                    <label for="3h">3時</label>
                </li>
                <li>
                    <input type="radio" id="1d" value="1440" name="duration" v-model="duration" @change="duration_submit">
                    <label for="1d">1天</label>
                </li>
                <li>
                    <input type="radio" id="10d" value="14400" name="duration" v-model="duration" @change="duration_submit">
                    <label for="10d">10天</label>
                </li>
            </ul>
        </div>

        <!-- table -->
        <BR />
        <div v-if="duration && nft && date" style="font-weight: bold; font-size: 20px">
        從 {{ date.toLocaleString() }} 起，
        {{
            +duration < 60 ? (duration)+'分鐘' :
            +duration < 24*60 ? (duration/60)+'小時' :
            (+duration/(24*60))+'天'
        }}
        內，共 {{ ($refs["table"]||{}).total }} 筆
        </div>
        <BR />

        <iv-table
            v-if="duration && nft && date"
            :interface="table_inf()"
            :server="{ path: '/chart/data' }"
            :params="{ duration, nft, date: date.toISOString() }"
            ref="table"
        >
            <template #actions$="{$attrs}">
                <iv-toolbox-view @click.stop="doPreview($attrs.row)" />
            </template>

            <template #trade_type="{$attrs}">
                {{
                    detectTradeTypeSuccess($attrs.row) === 0 ? '限價交易' :
                    detectTradeTypeSuccess($attrs.row) === 1 ? '接受喊價' :
                    '英式拍賣成立'
                }}
            </template>

            <template #total_price="{$attrs}">
                <div style="display: flex; align-items: center; justify-content: center; flex-flow: row wrap;">
                    <img :src="eth_image_url" title="ETH" style="height: 20px; margin-right: 6px" />
                    {{ toFixedPrice($attrs.value * $attrs.row.payment_token.eth_price) }}
                    
                    <fragment v-if="$attrs.row.payment_token.symbol != 'ETH' && $attrs.row.payment_token.symbol != 'WETH'">
                        <BR/>
                        <span style="margin-left: 10px">(<img :src="$attrs.row.payment_token.image_url" :title="$attrs.row.payment_token.symbol" style="height: 20px; margin-right: 6px" />{{ toFixedPrice($attrs.value) }})</span>
                    </fragment>
                </div>
                <fragment v-if="$attrs.row.floor > $attrs.value * $attrs.row.payment_token.eth_price">
                    <div width="100%" />
                    <span style="margin-left: 10px"><img src="@/assets/images/lower.svg" style="height: 20px" />
                    ({{ "-" + toFixedPrice((1 - $attrs.value * $attrs.row.payment_token.eth_price / $attrs.row.floor)*100) + "%" }}
                    )</span>
                </fragment>
            </template>

            <template #floor="{$attrs}">
                <div style="display: flex; align-items: center; justify-content: center;">
                    <img :src="eth_image_url" title="ETH" style="height: 20px; margin-right: 6px" />
                    {{ toFixedPrice($attrs.value) }}
                </div>
            </template>

            <template #appearance="{$attrs}">
                <a :href="$attrs.row.asset.permalink" target="_blank"><img :src="$attrs.row.asset.image_url" :title="'#'+$attrs.row.asset.token_id" style="height: 60px" /></a>
            </template>

            <template #buyer="{$attrs}">
                <a :href="'https://opensea.io/'+$attrs.row.seller.address" target="_blank">{{ getUsername($attrs.row.seller) }}</a> / <BR/>
                <a :href="'https://opensea.io/'+$attrs.row.winner_account.address" target="_blank">{{ getUsername($attrs.row.winner_account) }}</a>
            </template>

            <template #rank="{$attrs}">
                <span :style="{ 'font-weight': $attrs.value.rank/$attrs.value.total <= 0.5 ? 'bold' : 'normal', color: $attrs.value.rank/$attrs.value.total <= 0.15 ? 'gold' : $attrs.value.rank/$attrs.value.total <= 0.3 ? 'orange' : $attrs.value.rank/$attrs.value.total <= 0.5 ? '#995000' : 'black' }">{{ $attrs.value.rank }}</span> {{ " / " + $attrs.value.total }}
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
import { Component, Vue } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { NumberHelper, toEnumInterface } from '@/../core';
import { detectTradeTypeSuccess, getUsername } from '@/helpers';
import $ from 'jquery';
import TradingVue, { DataCube } from 'trading-vue-js';
import Data from './data.json';
import PreviewChartHistoryModal from '@/components/modals/preview-chart-history-modal/preview-chart-history-modal.vue';

@Component({
    components: { TradingVue },
    methods: { getUsername }
})
export default class Chart extends Vue {
    private width: any = null;
    private height: any = 500;
    private eth_image_url: string = "https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg";

    /// chart value
    private chartValue: any = {};
    private tableValue: any = {};

    private nft: any = "proof-moonbirds";
    private duration: any = "60";
    private date: Date = null;

    /// interaction handler
    private doPreview(o) {
        // modal.$on("success", () => (modal as any).visible = false);
        let modal = new PreviewChartHistoryModal();
        (modal as any).setData(o);
        modal.$modal();
    }

    private chart_clicked(o) {
        let data = this.$vref('Trading').getCursor().values[0].Candles_0;
        this.date = new Date(data[0]);
    }

    private filter_submit(value) {
        if (!value.nft) this.chartValue = new DataCube({});
        else {
            this.nft = value.nft;
            this.query_chart(value);
        }
    }

    private duration_submit(value) {
        this.query_chart();
    }

    /// send query
    private query_chart(param?) {
        if (!param) param = {};
        !param.duration && (param.duration = this.duration);
        !param.nft && (param.nft = this.nft);
        this.$server.R("/chart", param)
            .then(data => {
                this.chartValue = new DataCube(data);
            });
    }

    /// private helpers
    private detectTradeTypeSuccess(data) {
        return detectTradeTypeSuccess(data);
    }
    private toFixedPrice(num, digits = 3) {
        return NumberHelper.toFixedNumber(num, digits);
    }

    /// basic helper
    private onResize() {
        setTimeout(() => {
            this.width = $(this.$el).width();
        }, 200);
    }

    mounted() {
        this.onResize();
        this.query_chart();
        window.addEventListener('resize', this.onResize)
    }
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    }    

    /// interfaces
    private search_inf() {
        return `
        interface {
            /**
             * @uiLabel - NFT
             * @uiDefault - proof-moonbirds
             */
            nft?: ${toEnumInterface({
                "proof-moonbirds": "Moonbirds",
                "boredapeyachtclub": "Bored Ape Yacht Club",
                "mutant-ape-yacht-club": "Mutant Ape Yacht Club",
                "meebits": "Meebits"
            })}
        }
        `;
    }
    private table_inf() {
        return `
        interface {
            /**
             * @uiLabel - 成交價格
             */
            total_price: number;
            /**
             * @uiLabel - 當前地板價
             */
            floor: number;
            /**
             * @uiLabel - 交易類別
             */
            trade_type: string;
            /**
             * @uiLabel - 外觀
             */
            appearance: any;
            /**
             * @uiLabel - 稀有度
             */
            rank: any;
            /**
             * @uiLabel - 賣家/買家
             */
            buyer: any;
            /**
             * @uiLabel - 事件日期
             */
            created_date: Date;
        };
        `;
    }
}
</script>
