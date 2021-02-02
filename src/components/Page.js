import React, { useEffect } from "react";

const Page = (props) => {
  useEffect(() => {
    document.title = `${props.title}`;
    window.scrollTo(0, 0);
  }, [props.title]);

  return <div className={props.className}>{props.children}</div>;
};

export default Page;
