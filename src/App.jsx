import { useState } from "react";
import "./App.css";
import { imagesData as initialImagesData } from "./constants/images";

function App() {
  const [imagesData, setImagesData] = useState(initialImagesData);
  const [selectedImages, setSelectedImages] = useState([]);

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

  return (
    <>
      {selectedImages.length > 0 && (
        <button
          onClick={handleDelete}
          className="absolute top-0 right-11 w-[150px] h-[50px] m-5 bg-red-600 hover:bg-red-700 text-white"
        >
          Delete files
        </button>
      )}
      <div className="grid grid-cols-5 gap-4 mt-12">
        {imagesData.map((image, index) => (
          <div
            key={image?.id}
            className={index === 0 ? "col-span-2 row-span-2" : ""}
            onClick={() => handleImageSelect(image.id)}
          >
            <div className="border">
              <img
                src={image?.url}
                alt={`Image ${image?.id}`}
                className="w-full h-full object-cover"
              />
              <input
                type="checkbox"
                className=" top-2 left-2"
                onChange={() => handleImageSelect(image?.id)}
                checked={selectedImages.includes(image?.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
