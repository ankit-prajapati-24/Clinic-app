import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [path,setPath] = useState(useLocation.pathname);

  console.log(pathname);

  useEffect(() => {
    console.log("Scroll");
    window.scrollTo(0, 0);
  }, [path]);

  return null;
};

export default ScrollToTop;
