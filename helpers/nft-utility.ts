// - direct sell
// is_private false
// listing_time yes
// - bid won
// is_private null
// listing_time null
// - offer accepted
// is_private null
// listing_time null
// transaction.to_account === contract_address
export enum ETradeType {
    limit = 0,
    offerAccepted = 1,
    dutch = 2,
    english = 3
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
