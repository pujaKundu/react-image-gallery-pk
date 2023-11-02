import { useState } from "react";

import { imagesData as initialImagesData } from "./constants/images";
import icon from "./assets/icons/checkbox.png";

function App() {
  const [imagesData, setImagesData] = useState(initialImagesData);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(1);
  const [draggedImage, setDraggedImage] = useState(null);

  //toggles image selection
  const handleImageSelect = (imageId) => {
    //deselects image
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      //add image or select image
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const handleDelete = () => {
    const updatedImages = imagesData.filter(
      (image) => !selectedImages.includes(image?.id)
    );
    //update image list
    setImagesData(updatedImages);
    setSelectedImages([]);
  };

  // drag and drop handlers
  const handleDragStart = (event, image) => {
    setDraggedImage(image);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.parentNode);
  };

  const handleDragOver = (index) => {
    const draggedOverImage = imagesData[index];
    if (draggedImage === draggedOverImage) return;
    let updatedImagesData = imagesData.filter(
      (image) => image !== draggedImage
    );
    updatedImagesData.splice(index, 0, draggedImage);
    setImagesData(updatedImagesData);
  };

  const handleDragEnd = () => {
    setDraggedImage(null);
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files); // Get the uploaded files
    const newImages = files.map((file) => ({
      id: imagesData.length + 1, // Generate new IDs for the added images
      url: URL.createObjectURL(file), // Use URL.createObjectURL to show images temporarily
    }));
    setImagesData([...imagesData, ...newImages]); // Append the new images to the existing imagesData
  };

  return (
    <div className="bg-gradient-to-tr from-white via-purple-100 to-blue-100 p-5">
      {selectedImages.length > 0 ? (
        <div className="flex justify-between  pt-3">
          <div className="flex items-center">
            <span>
              <img src={icon} alt="icon" className="w-5 h-5 mr-3" />
            </span>
            {selectedImages.length === 1 ? (
              <span className="font-bold">
                {selectedImages.length} file selected
              </span>
            ) : (
              <span className="font-bold">
                {selectedImages.length} files selected
              </span>
            )}
          </div>
          <button
            onClick={handleDelete}
            className=" w-[150px] h-[50px]  text-red-600 hover:bg-red-600 hover:text-white border-0 bg-transparent transition-all ease-in-out duration-300"
          >
            {selectedImages.length === 1 ? (
              <span>Delete file</span>
            ) : (
              <span>Delete files</span>
            )}
          </button>
        </div>
      ) : (
        <h3 className="font-bold text-2xl p-3">Gallery</h3>
      )}

      <div className="grid lg:grid-cols-5 sm:grid-cols-3  gap-4 mt-12 ">
        {imagesData.map((image, index) => (
          <div
            key={image?.id}
            className={
              index === 0
                ? "col-span-2 row-span-2 rounded hover:scale-105 transition-all ease-in-out duration-30"
                : ""
            }
            onClick={() => handleImageSelect(image.id)}
            onDragOver={() => handleDragOver(index)}
          >
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, image)}
              onDragEnd={handleDragEnd}
              className={`relative border rounded-lg ${
                image.id === draggedImage?.id ? "opacity-50" : "opacity-100"
              }`}
            >
              <input
                type="checkbox"
                className="absolute top-0 left-0 ml-8 mt-7 "
                onChange={() => handleImageSelect(image?.id)}
                checked={selectedImages.includes(image?.id)}
              />
              <img
                src={image?.url}
                alt={`Image ${image?.id}`}
                className={`w-full h-full object-cover shadow-md rounded-lg ${
                  selectedImages.includes(image?.id)
                    ? "opacity-50"
                    : "opacity-100"
                }`}
              />
              {/* for grayscale effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-slate-900 opacity-0 hover:opacity-50 hover:rounded-lg transition duration-300 ease-in-out transform hover:grayscale"></div>
              
            </div>
          </div>
        ))}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddImage}
          className="hidden"
          id="upload"
        />
        <label
          htmlFor="upload"
          className="block w-[150px] h-[150px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer text-center"
        >
          <div className="m-auto text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-gray-400">Add Image</span>
          </div>
        </label>
      </div>
    </div>
  );
}

export default App;
