import Sidebar from "@/components/cms/components/sidebar";
import Modals from "@/components/ui/modals";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import "./cms.css";

export const metadata = {
  title: "CMS - Bacapedia+",
  description: "Content Management System untuk mengelola konten Bacapedia+",
};

export default function CMSLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="cms-container">
        <Sidebar />
        <main className="main-content p-4">{children}</main>
      </div>
      <Modals />
    </ProtectedRoute>
  );
}
