import BootstrapProvider from "@/components/ui/bootstrapClient";
import LandingPage from "@/components/landing-pages/index";

export default function Page() {
  return (
    <BootstrapProvider>
      <LandingPage />
    </BootstrapProvider>
  );
}
