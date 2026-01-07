import "./item-manager-app.css";

import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  // refs for the other inputs
  const itemCategory = useRef(null);
  const itemPrice = useRef(null);

  // auto-increment id (keeps value even when component re-renders)
  const nextId = useRef(1);

  // available categories (no default selected)
  const categories = ["Stationary", "Kitchenware", "Appliance"];

  function handleAddItem() {
    const name = itemName.current.value.trim();
    const category = itemCategory.current.value;
    const price = Number(itemPrice.current.value);

    // 1) name not empty
    if (name === "") {
      setErrorMsg("Item name must not be empty");
      return;
    }

    // 2) name not duplicated (case-insensitive)
    const dup = items.some(
      (it) => it.name.toLowerCase() === name.toLowerCase()
    );
    if (dup) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    // 3) category must be selected
    if (category === "") {
      setErrorMsg("Please select a category");
      return;
    }

    // 4) price must not be less than 0
    if (price < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    // valid -> clear error
    setErrorMsg("");

    const newItem = {
      id: nextId.current,
      name: name,
      category: category,
      price: price,
    };

    nextId.current += 1;
    setItems([...items, newItem]);

    // optional: clear inputs
    itemName.current.value = "";
    itemCategory.current.value = "";
    itemPrice.current.value = 0;
  }

  function getCategoryIcon(category) {
    if (category === "Stationary") return stationaryLogo;
    if (category === "Kitchenware") return kitchenwareLogo;
    return applianceLogo; // Appliance
  }

  // NEW: delete handler
  function handleDeleteItem(id) {
    setItems(items.filter((it) => it.id !== id));
  }

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {/* items list (must be above the form row) */}
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={getCategoryIcon(item.category)}
                    alt={item.category}
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  {/* NEW: clickable delete */}
                  <img
                    src={deleteLogo}
                    alt="delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </td>
              </tr>
            ))}

            {/* form row (must be the LAST row) */}
            <tr>
              <td></td>
              <td>
                <input ref={itemName} type="text" />
              </td>
              <td>
                <select ref={itemCategory} defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input ref={itemPrice} type="number" defaultValue={0} />
              </td>
              <td>
                <button onClick={handleAddItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">{errorMsg}</div>
    </>
  );
}

export default ItemManager;