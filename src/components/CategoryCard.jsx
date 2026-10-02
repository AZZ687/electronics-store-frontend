import { Link } from 'react-router-dom';

function CategoryCard({ title, description, image, to = '/products' }) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 aspect-[4/5]"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

      <div className="relative p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <span className="text-xs font-semibold text-white/70 group-hover:text-blue-300 transition-colors duration-200">
            Explore →
          </span>
        </div>
        <p className="text-sm text-slate-200/90 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;