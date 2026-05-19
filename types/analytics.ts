export interface AnalyticsDashboard {
    totalUsers: number
    totalOrders: number
    totalRevenue: string
    totalProducts: number
    growthPercentages: {
        users: number
        orders: number
        revenue: number
        products: number
    }
}

export interface RevenueAnalytics {
    daily: { date: string; amount: string }[]
    monthly: { month: string; amount: string }[]
    byCategory: { category: string; amount: string; percentage: number }[]
}

export interface OrderAnalytics {
    total: number
    byStatus: { status: string; count: number }[]
    averageValue: string
    conversionRate: number
}

export interface ProductAnalytics {
    topSelling: { productId: string; name: string; quantity: number; revenue: string }[]
    lowStock: { productId: string; name: string; stock: number }[]
    categoryDistribution: { category: string; count: number }[]
}

export interface UserAnalytics {
    total: number
    byRole: { role: string; count: number }[]
    newUsers: { date: string; count: number }[]
    activeUsers: { date: string; count: number }[]
}
