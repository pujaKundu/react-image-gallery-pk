

const AddImage = ({ imagesData ,setImagesData}) => {
  const handleAddImage = (e) => {
    const files = Array.from(e.target.files); 
    const newImages = files.map((file) => ({
      id: imagesData.length + 1, 
      url: URL.createObjectURL(file), 
    }));
    setImagesData([...imagesData, ...newImages]); 
  };
  return (
    <div className="grid-item rounded-lg border-dashed border-gray-300 cursor-pointer text-center mt-5 ml-1">
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
  );
};

export default AddImage;