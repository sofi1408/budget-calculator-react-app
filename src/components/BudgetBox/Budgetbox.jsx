import React, { useState, useMemo } from "react";
import "./Budgetbox.style.css";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ListOfIems from "../ListOfIems/ListOfIems";
import { v4 as uuidv4 } from "uuid";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
    },
  },
}));

const BudgetBox = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [desc, setDecs] = useState("");
  const [amt, setAmt] = useState();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (desc.trim() === "" || !amt || amt <= 0) {
      setAlert({
        type: "error",
        message: "Please Enter Valid Data",
      });
    } else {
      if (edit) {
        const editedExpenses = items.map((item) => {
          if (item.id === id) {
            item.description = desc;
            item.amount = amt;
          }
          return item;
        });
        setItems(editedExpenses);
        setEdit(false);
      } else {
        let data = {};
        data["id"] = uuidv4();
        data["description"] = desc;
        data["amount"] = amt;
        setItems([...items, data]);
        setDecs("");
        setAmt(0);
        setAlert({
          type: "success",
          message: "Value Added Successfully",
        });
      }
    }
  };

  const handleReset = () => {
    setItems([]);
    setAlert({
      type: "warning",
      message: "List is reset",
    });
  };

  const editItem = (id) => {
    const item = items.filter((item) => item.id === id);
    setDecs(item[0].description.trim());
    setAmt(item[0].amount);
    setId(id);
    setEdit(true);
  };

  const total = useMemo(() => {
    let sum = 0;
    if (items.length > 0) {
      items.forEach((item) => (sum = sum + parseInt(item.amount)));
    }
    return sum;
  }, [items]);

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setAlert({
      type: "success",
      message: "Item Deleted Successfully",
    });
  };
  return (
    <>
      {alert.type === "error" && (
        <Alert severity="error" className="alert">
          <AlertTitle>Error</AlertTitle>
          <strong>{alert.message}</strong>
        </Alert>
      )}
      {alert.type === "success" && (
        <Alert severity="success" className="alert">
          <AlertTitle>Success</AlertTitle>
          <strong>{alert.message}</strong>
        </Alert>
      )}
      {alert.type === "warning" && (
        <Alert severity="warning" className="alert">
          <AlertTitle>Message</AlertTitle>
          <strong>{alert.message}</strong>
        </Alert>
      )}
      <div className="budgetBox">
        <form className={classes.root} noValidate autoComplete="off">
          <Input
            placeholder="Add description"
            type="text"
            inputProps={{ "aria-label": "description" }}
            value={desc || ""}
            onChange={(e) => setDecs(e.target.value)}
            name="description"
          />
          <Input
            placeholder="Amount"
            type="Number"
            inputProps={{ "aria-label": "description" }}
            value={amt || 0}
            onChange={(e) => setAmt(e.target.value)}
            name="amount"
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
          <Button variant="contained" color="primary" onClick={handleReset}>
            Reset All
          </Button>
        </form>
        {items.length > 0 && (
          <ListOfIems
            items={items}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        )}
        <div className="total">
          <span>Total Amount Spent is : </span>{" "}
          <span className="totalAmt">{total.toLocaleString()}</span>
        </div>
      </div>
    </>
  );
};

export default BudgetBox;
