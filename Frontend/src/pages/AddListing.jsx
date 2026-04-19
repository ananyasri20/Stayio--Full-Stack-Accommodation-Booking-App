import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddListing() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    image: ""
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create listing");
        return;
      }

      alert("Listing created successfully ✅");
      navigate("/my-listings");

    } catch (err) {
      console.error(err);
      alert("Error creating listing");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Listing</h2>

      <input placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })} />

      <input placeholder="Price"
        onChange={e => setForm({ ...form, price: e.target.value })} />

      <input placeholder="Location"
        onChange={e => setForm({ ...form, location: e.target.value })} />

      <input placeholder="Image URL"
        onChange={e => setForm({ ...form, image: e.target.value })} />

      <button onClick={handleSubmit}>Create Listing</button>
    </div>
  );
}