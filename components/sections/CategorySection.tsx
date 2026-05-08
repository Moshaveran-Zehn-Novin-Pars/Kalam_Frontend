import Link from "next/link"

// ترتیب دقیق از Figma: صیفی‌جات → سبزیجات → میوه
const categories = [
  {
    title: "صیفی‌جات",
    desc: "صیفی‌جات تازه، راز آشپزی سالم و خوشمزه شما هستند.",
    image: "/images/cat-onion.png",
    bgColor: "#FDF0F2",
    borderColor: "#EFDCE1",
    href: "/products?category=vegetables",
  },
  {
    title: "سبزیجات",
    desc: "سبزیجات سبز، سفره‌ی شما را پرطراوت می‌کنند.",
    image: "/images/cat-broccoli.png",
    bgColor: "#F0F9F0",
    borderColor: "#C8E6C9",
    href: "/products?category=greens",
  },
  {
    title: "میوه",
    desc: "میوه‌هایی که هر روزتان را رنگارنگ می‌کنند.",
    image: "/images/cat-orange.png",
    bgColor: "#FEF6E6",
    borderColor: "#FDE5B7",
    href: "/products?category=fruits",
  },
]

export default function CategorySection() {
  return (
      <section className="w-[90%] md:w-4/5 mx-auto py-12">
        <h2 className="text-[20px] md:text-[24px] font-bold text-center text-[#212121] mb-8">
          همه‌چیز برای آشپزی، مهمانی و زندگی روزمره‌
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          {categories.map((cat) => (
              <Link
                  key={cat.title}
                  href={cat.href}
                  className="group flex-1 h-[192px] rounded-[20px] border-2 overflow-hidden
                       flex items-center px-5 gap-3
                       hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: cat.bgColor, borderColor: cat.borderColor }}
              >
                {/* چپ: تصویر */}
                <div className="w-[130px] h-[140px] flex items-center justify-center shrink-0">
                  {cat.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                          src={cat.image}
                          alt={cat.title}
                          className="h-full w-full object-contain
                             group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                      />
                  )}
                </div>

                {/* راست: متن */}
                <div className="flex flex-col gap-2 text-right flex-1">
                  <h3 className="text-[20px] font-bold text-[#212121]">{cat.title}</h3>
                  <p className="text-[13px] text-[#505050] leading-[1.6]">{cat.desc}</p>
                  <div
                      className="mt-1 inline-flex items-center justify-center border border-[#51A46B] text-[#51A46B]
                            text-[13px] font-medium px-4 py-1.5 rounded-[10px] w-fit
                            group-hover:bg-[#51A46B] group-hover:text-white transition-colors"
                  >
                    مشاهده محصولات
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </section>
  )
}