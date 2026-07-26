"use client";

import React, { useEffect, useState } from "react";
import { openModal } from "@/components/ui/modals";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/loading";
import { GET_ALL_USER } from "@/components/apis/UserServices";
import { CardCalculates } from "../components/card_calculates";
import { Header } from "./components/header";
import Form from "./components/form";
import Tabledata from "./components/tabledata";

export function MUsers() {
  const [users, setUsers] = useState({ loading: false, data: [], message: "" });

  const ReloadUser = async () => {
    setUsers({ loading: true, data: [], message: "" });
    const results = await GET_ALL_USER();
    setUsers(results);
  };

  useEffect(() => {
    ReloadUser();
  }, []);

  return (
    <div className="container-fluid">
      <Header handleAdd={() => openModal({ message: <Form ReloadUser={ReloadUser} />, size: "lg" })} />

      <div className="row">
        <div className="col-md-4">
          <CardCalculates title="Total Users" value={users?.data.length} icon="people" />
        </div>
        <div className="col-md-4">
          <CardCalculates title="Active" value={users?.data.filter((u) => u.is_active).length || 0} icon="check-circle" />
        </div>
        <div className="col-md-4">
          <CardCalculates title="Inactive" value={users?.data.filter((u) => !u.is_active).length || 0} icon="x-circle" />
        </div>
      </div>

      {users.loading ? (
        <Skeleton />
      ) : users.message ? (
        <Alert message={users.message} variant="danger" />
      ) : users.data && users.data.length > 0 ? (
        <Tabledata data={users.data} ReloadData={ReloadUser} />
      ) : (
        ""
      )}
    </div>
  );
}

export default MUsers;
