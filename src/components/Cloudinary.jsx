import { useState } from "react";
import axios from "axios";

function UploadImage({ setCoverImageUrl }) {
  const [file, setFile] = useState("");
  const [upload, setUpload] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadImage = async () => {
    if (!file) return;
    setUpload(true);
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "bilelmrz");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dy9upslic/upload`,
        form,
      );
      console.log(response.data);
      setUpload(false);
      setCoverImageUrl(response.data.secure_url);
      console.log("Upload success!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUpload(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Click me to upload an Image of the place
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-black shadow-2xl rounded-lg p-6 w-[400px] mx-4 max-w-full">
            <div className="mb-4">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || "")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                accept="image/*"
              />
            </div>
            
            <button
              onClick={uploadImage}
              disabled={!file || upload}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                !file || upload
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {upload ? (
                <>
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </button>

            <button
              onClick={handleClose}
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UploadImage;
