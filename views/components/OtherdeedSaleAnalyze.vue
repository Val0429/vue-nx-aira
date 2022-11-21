<template>
    <div key="main" style="padding: 5px 10px">

        <!-- filter -->
        <iv-auto-card
            label="設定值" :visible="true"
            >
            <iv-form
                :interface="resource_inf()"
                @submit="form_submit"
                >
            </iv-form>
        </iv-auto-card>

        <!-- sell result -->
        <iv-card label="賣出數據">
            <iv-table
                :interface="sell_inf()"
                :server="{ path: '/otherdeed-analyze' }"
                :params="params"
                >
                <template #image_url="{$attrs}">
                    <ivc-NFT-item :attrs="$attrs" />
                </template>

                <template #floor="{$attrs}">
                    <ivc-crypto-price :value="$attrs.value" />
                </template>

                <template #price="{$attrs}">
                    <ivc-crypto-price :value="$attrs.value" />
                    (<ivc-percent-text :value="$attrs.row.price" :refValue="$attrs.row.floor" />)
                </template>

                <template #trait_feature="{$attrs}">
                    <span v-html="convertTraitString($attrs.value)" />
                </template>

                <template #actions$="{$attrs}">
                    <iv-toolbox-view @click.stop="doPreview($attrs.row)" />
                </template>
            </iv-table>
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

    private params = null;
    private result = null;

    private form_submit(value) {
        console.log("value!", value);
        this.params = value;
    }

    private mounted() {
    }

    private resource_inf() {
        return `
        interface {
            /**
             * @uiLabel - 預設類別
             */
            type?: ${toEnumInterface({
                MAYC_SET_1: "MAYC預設集",
                ARTIFACT_SET_1: "神器預設集",
                BAYC_SET_1: "BAYC預設集",
                RESOURCES_3_SET: "三資源預設集",
                KODA_SET_1: "KODA預設集",
            })};
        }
        `;
    }

    private sell_inf() {
        return `
        interface {
            /**
             * @uiLabel - 賣出日期
             */
            created_date: Date;

            /**
             * @uiLabel - 當時地板價
             */
            floor: number;

            /**
             * @uiLabel - 賣出價格
             */
            price: number;

            /**
             * @uiLabel - 寶物
             */
            image_url: string;

            /**
             * @uiLabel - 特徵
             */
            trait_feature: any;
        }
        `;
    }

    /// interaction handler
    private doPreview(o) {
        // modal.$on("success", () => (modal as any).visible = false);
        let modal = new PreviewChartHistoryModal();
        (modal as any).setData(o);
        modal.$modal();
    }
}
</script>
