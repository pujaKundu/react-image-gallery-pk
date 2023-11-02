import { Triangle } from "react-loader-spinner";

const Loader = () => {
    return (
      <div>
        <Triangle
          height="80"
          width="80"
          color="#a11df2"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
};

export default Loader;