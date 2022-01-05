import { useEffect, useState } from "react";
import getColor from "../getColor";
import listView from "../../../assets/img/list-view.svg";
import blockView from "../../../assets/img/block-view.svg";

const Button = ({
  children,
  color,
  type,
  onClick,
  className,
  dataBsToggle,
  dataBsTarget,
  style,
}) => {
  const [formattedStyle, setFormattedStyle] = useState();

  useEffect(() => {
    let newStyle;
    let colorStyle;

    if (color !== "default") colorStyle = { backgroundColor: getColor(color) };
    else colorStyle = { backgroundColor: getColor(color), color: "black" };

    if (style) newStyle = { ...style, ...colorStyle };
    else newStyle = colorStyle;

    setFormattedStyle(newStyle);
  }, [color, style]);

  return (
    <button
      className={
        type ? `${className}` : `${className} `
      }
      style={formattedStyle}
      onClick={onClick}
      type={type}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
    >
      {type ? (
        type === "list-view" ? (
          <img src={listView} alt="list-view error" />
        ) : type === "block-view" ? (
          <img src={blockView} alt="block-view error" />
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
