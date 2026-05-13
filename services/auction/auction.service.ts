import { apiGet, apiPost } from '@/services/api'
import type { Auction, CreateAuctionDto, PlaceBidDto } from '@/types'

export const auctionService = {
    async findAll(params?: { status?: string }): Promise<Auction[]> { return apiGet('/auctions', { params }) },
    async createAuction(dto: CreateAuctionDto): Promise<Auction> { return apiPost('/auctions', dto) },
    async findById(id: string): Promise<Auction> { return apiGet(`/auctions/${id}`) },
    async placeBid(id: string, dto: PlaceBidDto): Promise<any> { return apiPost(`/auctions/${id}/bid`, dto) },
    async endAuction(id: string): Promise<Auction> { return apiPost(`/auctions/${id}/end`) },
}
