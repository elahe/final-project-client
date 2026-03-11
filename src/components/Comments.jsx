import { useContext, useState } from "react"
import service from "../services/config.services"
import { AuthContext } from "../context/auth.context"

export default function Comments({ comments, setComments, productId }) {

  const { loggedUserId } = useContext(AuthContext)

  const [description, setDescription] = useState("")

  // for editing 
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  // add comments
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const body = {
        description,
        product: productId
      }

      await service.post("/comments", body)

      const response = await service.get(`/comments/${productId}/product`)
      setComments(response.data)

      setDescription("")

    } catch (error) {
      console.log(error)
    }
  }

  // delete
  const handleDelete = async (commentId) => {
    try {

      await service.delete(`/comments/${commentId}`)

      const response = await service.get(`/comments/${productId}/product`)
      setComments(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  // START EDIT MODE
  const handleEditClick = (comment) => {
    setEditingId(comment._id)
    setEditText(comment.description)
  }

  // edit
  const handleEditSave = async (commentId) => {
    try {

      await service.patch(`/comments/${commentId}`, {
        description: editText
      })

      const response = await service.get(`/comments/${productId}/product`)
      setComments(response.data)

      setEditingId(null)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-12 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Comments ({comments.length})
      </h2>

      <div className="space-y-4">

        {comments.map((eachComment) => (
          <div
            key={eachComment._id}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
          >

            <div className="flex justify-between items-center mb-2">

              <p className="font-medium text-gray-800">
                {eachComment.user?.name}
              </p>

              <span className="text-xs text-gray-400">
                {new Date(eachComment.createdAt).toLocaleDateString()}
              </span>

            </div>

            {editingId === eachComment._id ? (
              <div className="flex gap-2 mt-2">

                <input
                  className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button
                  onClick={() => handleEditSave(eachComment._id)}
                  className="bg-green-500 text-white px-3 py-2 rounded-md text-sm"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm"
                >
                  Cancel
                </button>

              </div>
            ) : (
              <>
                <p className="text-gray-600 leading-relaxed">
                  {eachComment.description}
                </p>

                {loggedUserId === eachComment.user?._id && (
                  <div className="flex gap-4 mt-3">

                    <button
                      onClick={() => handleEditClick(eachComment)}
                      className="text-gray-500 hover:text-blue-500 text-sm transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(eachComment._id)}
                      className="text-gray-500 hover:text-red-500 text-sm transition"
                    >
                      Delete
                    </button>

                  </div>
                )}
              </>
            )}

          </div>
        ))}

      </div>

      {/* comments form */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">

        <h3 className="font-medium mb-4 text-gray-800">
          Leave a comment
        </h3>

        <form
          onSubmit={handleSubmit}
          className="flex gap-3"
        >

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a comment..."
            className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
          />

          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md font-medium transition"
          >
            Send
          </button>

        </form>

      </div>

    </div>
  )
}