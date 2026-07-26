"use client";
import React, { useMemo, useState } from "react";
import { Cards } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { openModal } from "@/components/ui/modals";
import { DELETE_USER } from "@/components/apis/UserServices";
import Form from "./form";
import {
  HeaderDatatables,
  SearchInput,
  PaginationComponent,
} from "@/components/ui/datatables";
export default function Tabledata({ data, ReloadData }) {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [totalitems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const handleEdit = (user) => {
    openModal({ message: <Form user_id={user.id} ReloadUser={ReloadData} />, size: "lg" });
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Hapus user ini?");
    if (confirmed) {
      const result = await DELETE_USER(id);
      if (result.success) {
        ReloadData();
      } else {
        alert(result.message || "Gagal menghapus user");
      }
    }
  };
  const table_headers = [
    { name: "No", field: "id", sortable: false, className: "text-center" },
    { name: "Email", field: "email", sortable: true },
    { name: "Username", field: "username", sortable: true },
    { name: "Status", field: "is_active", sortable: true, className: "text-center" },
    { name: "Actions", field: "id", sortable: false },
  ];
  const ResultData = useMemo(() => {
    let computedData = data;
    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) => {
          try {
            const value = listData[key];
            return (
              value != null &&
              String(value).toLowerCase().includes(search.toLowerCase())
            );
          } catch (error) {
            return false;
          }
        });
      });
    }
    setTotalItems(computedData.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData = computedData.sort(
        (a, b) => reversed * String(a[sorting.field]).localeCompare(String(b[sorting.field])),
      );
    }
    if (computedData.length > 0) {
      return computedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
      );
    } else {
      return [];
    }
  }, [data, search, sorting, currentPage]);
  return (
    <Cards>
      <Cards.Header>
        <span className="card-label fw-bold fs-3">User Lists</span>
        <div className="w-50">
          <SearchInput
            keyword={search}
            onAction={(e) => setSearch(e.target.value)}
          />
        </div>
      </Cards.Header>
      <Cards.Body className={`px-0 pb-0`}>
        <div className="table-responsive">
          <table className="table table-hover">
            <HeaderDatatables
              headers={table_headers}
              onSorting={(field, order) =>
                setSorting({
                  field,
                  order,
                })
              }
            />
            <tbody>
              {ResultData.length > 0 ? (
                ResultData.map((user, index) => (
                  <tr key={user.id}>
                    <td className="text-center">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td>
                      <strong>{user.email}</strong>
                    </td>
                    <td>{user.username}</td>
                    <td className="text-center">
                      <span className={`badge ${user.is_active ? "bg-success" : "bg-secondary"}`}>
                        {user.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="warning"
                        outline
                        className="btn-sm me-2"
                        onClick={() => handleEdit(user)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="danger"
                        outline
                        className="btn-sm me-2"
                        onClick={() => handleDelete(user.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <i className="bi bi-inbox fs-1 text-muted d-block mb-3"></i>
                    <p className="text-muted mb-0">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalitems > 0 && (
            <div className="d-flex align-items-center justify-content-center">
              <PaginationComponent
                total={totalitems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>
      </Cards.Body>
    </Cards>
  );
}
