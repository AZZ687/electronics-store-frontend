function CustomerReviews() {
  const reviews = [
    {
      name: 'Ahmed K.',
      role: 'Verified Customer',
      rating: 5,
      review:
        'Great experience! The TV arrived quickly and the picture quality is excellent.',
    },
    {
      name: 'Mohammad A.',
      role: 'Verified Customer',
      rating: 5,
      review:
        'Very helpful service and a smooth ordering experience. Highly recommended.',
    },
    {
      name: 'Omar S.',
      role: 'Verified Customer',
      rating: 5,
      review:
        'I found exactly what I was looking for. The product matched the description perfectly.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Customer Reviews
          </p>

          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Customers Say
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A few words from customers about their shopping experience.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Rating */}
              <div
                className="flex items-center gap-1 text-amber-400"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }).map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 1.5l2.63 5.33 5.88.85-4.25 4.14 1 5.85L10 14.9l-5.26 2.77 1-5.85L1.5 7.68l5.88-.85L10 1.5z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="mt-5 text-sm leading-6 text-slate-600">
                “{review.review}”
              </blockquote>

              {/* Customer */}
              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  {review.name.charAt(0)}
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {review.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {review.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerReviews;