import { products } from "~/data/products";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";
import { useOutletContext } from "@remix-run/react";
import type { OutletContext } from "~/root";
import { useLines } from "~/contexts/LinesContext";

export function Products() {
  const [sectionRef, isVisible] = useIntersectionObserver();
  const { theme } = useOutletContext<OutletContext>();
  const isDark = theme === 'dark';
  const lines = useLines('cyan');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/products/product-none.jpg";
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative min-h-screen py-20 transition-colors duration-500 overflow-hidden"
      style={{
        backgroundColor: isDark ? 'rgb(17 24 39)' : 'rgb(249 250 251)'
      }}
    >
      {lines.map((line, index) => (
        <svg
          key={line.id}
          className="absolute will-change-transform pointer-events-none"
          style={{
            left: `${line.left}%`,
            top: '-20vh',
            width: '200px',
            height: '140vh',
            overflow: 'visible',
          }}
        >
          <path
            d={`M ${line.points.map(p => `${p.x},${p.y}`).join(' L ')}`}
            stroke={line.color}
            strokeWidth={line.width}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {line.branches.map((branch, i) => (
            <path
              key={`${line.id}-${i}`}
              d={`M ${branch.points.map(p => `${p.x},${p.y}`).join(' L ')}`}
              stroke={branch.color}
              strokeWidth={branch.width}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      ))}

      <div className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white mb-16 drop-shadow-[0_0_8px_rgba(0,192,192,0.5)] dark:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
          Products
          <div className="absolute top-24 fixed-left">
            <svg width="100vw" height="80" viewBox="0 0 1000 20" preserveAspectRatio="none" style={{ marginLeft: 'calc(-50vw + 75%)' }}>
              <path
                d="M220 0 L930 0 950 20 L1000 20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className={`text-cyan-400 dark:text-cyan-100 ${isVisible ? 'animate-draw-line-from-right' : ''}`}
                strokeDasharray="1000"
              />
            </svg>
          </div>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{
                transitionDelay: `${index * 200}ms`,
                transitionProperty: 'opacity, transform'
              }}
            >
              <div className="relative pt-[56.25%] overflow-hidden">
                <img
                  src={product.image || "/images/products/product-none.jpg"}
                  alt={product.name}
                  onError={handleImageError}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6 relative">
                <div className="absolute bottom-0 right-0 w-full h-full bg-gray-50 dark:bg-gray-900"
                  style={{
                    clipPath: 'polygon(100% 50%, 100% 100%, 87% 100%)'
                  }}
                />
                <div className="relative z-10">
                  <h3
                    className={`text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{
                      transitionDelay: `${(products.length * 200) + 200}ms`,
                      transitionProperty: 'opacity, transform'
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`text-gray-600 dark:text-gray-300 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{
                      transitionDelay: `${(products.length * 200) + 400}ms`,
                      transitionProperty: 'opacity, transform'
                    }}
                  >
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}