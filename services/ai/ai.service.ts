import { apiGet, apiPost } from '@/services/api'
import type { PricePredictionDto, QualityDetectionDto, ChatDto } from '@/types'

export const aiService = {
    async predictPrice(dto: PricePredictionDto): Promise<any> { return apiPost('/ai/price-prediction', dto) },
    async detectQuality(dto: QualityDetectionDto): Promise<any> { return apiPost('/ai/quality-detection', dto) },
    async getRecommendations(params?: { count?: number; context?: string }): Promise<any[]> { return apiGet('/ai/recommendations', { params }) },
    async chat(dto: ChatDto): Promise<any> { return apiPost('/ai/chat', dto) },
    async forecastDemand(): Promise<any> { return apiGet('/ai/demand-forecast') },
}
