import type { Product } from './product'
import type { User } from './user'

export interface Auction {
    id: string
    productId: string
    farmerId: string
    startingPrice: string
    currentPrice: string
    minBidIncrement: string
    startAt: string
    endAt: string
    status: string
    winnerId: string | null
    createdAt: string
    updatedAt: string
    product?: Product
    bids?: AuctionBid[]
}

export interface AuctionBid {
    id: string
    auctionId: string
    bidderId: string
    amount: string
    createdAt: string
    bidder?: Pick<User, 'id' | 'firstName' | 'lastName'>
}

export interface CreateAuctionDto {
    productId: string
    startingPrice: number
    minBidIncrement?: number
    reservePrice?: number
    startTime: string
    endTime: string
}

export interface PlaceBidDto {
    amount: number
}
