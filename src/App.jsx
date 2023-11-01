import { useState } from "react";
import "./App.css";
import { imagesData as initialImagesData } from "./constants/images";
import icon from './assets/icons/checkbox.png'

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
      {selectedImages.length > 0 ? (
        <div className="flex justify-between  mt-5">
          <div className="flex items-center">
            <span>
              <img src={icon} alt="icon" className="w-5 h-5 mr-3" />
            </span>
            {selectedImages.length === 1 ? (
              <span>{selectedImages.length} file selected</span>
            ) : (
              <span>{selectedImages.length} files selected</span>
            )}
          </div>
          <button
            onClick={handleDelete}
            className=" w-[150px] h-[50px] bg-red-600 hover:bg-red-700 text-white"
          >
            Delete files
          </button>
        </div>
      ) : (
        <h3>Gallery</h3>
      )}

      <div className="grid lg:grid-cols-5 sm:grid-cols-3  gap-4 mt-12">
        {imagesData.map((image, index) => (
          <div
            key={image?.id}
            className={index === 0 ? "col-span-2 row-span-2" : ""}
            onClick={() => handleImageSelect(image.id)}
          >
            <div className="relative border rounded-lg ">
              <input
                type="checkbox"
                className="absolute top-0 left-0 ml-8 mt-7 "
                onChange={() => handleImageSelect(image?.id)}
                checked={selectedImages.includes(image?.id)}
              />
              <img
                src={image?.url}
                alt={`Image ${image?.id}`}
                className={`w-full h-full object-cover ${
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
      </div>
    </>
  );
}

export default App;
