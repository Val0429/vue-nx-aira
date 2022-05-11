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
