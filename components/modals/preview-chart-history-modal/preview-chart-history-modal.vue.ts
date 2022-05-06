/*
 * Created on Tue Jul 30 2019
 * Author: Val Liu
 * Copyright (c) 2019, iSAP Solution
 */

import { Vue, Component, Prop, Model, Watch, Emit } from "vue-property-decorator";
import { toEnumInterface, NumberHelper } from '@/../core';
import { AlertResponse } from '@/../components/modal/alert-response';
import { detectTradeTypeSuccess, ETradeType } from '@/helpers';
import { getUsername } from "@/helpers/nft-utility";
import TalkBar from '@/components/talk-bar/talk-bar.vue';
import { ModalLoading } from '@/../components/modal/modal-loading';

@Component({
    components: { 'ivc-talk-bar': TalkBar },
    methods: { getUsername }
})
export default class PreviewChartHistoryModal extends Vue {
    @Prop({ type: Boolean, required: false })
    visible: boolean;

    @Emit('success')
    doSuccess() {}

    @Emit('update:visible')
    doUpdateVisible(value: boolean) { return value; }

    private event: any = {};
    private history: any = null;

    private mounted() {
    }

    doSubmit(data) {
        // this.$server.C("/users/change-password", data).then(() => {
        //     new AlertResponse({
        //         propsData: {
        //             label: new Vue()._('w_Success'),
        //             value: new Vue()._("m_ChangePasswordSuccess")
        //         },
        //     }).$modal();

        //     this.doSuccess();
        // });
    }

    /// o: IOpenseaEvent
    public setData(o) {
        this.event = o;
        let { collection_slug, created_date } = o;
        let token_id = o.asset.token_id;
        let address = o.winner_account.address;

        this.history = null;
        this.$server.R("/chart/history", {
            collection_slug,
            token_id,
            created_date,
            address,
        }).then(history => {
            this.history = history;
        }).catch(e => {
            this.history = {};
        })
    }

    private options = {};
    private inf() {
        return `
        interface {

        }
        `
    }
    // private inf() {
    //     return `
    //     interface {
    //         /**
    //          * @uiLabel - ${this._("m_CurrentPassword")}
    //          * @uiType - iv-form-password
    //          */
    //         oldPassword: string;

    //         /**
    //          * @uiLabel - ${this._("m_NewPassword")}
    //          * @uiType - iv-form-password
    //          * 
    //          */
    //         newPassword: string;

    //         /**
    //          * @uiLabel - ${this._("mb_ConfirmPassword")}
    //          * @uiType - iv-form-password
    //          * @uiValidation - (v, all) => all.newPassword === v
    //          * @uiInvalidMessage - ${this._("m_PasswordNotMatch")}
    //          */
    //         confirmPassword: string;
    //     }
    //     `;
    // }

    /// private helper
    // private getUsername(account) {
    //     if (account.user && account.user.username) return account.user.username;
    //     return account.address.substr(0, 6);
    // }
    
    /// Item Info
    private getItemInfoTextShort() {
        let history = this.history;
        return `寶物資訊 - #${history.item.token_id}, 稀有度: ${history.item.rank} / ${history.item.total}`;
    }

    /// Buyer Info
    private getBoughtInfoTextShort() {
        let { buyer_info, seller_info } = this.history;
        let originPrice = seller_info.bought_price.way === "mint" ? 0 : seller_info.bought_price.price;
        let dealPrice = buyer_info.bought_price.price;
        let feeRate = this.event.asset.asset_contract.opensea_seller_fee_basis_points / 100;

        let finalPrice = NumberHelper.toFixedNumber(dealPrice * (1-feeRate/100), 6);
        
        return `買賣雙方資訊 - 賣方${finalPrice >= originPrice ? "獲利" : "虧損"} ${NumberHelper.toFixedNumber(finalPrice-originPrice, 6)+ " ETH"}`;
    }

    private getBuyerInfoText(history) {
        if (!history) return "";
        let messages = [];
        messages.push(this.getBuyerBidInfoSubText(history.buyer_info));
        messages.push(this.getBuyerCompareInfoSubText(history));
        messages = messages.filter(x => x!=undefined);
        return messages.join("<BR /><BR />");
    }

    private getBuyerCompareInfoSubText(history) {
        let { buyer_info, seller_info } = history;
        if (!buyer_info || !seller_info) return;
        let bbr = buyer_info.bought_price;
        let sbr = seller_info.wanting_price;

        let messages = [];
        messages.push([
            `這個價錢比地板價 ${this.makePriceText(bbr.price, bbr.floor)} `,
            bbr.way != 0 && sbr.starting_price ? `，比你開的價錢 ${this.makePriceText(bbr.price, sbr.starting_price)} 。` : "。"
        ].join(""));
        return messages.join("<BR/>");
    }

    private makePriceText(price, base) {
        if (price === base) return this.makeMsg("+0%", "#555");
        if (price < base) {
            let rate = NumberHelper.toFixedNumber((1 - price / base) * 100, 2);
            return this.makeMsg("-"+rate+"%", "red");
        }
        let rate = NumberHelper.toFixedNumber((price/base-1) * 100, 2);
        return this.makeMsg("+"+rate+"%", "#339933");
    }

    private getBuyerBidInfoSubText(buyer_info) {
        if (!buyer_info) return;
        let bought_price = buyer_info.bought_price;
        let way: ETradeType = bought_price.way;
        let { date, floor, price } = bought_price;

        let messages = [];
        messages.push(`今天的地板價是 ${this.makeMsg(floor+ " ETH")} 。`);
        if (way === ETradeType.dutch || way === ETradeType.limit) {
            messages.push(`我願以你開的價(Buy) ${this.makeMsg(price+" ETH")} 買下這個寶物。`);
        } else if (way === ETradeType.english) {
            messages.push(`我向你提出以 ${this.makeMsg(price+" ETH")} 競標(Bid)這個寶物。`);
        } else {
            messages.push(`我向你喊價(Offer)以 ${this.makeMsg(price+" ETH")} 買下這個寶物。`);
        }
        return messages.join("<BR/>");
    }

    /// Seller Asset Info
    private getBuyerAssetInfoText(history) {
        return this.getGeneralAssetInfoText(history.buyer_assets);
    }
    private getAssetInfoTextShort() {
        let sellerp = NumberHelper.toFixedNumber(this.history.seller_assets.total_price, 2) + " ETH";
        let buyerp = NumberHelper.toFixedNumber(this.history.buyer_assets.total_price, 2) + " ETH";
        return `資產列表 - 賣家 ${sellerp}, 買家 ${buyerp}`;
    }
    private getSellerAssetInfoText(history) {
        return this.getGeneralAssetInfoText(history.seller_assets);
    }
    private getGeneralAssetInfoText(assets) {
        let messages = [];

        let resolvedAssets = assets.results.reduce((final, asset) => {
            if (asset.price < 0.1) return final;
            final.push(`<img src="${asset.iconUrl}" height="18px" style="margin-top: -4px; margin-right: 2px" /> <span title="${asset.name}">${asset.symbol || asset.slug}</span> x ${asset.owner_asset_count} ，總值 ${this.makeMsg(NumberHelper.toFixedNumber(asset.price*asset.owner_asset_count, 3)+" ETH ")}。`);
            return final;
        }, []);

        if (resolvedAssets.length === 0) {
            messages.push("我的帳戶沒有資產。");
        } else {
            messages.push(`我的資產總值為 ${this.makeMsg(NumberHelper.toFixedNumber(assets.total_price, 6) + " ETH ")}。`)
            messages.push(resolvedAssets.join("<BR/>"));
        }

        return messages.join("<BR/><BR/>");
    }

    /// Seller Info
    // private getSellerInfoText(history) {
    //     let messages = [];
    //     messages.push(this.getSellerBoughtInfoText(history.seller_info));
    //     messages.push(this.getSellerWantingInfoText(history.seller_info));
    //     messages = messages.filter(x => x!=undefined);
    //     return messages.join("<BR/><BR/>");
    // }
    private getSellerBoughtInfoText(seller_info) {
        if (!seller_info) return null;
        if (seller_info.bought_price.way === "mint") return "我 mint 得到這個寶物。";
        return `我在 <b style="color: orange">${this.getDaysText(seller_info.bought_price.days)}</b> 前以 <b style="color: orange">${NumberHelper.toFixedNumber(seller_info.bought_price.price, 6)} ETH</b> 買入這個寶物。`;
    }
    private getSellerWantingInfoText(seller_info) {
        if (!seller_info) return null;
        let wanting_price = seller_info.wanting_price;
        let messages = [];

        if (wanting_price.auction_type) {
            messages.push(`在 <b style="color: orange">${this.getDaysText(seller_info.wanting_price.days)}</b> 前希望以`);
            /// 拍賣資料還在
            switch (wanting_price.auction_type) {
                case "dutch":
                    let limittype = wanting_price.starting_price === wanting_price.ending_price;
                    if (limittype === true) {
                        messages.push(` <b style="color: orange">限價 ${NumberHelper.toFixedNumber(wanting_price.starting_price, 6)} ETH </b> 出售。`);
                    } else {
                        messages.push(` <b style="color: orange">德式拍賣 ${NumberHelper.toFixedNumber(wanting_price.starting_price, 6)} - ${NumberHelper.toFixedNumber(wanting_price.ending_price, 6)} ETH </b> 出售。`);
                    }
                    break;
                case "english":
                    let starting_price = wanting_price.starting_price;
                    messages.push(` <b style="color: orange">英式拍賣 ${!starting_price ? "不限價" : `起價 ${starting_price} ETH </b>`} 出售。`);
                    break;
            }
        } else {
            messages.push(`在之前以`);
            messages.push(` <b style="color: orange">${detectTradeTypeSuccess(this.event) === 3 ? "英式拍賣" : "限價"}</b> 出售，詳細資料在公海中遺失。`);
        }

        return messages.join("");
    }

    /// Seller Deal
    private getSellerDealText(history) {
        let messages = [];
        let ct = this.event.asset.asset_contract;
        let feeRate = ct.opensea_seller_fee_basis_points / 100;

        messages.push(`這個價錢 ${this.makeMsg(history.buyer_info.bought_price.price+ " ETH ")} 我賣了。`);
        messages.push(`賣出這個寶物並扣除手續費 ${this.makeMsg(feeRate+"%")} ，我${this.getSellerDealGainLoseText(history, feeRate)}`);
        return messages.join("<BR/><BR/>");
    }
    private getSellerDealGainLoseText(history, feeRate) {
        let { buyer_info, seller_info } = history;
        let originPrice = seller_info.bought_price.way === "mint" ? 0 : seller_info.bought_price.price;
        let dealPrice = buyer_info.bought_price.price;
        let finalPrice = NumberHelper.toFixedNumber(dealPrice * (1-feeRate/100), 6);
        
        let messages = [];
        messages.push(`得到 ${this.makeMsg(finalPrice)+ " ETH "}，`);
        messages.push(`扣除成本 ${this.makeMsg((finalPrice >= originPrice ? "獲利" : "虧損")+" "+NumberHelper.toFixedNumber(finalPrice-originPrice, 6)+ " ETH", finalPrice >= originPrice ? "#339933" : "red")} 。`);
        return messages.join("<BR/>");
    }

    /// private helper
    private getDaysText(days) {
        let daypart = Math.floor(days);
        let hourpart = Math.ceil((days%1)*24);
        return `${daypart ? daypart+" 天" : ""}${hourpart ? " "+hourpart+" 小時": ""}`;
    }
    private makeMsg(message, color = "orange") {
        return `<b style="color: ${color}">${message}</b>`;
    }
}
