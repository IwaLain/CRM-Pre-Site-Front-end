import { useState, useEffect } from "react";
import getColor from "../getColor";

const Badge = ({ children, color }) => {
  const [style, setStyle] = useState();

  useEffect(() => {
    if (color !== "default") setStyle({ backgroundColor: getColor(color) });
    else setStyle({ backgroundColor: getColor(color), color: "black" });
  }, [color]);

  return (
    <span className="ui-kit__badge" style={style}>
      {children}
    </span>
  );
};

export default Badge;
