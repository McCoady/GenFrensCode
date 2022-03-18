import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <h1>
      <PageHeader
        title="Gen-Frens"
        subTitle="wanna be frens forever?"
        style={{ cursor: "pointer" }}
      />
    </h1>
  );
}
