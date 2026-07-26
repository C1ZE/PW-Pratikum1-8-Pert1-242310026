import React from "react";
import { Button } from "@/components/ui/button";
export function Header({ handleAdd }) {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="mb-1 text-green">
              <i className="bi bi-people me-2"></i>
              Users Management
            </h2>
            <p className="text-muted mb-0">Manage admin and staff accounts</p>
          </div>
          <Button
            className="d-flex align-items-center gap-2"
            onClick={handleAdd}
            style={{ backgroundColor: "#437059", borderColor: "#437059" }}
          >
            <i className="bi bi-plus-circle"></i>
            Add New User
          </Button>
        </div>
      </div>
    </div>
  );
}
