import React from 'react'

function HomePage({products}) {
  return (
    <div>
      <section
        className="relative h-screen w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* text */}
        <div className="relative z-10 text-center max-w-2xl px-6">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Curated Style, Delivered.
          </h1>

          <p className="text-white/90 text-lg md:text-xl">
            Complete looks crafted by professional stylists. Browse, add to cart, done.
          </p>
        </div>
      </section>
      {products.map((eachproduct) => {
        return(
          <div key={eachproduct._id}>
            <img src={eachproduct.imageUrl} alt={eachproduct.name} width="200" />
            <h3>{eachproduct.name}</h3>
            <p>{eachproduct.description}</p>
            <p>€{eachproduct.price}</p>
          </div>
        )
      })}
    </div>
  )
}

export default HomePage