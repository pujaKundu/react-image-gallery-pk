import icon from "../assets/icons/checkbox.png";

const Header = ({ length, handleDelete }) => {
  return (
    <div className="flex justify-between  pt-3">
      <div className="flex items-center">
        <span>
          <img src={icon} alt="icon" className="w-5 h-5 mr-3" />
        </span>
        {length === 1 ? (
          <span className="font-bold">{length} file selected</span>
        ) : (
          <span className="font-bold">{length} files selected</span>
        )}
      </div>
      <button
        onClick={handleDelete}
        className=" w-[150px] h-[50px]  text-red-600 hover:bg-red-600 hover:text-white border-0 bg-transparent transition-all ease-in-out duration-300"
      >
        {length === 1 ? <span>Delete file</span> : <span>Delete files</span>}
      </button>
    </div>
  );
};

export default Header;
