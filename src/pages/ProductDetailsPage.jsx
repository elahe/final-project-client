import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from '../components/Comments'
import service from '../services/config.services'

function ProductDetailsPage({products}) {
    
    const {productId} = useParams()
    const product = products.find((eachProduct) => eachProduct._id === productId)
    //comments part
    
    const [comments,setComments] = useState([])
    useEffect(()=>{
      const getComments = async() =>{
        try {
          const response = await service.get(`/comments/${productId}/product`)
          setComments(response.data)
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
      getComments()
    },[productId])
    // {console.log(comments)}


    if (!product) { // why it does work with safty check?
    return <h2>Loading product...</h2>
  }
  return (
    <>
      <div>
        <img src={product.imageUrl} width="300" />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>€{product.price}</p>
      </div>
      <Comments comments={comments} setComments={setComments}/>
    </>
  )
}

export default ProductDetailsPage