import React, { useEffect, useState } from "react";
import axios from "axios";

const GroceryDashboard = ({ userFirstName }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1 });
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", quantity: 1 });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/groceries", {
        withCredentials: true,
      });
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch groceries:", err.message);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name) return;

    try {
      const res = await axios.post("http://localhost:5000/api/groceries", newItem, {
        withCredentials: true,
      });
      setItems([...items, res.data]);
      setNewItem({ name: "", quantity: 1 });
    } catch (err) {
      console.error("Failed to add item:", err.message);
    }
  };

  const toggleFound = async (itemId) => {
    try {
      await axios.put(`http://localhost:5000/api/groceries/${itemId}/toggle`, {}, {
        withCredentials: true,
      });
      setItems((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, found: !item.found } : item
        )
      );
    } catch (err) {
      console.error("Toggle error:", err.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/groceries/${itemId}`, {
        withCredentials: true,
      });
      setItems(items.filter((item) => item._id !== itemId));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditValues({ name: item.name, quantity: item.quantity });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValues({ name: "", quantity: 1 });
  };

  const saveEdit = async (itemId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/groceries/${itemId}`, editValues, {
        withCredentials: true,
      });
      setItems((prev) =>
        prev.map((item) => (item._id === itemId ? res.data : item))
      );
      cancelEdit();
    } catch (err) {
      console.error("Edit error:", err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Hi, {userFirstName}! 🛒 Your Grocery List</h3>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              min="1"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
              }
              required
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>

      {/* Grocery List as Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={item.found}
                  onChange={() => toggleFound(item._id)}
                />
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="text"
                    value={editValues.name}
                    onChange={(e) =>
                      setEditValues({ ...editValues, name: e.target.value })
                    }
                    className="form-control"
                  />
                ) : (
                  <span
                    style={{
                      textDecoration: item.found ? "line-through" : "none",
                    }}
                  >
                    <strong>{item.name}</strong>
                  </span>
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <input
                    type="number"
                    value={editValues.quantity}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="form-control"
                    min="1"
                  />
                ) : (
                  <span>{item.quantity}</span>
                )}
              </td>
              <td>
                {editId === item._id ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => saveEdit(item._id)}
                    >
                      Save
                    </button>
                    <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => startEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroceryDashboard;

