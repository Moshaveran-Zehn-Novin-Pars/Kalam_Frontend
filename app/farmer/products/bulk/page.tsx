"use client"

import { useState } from "react"
import { Upload, Download, FileText, CheckCircle, XCircle, AlertTriangle, ChevronDown } from "lucide-react"
import Link from "next/link"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const SAMPLE_CSV = "name,category,price,stock,unit,minOrder,qualityGrade,description\nسیب درختی,میوه,65000,500,کیلو,50,A,سیب درختی درجه یک\nگوجه فرنگی,سبزیجات,45000,200,کیلو,30,B,گوجه فرنگی گلخانه ای\nانگور بی دانه,میوه,80000,150,کیلو,40,A,انگور تازه"

type PreviewRow = { name: string; category: string; price: string; stock: string; unit: string; minOrder: string; qualityGrade: string; description: string }

const PARSE_STATUS = { VALID: "valid", ERROR: "error", DUPLICATE: "duplicate" } as const

export default function BulkUploadPage() {
    const [step, setStep] = useState<"upload" | "preview" | "done">("upload")
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<PreviewRow[]>([])
    const [dragOver, setDragOver] = useState(false)

    const parseCSV = (text: string) => {
        const lines = text.split("\n").map(l => l.trim()).filter(Boolean)
        if (lines.length < 2) return
        const headers = lines[0].split(",")
        const data = lines.slice(1).map(line => {
            const vals = line.split(",")
            const row: any = {}
            headers.forEach((h, i) => row[h.trim()] = vals[i]?.trim() || "")
            return row as PreviewRow
        })
        setPreview(data)
    }

    const handleFile = (f: File) => {
        setFile(f)
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target?.result as string
            parseCSV(text)
            setStep("preview")
        }
        reader.readAsText(f)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        const f = e.dataTransfer.files[0]
        if (f && (f.name.endsWith(".csv") || f.name.endsWith(".xlsx"))) handleFile(f)
    }

    const downloadSample = () => {
        const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;bom" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a"); a.href = url; a.download = "sample-products.csv"; a.click()
    }

    return (<>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <Link href="/farmer/products" className="f-btn f-btn--ghost" style={{ padding: "7px 14px" }}>← بازگشت</Link>
            <h1 className="f-title" style={{ margin: 0 }}>افزودن گروهی محصولات</h1>
        </div>

        {step === "upload" && (
            <div className="f-card" style={{ textAlign: "center", padding: "48px 24px" }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--f-accent-50)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <Upload size={36} style={{ color: "var(--f-accent)" }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--f-fg)", marginBottom: 8 }}>فایل CSV خود را آپلود کنید</h2>
                <p style={{ fontSize: 13, color: "var(--f-fg-3)", marginBottom: 24, maxWidth: 400, marginInline: "auto" }}>
                    فایل CSV حاوی اطلاعات محصولات خود را آپلود کنید. برای مشاهده فرمت صحیح، نمونه فایل را دانلود کنید.
                </p>
                <label className="f-btn f-btn--filled" style={{ cursor: "pointer", padding: "12px 32px", fontSize: 14 }}>
                    <Upload size={16} /> انتخاب فایل
                    <input type="file" accept=".csv,.xlsx" style={{ display: "none" }} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </label>
                <div style={{ marginTop: 16 }}>
                    <button onClick={downloadSample} className="f-btn f-btn--ghost" style={{ fontSize: 12 }}>
                        <Download size={14} /> دانلود نمونه فایل
                    </button>
                </div>
                <div style={{ marginTop: 24, textAlign: "right", maxWidth: 500, marginInline: "auto", fontSize: 12, color: "var(--f-fg-3)" }}>
                    <p style={{ fontWeight: 500, marginBottom: 6 }}>فرمت CSV:</p>
                    <div style={{ background: "var(--f-surface-2)", borderRadius: "var(--f-r-sm)", padding: 12, direction: "ltr", textAlign: "left", fontSize: 11, fontFamily: "monospace", whiteSpace: "pre-wrap", lineHeight: 1.8, overflowX: "auto" }}>
                        {SAMPLE_CSV}
                    </div>
                </div>
            </div>
        )}

        {step === "preview" && (
            <>
                <div className="f-alert f-alert--info"><AlertTriangle size={16} /><span>{fa(preview.length)} محصول در فایل شناسایی شد. لطفاً اطلاعات را بررسی و تأیید کنید.</span></div>

                <div className="f-table-card" style={{ marginBottom: 20 }}>
                    <div className="f-table-wrap">
                        <table className="f-table">
                            <thead><tr>
                                <th>ردیف</th><th>نام محصول</th><th>دسته‌بندی</th><th>قیمت</th><th>موجودی</th><th>واحد</th><th>حداقل سفارش</th><th>درجه</th>
                            </tr></thead>
                            <tbody>
                                {preview.map((row, i) => {
                                    const hasError = !row.name || !row.price || !row.stock
                                    return (<tr key={i} style={{ background: hasError ? "#fff4d2" : "transparent" }}>
                                        <td className="tnum" style={{ color: "var(--f-fg-3)" }}>{fa(i + 1)}</td>
                                        <td style={{ fontWeight: 500 }}>{row.name || <span style={{ color: "var(--f-down)" }}>نامشخص</span>}</td>
                                        <td>{row.category || "—"}</td>
                                        <td className="tnum">{row.price ? faNum(Number(row.price)) : "—"}</td>
                                        <td className="tnum">{row.stock ? faNum(Number(row.stock)) : "—"}</td>
                                        <td>{row.unit || "کیلو"}</td>
                                        <td className="tnum">{row.minOrder ? faNum(Number(row.minOrder)) : "—"}</td>
                                        <td>{row.qualityGrade ? <span className={`f-pill ${row.qualityGrade === "A" ? "f-pill--active" : "f-pill--pending"}`}>{row.qualityGrade}</span> : "—"}</td>
                                    </tr>)})
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                    <button className="f-btn f-btn--filled" onClick={() => setStep("done")}><CheckCircle size={15} /> تأیید و ثبت همه</button>
                    <button className="f-btn f-btn--ghost" onClick={() => setStep("upload")}><XCircle size={15} /> بازگشت</button>
                </div>
            </>
        )}

        {step === "done" && (
            <div style={{ textAlign: "center", padding: "48px 24px" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--f-shipped-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <CheckCircle size={36} style={{ color: "var(--f-shipped-fg)" }} />
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--f-fg)", marginBottom: 8 }}>محصولات با موفقیت ثبت شدند</h2>
                <p style={{ fontSize: 13, color: "var(--f-fg-3)", marginBottom: 24 }}>{fa(preview.length)} محصول به لیست محصولات شما اضافه شد.</p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                    <Link href="/farmer/products" className="f-btn f-btn--filled">مشاهده محصولات</Link>
                    <button className="f-btn f-btn--ghost" onClick={() => { setStep("upload"); setFile(null); setPreview([]) }}>افزودن دوباره</button>
                </div>
            </div>
        )}
    </>)
}
