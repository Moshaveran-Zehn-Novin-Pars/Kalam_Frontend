export interface PricePredictionDto {
    productId: string
    historicalDays?: number
    forecastDays?: number
}

export interface QualityDetectionDto {
    imageUrl: string
    productType?: string
}

export interface ChatDto {
    message: string
    sessionId?: string
}
