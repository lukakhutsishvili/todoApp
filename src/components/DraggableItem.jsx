import React from "react";
import { useDrag, useDrop } from "react-dnd";
import Check from "./check";
import Cross from "../assets/images/icon-cross.svg";

const DraggableItem = ({
  item,
  index,
  isChecked,
  handleDelete,
  moveItem,
  light,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li
      ref={(node) => drag(drop(node))}
      onClick={() => isChecked(index)}
      className={isDragging ? "dragging" : ""}
    >
      <div className="flex">
        <div className="textdiv">
          <button
            className="checkbox"
            style={
              item.Checked
                ? {
                    background:
                      "linear-gradient(135deg, #5df 0%, #c058f3 100%)",
                  }
                : {}
            }
          >
            <div
              className="borderdiv"
              style={{
                background: light ? "#FFF" : "#25273D",
                ...(item.Checked
                  ? {
                      background:
                        "linear-gradient(135deg, #5df 0%, #c058f3 100%)",
                    }
                  : {}),
              }}
            >
              <Check item={item} />
            </div>
          </button>
          <p
            style={{
              color: light ? "#494C6B" : "#C8CBE7",
              ...(item.Checked
                ? { color: "#D1D2DA", textDecoration: "line-through" }
                : {}),
            }}
          >
            {item.text}
          </p>
        </div>
        <img
          className="cross"
          src={Cross}
          alt="Delete"
          onClick={(e) => handleDelete(e, index)}
        />
      </div>

      <div
        className="greydiv"
        style={light ? {} : { background: "#393A4B" }}
      ></div>
    </li>
  );
};

export default DraggableItem;
