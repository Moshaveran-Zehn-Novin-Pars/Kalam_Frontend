import Link from "next/link"

const categories = [
  {
    title: "میوه",
    desc: "میوه‌هایی که هر روزتان را رنگارنگ می‌کنند.",
    image: "/images/cat-orange.png",
    bg: "#FEF6E6",
    href: "/products?category=fruits",
  },
  {
    title: "سبزیجات",
    desc: "سبزیجات سبز، سفره‌ی شما را پر طراوت می‌کنند.",
    image: "/images/cat-broccoli.png",
    bg: "#F0F4F0",
    href: "/products?category=greens",
  },
  {
    title: "صیفی‌جات",
    desc: "صیفی‌جات تازه، راز آشپزی سالم و خوشمزه شما هستند.",
    image: "/images/cat-onion.png",
    bg: "#F7EEF0",
    href: "/products?category=vegetables",
  },
]

export default function CategorySection() {
  return (
      <section className="max-w-7xl mx-auto px-4 py-16" dir="rtl">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#212121] mb-12">
          همه‌چیز برای آشپزی، مهمانی و زندگی روزمره
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
              <Link
                  key={cat.title}
                  href={cat.href}
                  className="rounded-3xl p-6 md:p-8 flex items-center justify-between relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  style={{ background: cat.bg }}
              >
                {/* متن راست */}
                <div className="z-10 w-3/5">
                  <h3 className="font-bold text-[#212121] text-xl md:text-2xl mb-3">{cat.title}</h3>
                  <p className="text-[#505050] text-sm mb-6 leading-relaxed">{cat.desc}</p>
                  <span className="text-[#51A46B] border border-[#51A46B] rounded-xl px-4 py-2 text-sm font-medium group-hover:bg-[#51A46B] group-hover:text-white transition">
                مشاهده محصولات
              </span>
                </div>
                {/* تصویر چپ */}
                {cat.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-2/5 object-contain z-10 group-hover:scale-110 transition duration-500 drop-shadow-md"
                    />
                )}
              </Link>
          ))}
        </div>
      </section>
  )
}