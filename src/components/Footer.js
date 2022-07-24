import React, { Component } from "react";

export default function Footer() {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        marginTop: "20px"
      }}
    >
      <span
        className="text-muted"
        style={{
          margin: "20px",
          color: "#333",
        }}
      >
        © 2022 - Made by lilbillbiscuit |
        <a
          href="https://github.com/lilbillybiscuit/InviteApi"
          style={{ marginLeft: "5px", color: "#333" }}
        >
          Github
        </a>
      </span>
    </div>
  );
}
