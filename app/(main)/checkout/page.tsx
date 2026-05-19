"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Stepper from "./_components/Stepper"
import CartStep from "./_components/CartStep"
import AddressStep from "./_components/AddressStep"
import PaymentStep from "./_components/PaymentStep"
import OrderSummary from "./_components/OrderSummary"
import { orderService } from "@/services/order"
import { paymentService } from "@/services/payment"
import { useCartStore } from "@/store/cartStore"

const STEPS = ["سبد خرید", "آدرس و زمان تحویل سفارش", "پرداخت"]

export default function CheckoutPage() {
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [selectedDay, setSelectedDay] = useState(2)
    const [selectedTime, setSelectedTime] = useState(1)
    const [discountCode, setDiscountCode] = useState("")
    const [selectedAddressId, setSelectedAddressId] = useState<string>("")
    const [submitting, setSubmitting] = useState(false)
    const { clearCart } = useCartStore()

    const handleSubmitOrder = async () => {
        setSubmitting(true)
        try {
            const order = await orderService.createOrder({
                addressId: selectedAddressId,
                paymentMethod: "ONLINE_GATEWAY",
                notes: "",
            })
            await paymentService.initiatePayment({ orderId: order.id, method: "ONLINE_GATEWAY" })
            clearCart()
            toast.success("سفارش با موفقیت ثبت شد")
            router.push(`/checkout/success/${order.id}`)
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "خطا در ثبت سفارش")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">
            <Stepper steps={STEPS} current={step} />
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                    {step === 0 && <CartStep discountCode={discountCode} onDiscountChange={setDiscountCode} />}
                    {step === 1 && (
                        <AddressStep
                            selectedDay={selectedDay}
                            selectedTime={selectedTime}
                            onDayChange={setSelectedDay}
                            onTimeChange={setSelectedTime}
                            onAddressChange={setSelectedAddressId}
                        />
                    )}
                    {step === 2 && <PaymentStep onSubmit={handleSubmitOrder} submitting={submitting} />}
                </div>
                <OrderSummary
                    step={step}
                    discountCode={discountCode}
                    onDiscountChange={setDiscountCode}
                    onNext={() => setStep((s) => Math.min(s + 1, 2))}
                />
            </div>
        </div>
    )
}
