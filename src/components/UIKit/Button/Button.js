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
          <i class="fas fa-bars" alt="list-view error"></i>
        ) : type === "block-view" ? (
          <i class="fas fa-th-large" alt="block-view error"></i>
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
