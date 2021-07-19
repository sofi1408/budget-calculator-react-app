import React from "react";
import "./ListOfIems.style.css";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditIcon from "@material-ui/icons/Edit";

const ListOfIems = ({ items, editItem, deleteItem }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className="itemList">
          <div className="itemDesc">{item.description}</div>
          <div className="itemAmt">{item.amount}</div>
          <div className="icons">
            <EditIcon className="editIcon" onClick={() => editItem(item.id)} />
            <DeleteRoundedIcon
              className="deleteIcon"
              onClick={() => deleteItem(item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListOfIems;
