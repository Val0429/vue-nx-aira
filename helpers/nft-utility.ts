// - direct sell
// is_private false
// listing_time yes
// - bid won
// is_private null
// listing_time null
// - offer accepted
// is_private null
// listing_time null

import { NumberHelper } from "@/../core";

// transaction.to_account === contract_address
export enum ETradeType {
    limit = 0,
    offerAccepted = 1,
    dutch = 2,
    english = 3
}

export function detectTradeTypeCreated(data): ETradeType {
    if (data.auction_type === "english") return ETradeType.english;
    if (data.starting_price === data.ending_price) return ETradeType.limit;
    return ETradeType.dutch;
}

export function detectTradeTypeSuccess(data): ETradeType {
    if (data.is_private !== null) return ETradeType.limit;
    if (data.transaction.to_account.address === data.contract_address) return ETradeType.offerAccepted;
    return ETradeType.english;
}

export function getUsername(account) {
    if (account.user && account.user.username) return account.user.username;
    return account.address.substr(0, 6);
}

export function calcRealPrice(event): number {
    return !event.payment_token ? 0 :
        (event.starting_price||event.total_price) * event.payment_token.eth_price;
}

export function getSecondsText(seconds): string {
    return getDaysText(seconds/60/60/24);
}

export function getDaysText(days): string {
    let daypart = Math.floor(days);
    let hourpart = NumberHelper.toFixedNumber((days%1)*24, 1);
    return `${daypart ? daypart+" 天" : ""}${hourpart ? " "+hourpart+" 小時": ""}`;
}

export function toFixedPrice(num, digits = 3) {
    return NumberHelper.toFixedNumber(num, digits);
}

export function getUTCDateString(date: Date): string {
    return `${date.getUTCFullYear()}/${date.getUTCMonth()+1}/${date.getUTCDate()}`;
}

export function getPercentText(value: number, hasPlusSign: boolean = true): string {
    return `${value >= 0 ? (hasPlusSign ? "+" : "") : ""}${toFixedPrice(value*100)}%`;
}

export function convertTraitString(trait) {
    let results = [];
    
    switch (trait.sediment) {
        case 0: results.push("一級中心地段"); break;
        case 1: results.push("二級中心地段"); break;
        case 2: results.push("BAYC地"); break;
        case 3: results.push("MAYC地"); break;
        default: break;
    }

    if (trait.koda) {
        results.push("有KODA");
    }

    if (trait.artifact) {
        results.push(`神器: ${getPercentText(trait.artifact/100000, false)}`);
    }

    if (trait.category) {
        results.push("地形: Chaos");
    }

    if (trait.environment) {
        results.push(`環境: ${getPercentText(trait.environment/100000, false)}`);
    }

    if (trait.resources) {
        let res = trait.resources;
        let tmp = [];
        if (res.c2000) tmp.push(`3% x ${res.c2000}`);
        if (res.c140) tmp.push(`0.02% x ${res.c140}`);
        if (res.c70) tmp.push(`0.01% x ${res.c70}`);
        if (res.c30) tmp.push(`0.00% x ${res.c30}`);

        results.push(`資源(${res.count}): ${tmp.join(", ")}`);
    }
    return results.length === 0 ? "什麼都沒有" : results.join("<BR/>");
}
