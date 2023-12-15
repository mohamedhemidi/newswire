import ErrorIcon from "assets/icons/error";

const Page404 = () => {
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>
        <ErrorIcon /> 404 - Ooops.. Not Found!
      </h1>
    </div>
  );
};

export default Page404;
