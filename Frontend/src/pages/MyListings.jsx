import { useEffect, useState } from "react";

export default function MyListings() {
  const [listings, setListings] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // fetch only owner's listings
  useEffect(() => {
    fetch("http://localhost:5000/api/listings", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // filter only your listings (temporary if backend not filtering)
        const myListings = data.filter(l => l.owner === user._id);
        setListings(myListings);
      });
  }, []);

  // delete listing
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this listing?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (res.ok) {
      setListings(listings.filter(l => l._id !== id));
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Listings</h2>

      {listings.map(l => (
        <div key={l._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <img src={l.image} alt="" width="200" />
          <h3>{l.title}</h3>
          <p>{l.location}</p>
          <p>${l.price}</p>

          <button onClick={() => handleDelete(l._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}