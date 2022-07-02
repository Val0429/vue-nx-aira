<template>
    <div key="main" style="padding: 5px 10px">

        <iv-button @click="metamask_connect" variant="info" size="lg" style="margin-bottom: 10px">連線 Metamask</iv-button>

        <!-- filter -->
        <iv-auto-card
            label="設定值" :visible="true"
            >
            <iv-form
                ref="setupform"
                :interface="setup_inf()"
                @submit="form_submit"
                />
            <iv-card
                label="掛單策略" :visible="false"
                >
                <iv-form ref="setuplistform"
                    :interface="setuplist_inf()"
                    />
            </iv-card>
            <iv-card
                label="核心參數" :visible="false"
                >
                <iv-form ref="setupcoreform"
                    :interface="setupcore_inf()"
                    />
            </iv-card>
        </iv-auto-card>

        <!-- sell result -->
        <iv-card label="掛單建議" v-if="result">
            <iv-table
                :interface="sell_suggestion_inf()"
                :data="{ paging: { page: 1, pageSize: result.sell.length, total: result.sell.length, totalPages: 1 }, results: result.sell }"
                :multiple="true"
                >
                <template #sold_date="{$attrs}">
                    {{ getSecondsText((new Date().valueOf()-new Date($attrs.value).valueOf())/1000)+"前" }}
                </template>

                <template #bought_price="{$attrs}">
                    <img :src="eth_image_url" title="WETH" style="height: 20px; margin-right: 6px" />
                    {{ toFixedNumber($attrs.value, 6) }}
                </template>
                
                <template #image_url="{$attrs}">
                    <ivc-NFT-item :attrs="$attrs" />
                </template>

                <template #trait_feature="{$attrs}">
                    <span v-html="convertTraitString($attrs.value)" />
                </template>

                <template #rating="{$attrs}">
                    <div style="display: flex; flex-direction: row">
                        <iv-form-selection :data="{'allow-clear': false}" :disabled="$attrs.row.rating_enabled !== true" :value="$attrs.value" @input="rating_changed($attrs.row, $event)" :options="toFormOptions(rating)" placeholder="未定" style="transform: scale(0.8); margin-bottom: 0; flex: 1" />
                        <b-button size="sm" style="flex: 0 0 30px; margin-top: 2px; margin-bottom: 2px" @click="rating_enable($attrs.row)">
                            <i :class="{ fa: true, 'fa-lock': $attrs.row.rating_enabled !== true, 'fa-unlock': $attrs.row.rating_enabled }" />
                        </b-button>
                    </div>
                </template>

                <template #looksrare_listing_price="{$attrs}">
                    <ivc-crypto-price :value="$attrs.value" />
                    <ivc-crypto-price :value="$attrs.row.looksrare_sell_revenue" />
                    ( <ivc-percent-text :value="$attrs.row.looksrare_sell_revenue" :refValue="$attrs.row.bought_price" type="normal" /> )
                </template>
                <template #opensea_listing_price="{$attrs}">
                    <ivc-crypto-price :value="$attrs.value" :digits="6" />
                    <ivc-crypto-price :value="$attrs.row.opensea_sell_revenue" />
                    ( <ivc-percent-text :value="$attrs.row.opensea_sell_revenue" :refValue="$attrs.row.bought_price" type="normal" /> )
                </template>
                <template #x2y2_listing_price="{$attrs}">
                    <ivc-crypto-price :value="$attrs.value" :digits="6" />
                    <ivc-crypto-price :value="$attrs.row.x2y2_sell_revenue" />
                    ( <ivc-percent-text :value="$attrs.row.x2y2_sell_revenue" :refValue="$attrs.row.bought_price" type="normal" /> )
                </template>
                
                <template #goOL="{$attrs}">
                    <a :href="'https://looksrare.org/collections/0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258/' + $attrs.row.token_id" target="_blank" @click.stop>
                        <img :src="looksrare_image_url" title="Go Looksrare" style="height: 20px; margin-right: 6px" />
                    </a>
                    <!-- <a :href="'https://opensea.io/assets/ethereum/0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258/' + $attrs.row.token_id" target="_blank" @click.stop>
                        <img :src="opensea_image_url" title="Go Opensea" style="height: 20px; margin-right: 6px" />
                    </a> -->
                    <img :src="opensea_image_url" title="Go Opensea" style="height: 20px; margin-right: 6px" @click="metamask_request_sell($attrs.row)" />
                </template>

            </iv-table>
        </iv-card>

        <!-- buy result -->
        <iv-card label="買入建議" v-if="result">
            <iv-table
                :interface="buy_suggestion_inf()"
                :data="{ paging: { page: 1, pageSize: result.buy.length, total: result.buy.length, totalPages: 1 }, results: result.buy }"
                :multiple="true"
                >
                <template #price="{$attrs}">
                    <img :src="eth_image_url" title="WETH" style="height: 20px; margin-right: 6px" />
                    {{ $attrs.value }}
                </template>
                <template #total="{$attrs}">
                    <img :src="eth_image_url" title="WETH" style="height: 20px; margin-right: 6px" />
                    {{ $attrs.row.price * $attrs.row.count }}
                </template>
                <template #goOL="{$attrs}">
                    <a href="https://looksrare.org/collections/0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258?queryID=1fb3dfaf04380bed06d52ad7cf51363a&queryIndex=prod_tokens" target="_blank" @click.stop>
                        <img :src="looksrare_image_url" title="Go Looksrare" style="height: 20px; margin-right: 6px" />
                    </a>
                    <a href="https://opensea.io/collection/otherdeed" target="_blank" @click.stop>
                        <img :src="opensea_image_url" title="Go Opensea" style="height: 20px; margin-right: 6px" />
                    </a>
                </template>
            </iv-table>
            <div style="margin-top: 3px">
                若都買入後的餘額:&nbsp;&nbsp;&nbsp;<img :src="eth_image_url" title="WETH" style="height: 20px; margin-right: 6px" />
                {{ toFixedNumber(result.remain, 5) }}
            </div>
        </iv-card>

    </div>
</template>

<style lang="scss" scoped>
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RegisterRouter } from '@/../core/router';
import { NumberHelper, toEnumInterface, toFixedNumber } from '@/../core';
import { detectTradeTypeSuccess, getPercentText, getSecondsText, getUsername, NFTCollections, toFixedPrice, convertTraitString } from '@/helpers';
import $ from 'jquery';
import TradingVue, { DataCube } from 'trading-vue-js';
import Data from './data.json';
import PreviewChartHistoryModal from '@/components/modals/preview-chart-history-modal/preview-chart-history-modal.vue';
import { OpenSeaPort, Network } from "opensea-js";
import NFTItem from "@/components/NFT/NFT-item/NFT-item.vue";
import CryptoPrice from "@/components/NFT/crypto-price/crypto-price.vue";
import PercentText from "@/components/NFT/percent-text/percent-text.vue";

enum NFTToolsMarket {
    Looks = 0,
    Opensea = 1
}

@Component({
    components: { TradingVue, "ivc-NFT-item": NFTItem, "ivc-percent-text": PercentText, "ivc-crypto-price": CryptoPrice },
    methods: { getUsername, getSecondsText, toFixedNumber, getPercentText, toEnumInterface, convertTraitString }
})
export default class NFTTools extends Vue {
    private eth_image_url: string = "https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg";
    private opensea_image_url: string = "https://opensea.io/static/images/logos/opensea.svg";
    private looksrare_image_url: string = "https://s2.coinmarketcap.com/static/img/coins/200x200/17081.png";
    private rating = { U: "Custom", A: "A", B: "B", C: "C", D: "D", E: "E", F: "F" };

    private result = null;

    private form_submit(value) {
        /// translate
        value.buyRuleLessThanYesterdayAverage = btoa(JSON.stringify(value.buyRuleLessThanYesterdayAverage));
        /// add core
        value.core = (this.$refs.setupcoreform as any).getResult();
        /// add listing
        value.listing = (this.$refs.setuplistform as any).getResult();

        this.$server.R("/nftautotools/suggestion", value)
            .then((value) => {
                // console.log("what I got", value);
                this.result = value;
            });
    }

    private mounted() {
        let setupform = (this.$refs.setupform as any);
        this.$server.R("/nftautotools/stats")
            .then((v: any) => {
                if (v.yesFloor) {
                    setupform.set("funds", v.balance);
                    setupform.set("funds_eth", v.balance_eth);
                    setupform.set("current_value_eth", v.current_value_eth);
                    setupform.set("yesterdayFloor", v.yesFloor);
                    setupform.set("todayFloorL", v.looksrareFloor);
                    setupform.set("todayFloorO", v.openseaFloor);
                    setupform.set("avgYes", toFixedPrice(v.volumeYes,2) + " 個 / " + toFixedPrice(v.volumePriceYes,2) + " ETH");
                    setupform.set("avg3", toFixedPrice(v.volume3,2) + " 個 / " + toFixedPrice(v.volumePrice3,2) + " ETH");
                    setupform.set("avg7", toFixedPrice(v.volume7,2) + " 個 / " + toFixedPrice(v.volumePrice7,2) + " ETH");
                    setupform.set("avg14", toFixedPrice(v.volume14,2) + " 個 / " + toFixedPrice(v.volumePrice14,2) + " ETH");
                    setupform.set("avg30", toFixedPrice(v.volume30,2) + " 個 / " + toFixedPrice(v.volumePrice30,2) + " ETH");
                    setupform.set("avg90", toFixedPrice(v.volume90,2) + " 個 / " + toFixedPrice(v.volumePrice90,2) + " ETH");
                } else {
                    setupform.set("yesterdayFloor", "昨日資料尚未整理完成");
                }
            })
            .catch(e => {
                setupform.set("yesterdayFloor", "伺服器連線失敗");
            });
    }

    private sell_suggestion_inf() {
        return `
        interface {
            /**
             * @uiLabel - 買進時間
             */
            sold_date: Date;

            /**
             * @uiLabel - 買進價格
             */
            bought_price: number;
            
            /**
             * @uiLabel - 寶物
             */
            image_url: string;

            /**
             * @uiLabel - 特徵
             */
            trait_feature: any;

            /**
             * @uiLabel - 評級
             */
            rating: ${toEnumInterface(this.rating)};

            /**
             * @uiLabel - Looksrare建議賣價
             */
            looksrare_listing_price: number;

            /**
             * @uiLabel - Opensea建議賣價
             */
            opensea_listing_price: number;

            /**
             * @uiLabel - X2Y2建議賣價
             */
            x2y2_listing_price: number;

            /**
             * @uiLabel - 　
             */
            goOL: any;
        }
        `;
    }

    private buy_suggestion_inf() {
        return `
        interface {
            /**
             * @uiLabel - 買入價格
             */
            price: number;

            /**
             * @uiLabel - 低於地板 %
             * @uiConverter - (v) => v + '%'
             */
            less: number;

            /**
             * @uiLabel - 數量
             */
            count: number;

            /**
             * @uiLabel - 總價值
             */
            total: number;

            /**
             * @uiLabel - 　
             */
            goOL: any;
        }
        `;
    }

    private setuplist_inf() {
        return `
        interface {

            /**
             * @uiLabel - 地板倍率 (1.0x-1.1x 10倍，1.1x-1.2x 4倍，1.2x-1.3x 2倍，1.3x-1.4x 1倍)
             * @uiDefault - 1.1
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

    private setupcore_inf() {
        return `
        interface {
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
             * @uiLabel - Trade ETH / ETH
             * @uiDefault - 0.01
             * @uiColumnGroup - 1
             */
            tradept_eth: number;
        }
        `;
    }

    private setup_inf() {
        return `
        interface {
            /**
             * @uiLabel - 價位
             * @uiType - iv-form-header
             */
            header1?: any;

            /**
             * @uiLabel - 昨日量/值
             * @uiType - iv-form-label
             * @uiColumnGroup - 1
             */
            avgYes?: string;
            /**
             * @uiLabel - 3日平均量/值
             * @uiType - iv-form-label
             * @uiColumnGroup - 1
             */
            avg3?: string;
            /**
             * @uiLabel - 7日平均量/值
             * @uiType - iv-form-label
             * @uiColumnGroup - 1
             */
            avg7?: string;
            /**
             * @uiLabel - 14日平均量/值
             * @uiType - iv-form-label
             * @uiColumnGroup - 1
             */
            avg14?: string;
            /**
             * @uiLabel - 30日平均量/值
             * @uiType - iv-form-label
             * @uiColumnGroup - 1
             */
            avg30?: string;
            /**
             * @uiLabel - 90日平均量/值
             * @uiType - iv-form-label
             * @uiColumnGroup - 1
             */
            avg90?: string;

            /**
             * @uiLabel - 昨日平均地板價
             * @uiDefault - () => "正在取得..."
             */
            yesterdayFloor: string;

            /**
             * @uiLabel - 現在地板價 (Opensea) - 看一下數字是否合理: 曾見過Opensea報出過低的地板價
             */
            todayFloorO: string;

            /**
             * @uiLabel - 現在地板價 (Looksrare)
             */
            todayFloorL: string;

            /**
             * @uiLabel - 資金 (WETH)
             * @uiColumnGroup - 1
             */
            funds: number;

            /**
             * @uiLabel - 資金 (ETH)
             * @uiColumnGroup - 1
             * @uiType - iv-form-label
             */
            funds_eth: number;

            /**
             * @uiLabel - 市價現值，以昨日平均地板價計算 (ETH)
             * @uiColumnGroup - 1
             * @uiType - iv-form-label
             */
            current_value_eth: number;

            /**
             * @uiLabel - 買入策略
             * @uiType - iv-form-header
             */
            header4?: any;

            /**
             * @uiLabel - 少於均價或地板價，與占比
             * @uiDefault - () => [{ less: 5, percent: 0.5 }, { less: 10, percent: 0.5 }]
             * @uiColumnGroup - 1
             */
            buyRuleLessThanYesterdayAverage: interface {
                /**
                 * @uiLabel - 比前一天均價 (或地板價取小值) 少 N %
                 * @uiColumnGroup - 2
                 */
                less: number;
                /**
                 * @uiLabel - 占總資金比
                 * @uiColumnGroup - 2
                 */
                percent: number;
            }[];
        }
        `;
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

    /// private helper
    private async metamask_connect(e) {
        console.log(e);
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        e.srcElement.innerHTML = "已連線";
    }

    private metamask_request_sell(o) {
        let token_id = o.token_id;
        let listing_price = o.opensea_listing_price;
        if (!listing_price || listing_price < 2.4) {
            console.error(`the price too low: ${listing_price}`);
            return;
        }

        const seaport = new OpenSeaPort((window as any).ethereum, {
            networkName: Network.Main,
            apiKey: "39632e5ef8aa4f959ff8c3c5dda0cc48"
        });

        /// NextMerchLabs
        const OTHERDEED = "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258";
        const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
        const accountAddress = "0x9e6A7521Ee6BF10e47d16cbd2F679624Bdf24BD8";

        const expirationTime = new Date();
        expirationTime.setDate(expirationTime.getDate()+1);
        expirationTime.setHours(19); expirationTime.setMinutes(0); expirationTime.setSeconds(0); 
        console.log("expiration:", expirationTime);
        seaport.createSellOrder({
            asset: {
                tokenId: token_id,
                tokenAddress: OTHERDEED
            },
            tokenId: token_id,
            tokenAddress: OTHERDEED,
            accountAddress,
            startAmount: o.opensea_listing_price,
            paymentTokenAddress: WETH,
            expirationTime: Math.floor(expirationTime.valueOf() / 1000)
        } as any);
    }

    private async rating_changed(row, rating) {
        let { token_id } = row;
        !rating && (rating = undefined);
        await this.$server.C("/rating", {
            token_id, rating
        });
    }

    private rating_enable(row) {
        row.rating_enabled = !row.rating_enabled;
    }

    private toFormOptions(options) {
        return Object.keys(options).reduce((final, id) => {
            final.push({ id, text: options[id] });
            return final;
        }, []);
    }
}
</script>
