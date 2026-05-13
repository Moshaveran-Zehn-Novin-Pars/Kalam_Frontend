"use client"

function fa(n: string | number) { return String(n).replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[+d]) }
function faNum(n: number) { return new Intl.NumberFormat("fa-IR").format(n) }

const HIST = [
    { id:"DLV-098", date:"۱۴۰۳/۰۲/۱۵", buyer:"سوپرمارکت ستاره", address:"تهران، نیاوران",  weight:"۱۸۰ کیلو", earned:120000 },
    { id:"DLV-097", date:"۱۴۰۳/۰۲/۱۵", buyer:"رستوران آرمان",   address:"تهران، ونک",      weight:"۶۰ کیلو",  earned:85000  },
    { id:"DLV-096", date:"۱۴۰۳/۰۲/۱۴", buyer:"هایپرمارکت نور",  address:"تهران، شریعتی",   weight:"۳۵۰ کیلو", earned:220000 },
    { id:"DLV-095", date:"۱۴۰۳/۰۲/۱۴", buyer:"کافه سبز",        address:"تهران، جردن",      weight:"۳۰ کیلو",  earned:55000  },
]

export default function DriverHistory() {
    return (
        <>
            <h1 className="adm-page-title">تاریخچه تحویل‌ها</h1>

            <div className="adm-table-card">
                <div className="adm-table-wrap">
                    <table className="adm-table">
                        <thead>
                            <tr>
                                <th>شماره</th>
                                <th>خریدار</th>
                                <th>آدرس</th>
                                <th>وزن</th>
                                <th>تاریخ</th>
                                <th>درآمد</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HIST.map(h => (
                                <tr key={h.id}>
                                    <td className="oid tnum">{h.id}</td>
                                    <td style={{ fontWeight: 500 }}>{h.buyer}</td>
                                    <td style={{ color: "var(--adm-fg-3)" }}>{h.address}</td>
                                    <td className="tnum">{h.weight}</td>
                                    <td className="tnum">{h.date}</td>
                                    <td className="total">{faNum(h.earned)} تومان</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}