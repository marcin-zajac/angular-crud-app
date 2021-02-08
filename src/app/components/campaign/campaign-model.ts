export interface CampaignModel {
    _id?: string,
    productId?: string,
    name: string,
    keywords: string[],
    status: boolean,
    bidAmount: number,
    campaignFund: number,
    town: string
    radius: number
    _v?: number,
}