"use client"
import { useEffect, useState } from "react"

export default function SpecialOffer() {
    const [time, setTime] = useState(3600)

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div>
            <h2>فروش ویژه</h2>
            <p>{time} ثانیه باقی مانده</p>

            {/* ProductCard اینجا */}
        </div>
    )
}