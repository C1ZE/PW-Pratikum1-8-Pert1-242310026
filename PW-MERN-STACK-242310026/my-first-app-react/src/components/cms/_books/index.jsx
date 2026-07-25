"use client";

import React, { useState } from "react";
import { ListBooks } from "@/const/booklist";
import { CardCalculates } from "../components/card_calculates";
import { Header } from "./components/header";
import { openModal } from "../../ui/modals";
import Form from "./components/form";
import Tabledata from "./components/tabledata";
export function MBooks() {
  const [books, setBooks] = useState(ListBooks);
  return (
    <div className="container-fluid">
      <Header handleAdd={() => openModal({ message: <Form />, size: "xl"})} />
      <div className="row">
        <div className="col-md-3">
          <CardCalculates
            title={`Total Books`}
            value={books.length}
            icon={`book`}
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title={`Free Book`}
            value={books.filter((b) => !b.is_free).length}
            icon={`grid`}
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title={`Subscribe`}
            value={books.filter((b) => b.is_free).length}
            icon={`calendar-event`}
          />
        </div>
        <div className="col-md-3">
          <CardCalculates
            title={`Subscribe`}
            value={books.filter((b) => b.author).length}
            icon={`people`}
          />
        </div>
      </div>
      <Tabledata data={books} />
    </div>
  );
}
export default MBooks;
