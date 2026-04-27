type ParsedData = {
    description: string | null
    vendor: string | null
    date: string | null
    costCentre: string
    paymentMethod: string | null
    total: number
    price: number
    gst: number
}

type ErrorMsg = {
    error: boolean
    msg: string
}