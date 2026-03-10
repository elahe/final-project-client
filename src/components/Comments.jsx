

export default function Comments({comments,setComments}) {

  return (
    <div>
        {/* {console.log(comments)} */}
        {
            comments.map((eachComment)=>{
                return(
                    <div key = {eachComment._id}>
                    <p>{eachComment.description}</p>
                    </div>
                )
            })
        }
    </div>
  )
}
