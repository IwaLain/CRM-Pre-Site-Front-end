import { useEffect, useState } from "react";
import getColor from "../getColor";
import listView from "../../../assets/img/list-view.svg";
import blockView from "../../../assets/img/block-view.svg";

const Button = ({ children, color, type, onClick, className }) => {
  const [style, setStyle] = useState();

  useEffect(() => {
    if (color !== "default") setStyle({ backgroundColor: getColor(color) });
    else setStyle({ backgroundColor: getColor(color), color: "black" });
  }, [color]);

  return (
    <button
      className={
        type ? `${className} ui-kit__type-btn` : `${className} ui-kit__btn`
      }
      style={style}
      onClick={onClick}
      type={type}
    >
      {type ? (
        type === "list-view" ? (
          <img src={listView} />
        ) : type === "block-view" ? (
          <img src={blockView} />
        ) : (
          children
        )
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
