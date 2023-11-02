import { useState } from "react";
import { imagesData as initialImagesData } from "./constants/images";
import AddImage from "./components/AddImage";
import Header from "./components/Header";

function App() {
  const [imagesData, setImagesData] = useState(initialImagesData);
  const [selectedImages, setSelectedImages] = useState([]);
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

  
  return (
    <div className="bg-gradient-to-tr from-white via-purple-100 to-blue-100 p-5">
      {selectedImages.length > 0 ? (
        <Header length={selectedImages.length} handleDelete={handleDelete} />
      ) : (
        <h3 className="font-bold text-2xl p-3 text-slate-900">Pictoria</h3>
      )}

      <div className="grid lg:grid-cols-5 md:grid-cols-2   gap-4 mt-12 ">
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
      </div>
      <AddImage imagesData={imagesData} setImagesData={setImagesData} />
    </div>
  );
}

export default App;
