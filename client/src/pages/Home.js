import React from "react";
import { useSelector } from "react-redux";
export const Home = () => {
  const select = useSelector((item) => item.user);
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const token = getCookie("id");
  return (
    <div>
      hello {select.id} {token}{" "}
    </div>
  );
};
