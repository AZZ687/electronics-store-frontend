import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import CategoryCard from '../components/CategoryCard';
import HeroSlider from '../components/HeroSlider';
import CustomerReviews from '../components/CustomerReviews';
import BrandSection from '../components/BrandSection';

function Home() {
  const features = [
    {
      title: 'Fast Delivery',
      description: 'Reliable doorstep shipping with real-time tracking on every order.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
    {
      title: 'Secure Payment',
      description: 'Encrypted checkout process supporting major credit cards and digital wallets.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      title: 'Quality Products',
      description: '100% authentic TVs backed by official manufacturer warranties.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: 'Customer Support',
      description: 'Dedicated support team ready to assist with product inquiries and after-sales care.',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  const categories = [
    {
      title: '4K TVs',
      description: 'Sharp, vivid 4K resolution TVs offering the best everyday value for home viewing.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqzpW5GVcooCSWnaQpbqFWnsNMSS_GFDV4D7sQyBWBQ&s=10',
    },
    {
      title: '8K TVs',
      description: 'Next-generation 8K panels delivering unmatched clarity and lifelike detail.',
      image:
        'https://cdn11.bigcommerce.com/s-8vy557m296/images/stencil/original/products/307/3349/20_4T-C65FS1UR_3QL_PRINT_WEB__97458.1698958571.JPG?c=2',
    },
    {
      title: 'OLED TVs',
      description: 'Perfect blacks and infinite contrast with self-lit OLED display technology.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZciBGJ_qLiw5YWAFUTQQwWEyZtQ2f4P2BmJNKDa-ig&s=10',
    },
    {
      title: 'Smart TVs',
      description: 'Built-in streaming apps, voice control, and seamless smart home integration.',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOSCWDd2LYGWHmCwRXj8GVoDJlk6m_aVGOcHpS2B4iVg&s=10',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Latest TV Arrivals
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Upgrade Your Home Cinema
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Discover our curated collection of premium 4K and 8K TVs, OLED and QLED displays, and smart home cinema setups with verified authentic quality.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Shop Now
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  to="/orders"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  View My Orders
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-slate-400 text-xs sm:text-sm">
                <div>
                  <p className="font-bold text-white text-base sm:text-lg">100%</p>
                  <p>Authentic Items</p>
                </div>
                <div>
                  <p className="font-bold text-white text-base sm:text-lg">2 Years</p>
                  <p>Warranty Standard</p>
                </div>
                <div>
                  <p className="font-bold text-white text-base sm:text-lg">24/7</p>
                  <p>Expert Support</p>
                </div>
              </div>
            </div>

            {/* Right Visual Area: TV Showcase Slider */}
            <div className="lg:col-span-5 relative">
              <HeroSlider />

              <div className="mt-4 flex items-center justify-between text-xs text-slate-300 px-1">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9 / 5 Rating
                </span>
                <span className="text-slate-400 font-mono">Official Store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="features-heading">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Why Shop With Us
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Engineered to provide a seamless, secure, and reliable TV shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 id="categories-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Shop by TV Type
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Browse through our TV categories and find your perfect screen.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            All Products
            <svg
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              image={category.image}
              to="/products"
            />
          ))}
        </div>
      </section>
      <CustomerReviews />
      <BrandSection />
    </div>
  );
}

export default Home;