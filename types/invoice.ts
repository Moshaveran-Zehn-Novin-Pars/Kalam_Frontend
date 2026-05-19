export interface Invoice {
    id: string
    orderId: string
    invoiceNumber: string
    issueDate: string
    totalAmount: string
    taxAmount: string
    pdfUrl: string | null
    taxSystemRef: string | null
    createdAt: string
}

export interface CreditNoteDto {
    reason: string
    items?: { productId: string; quantity: number; reason: string }[]
    deductionAmount?: number
}
