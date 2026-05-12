"use client"

import { useState } from "react"
import Stepper from "./_components/Stepper"
import CartStep from "./_components/CartStep"
import AddressStep from "./_components/AddressStep"
import PaymentStep from "./_components/PaymentStep"
import OrderSummary from "@/app/(main)/checkout/_components/OrderSummary";

const STEPS = ["سبد خرید", "آدرس و زمان تحویل سفارش", "پرداخت"]

export default function CheckoutPage() {
    const [step, setStep] = useState(0)
    const [selectedDay, setSelectedDay] = useState(2)
    const [selectedTime, setSelectedTime] = useState(1)
    const [discountCode, setDiscountCode] = useState("")

    return (
        <div className="w-[90%] md:w-4/5 mx-auto py-8">

            <Stepper steps={STEPS} current={step} />

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* محتوای اصلی */}
                <div className="flex-1">
                    {step === 0 && (
                        <CartStep
                            discountCode={discountCode}
                            onDiscountChange={setDiscountCode}
                        />
                    )}
                    {step === 1 && (
                        <AddressStep
                            selectedDay={selectedDay}
                            selectedTime={selectedTime}
                            onDayChange={setSelectedDay}
                            onTimeChange={setSelectedTime}
                        />
                    )}
                    {step === 2 && <PaymentStep />}
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