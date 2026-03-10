import React from 'react'

function HomePage({products}) {
  return (
    <div>
      {console.log(products)}
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