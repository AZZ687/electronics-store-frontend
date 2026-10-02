import { useEffect, useState } from 'react';


const slides = [
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAqzpW5GVcooCSWnaQpbqFWnsNMSS_GFDV4D7sQyBWBQ&s=10',
    label: 'OLED · Home Cinema',
    caption: 'Wall-mounted cinema setups for any room',
  },
  {
    image:
      'images/lg.jpg',
    label: '4K · Ultra HD',
    caption: 'Crisp, vivid detail for everyday viewing',
  },
  {
    image:
      'images/qled.jpg',
    label: '8K · Next-Gen Clarity',
    caption: 'Premium panels for the sharpest picture',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZciBGJ_qLiw5YWAFUTQQwWEyZtQ2f4P2BmJNKDa-ig&s=10',
    label: 'Smart TV · Built-In Apps',
    caption: 'Stream, cast, and control it all with ease',
  },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl aspect-[4/3]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={slide.image}
            alt={slide.caption}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          <span className="absolute top-4 left-4 text-xs font-mono text-blue-300 tracking-wider uppercase bg-slate-950/40 border border-slate-700/60 rounded px-2 py-1">
            {slide.label}
          </span>

          <p className="absolute bottom-5 left-5 right-5 text-white font-semibold text-sm sm:text-base">
            {slide.caption}
          </p>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}: ${slide.label}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;