import { useState } from "react";

export const DeleteProfile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [token] = useState(storedToken ? storedToken : null);

  if (!storedToken) {
    console.log("Token not found in localstorage");
    return;
  }

  fetch(
    `https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/users/${localUser._id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    if (response.ok) {
      // logging out
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      alert("User deleted");

      // redirect to login page
      window.location.href = "/login";
    } else {
      alert("User deletion failed");
    }
  });
};
