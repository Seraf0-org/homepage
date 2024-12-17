import { products } from "~/data/products";
import { useIntersectionObserver } from "~/hooks/useIntersectionObserver";

export function Products() {
  const [sectionRef, isVisible] = useIntersectionObserver();

  return (
    <section ref={sectionRef} className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className={`container mx-auto px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white mb-16 drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
          Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="relative pt-[56.25%] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
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