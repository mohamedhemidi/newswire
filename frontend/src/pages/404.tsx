import React from "react";

const styles: React.HTMLAttributes<HTMLDivElement> | React.CSSProperties = {
  height: "70vh",
  width: "100wh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};
const Page404 = () => {
  return (
    <div style={styles}>
      <h1>Oops ! Looks like this page doesn't exist!</h1>
    </div>
  );
};

export default Page404;
