import Link from "next/link";

export default function CMSDashboard() {
  return (
    <div className="container-fluid">
      <h2 className="mb-1 text-green">
        <i className="bi bi-speedometer2 me-2"></i>
        Dashboard
      </h2>
      <p className="text-muted mb-4">Selamat datang di panel admin Bacapedia+</p>
      <div className="row g-4">
        <div className="col-md-4">
          <Link href="/cms/books" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-book fs-1 text-info"></i>
                <h5 className="fw-bold mt-3 mb-0">Books Management</h5>
                <p className="text-muted small mb-0">Kelola data buku</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-4">
          <Link href="/cms/users" className="text-decoration-none">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center py-5">
                <i className="bi bi-people fs-1 text-info"></i>
                <h5 className="fw-bold mt-3 mb-0">Users Management</h5>
                <p className="text-muted small mb-0">Kelola data user</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
