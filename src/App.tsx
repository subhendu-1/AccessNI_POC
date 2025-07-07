
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { FormProvider } from "./contexts/FormContext";
import Index from "./pages/Index";
import AccessNIForm from "./pages/AccessNIForm";
import AccessNIFormStep2 from "./pages/AccessNIFormStep2";
import AccessNIFormStep3 from "./pages/AccessNIFormStep3";
import AccessNIFormStep4 from "./pages/AccessNIFormStep4";
import AccessNIFormStep5 from "./pages/AccessNIFormStep5";
import AccessNIFormStep5Add from "./pages/AccessNIFormStep5Add";
import AccessNIFormStep6 from "./pages/AccessNIFormStep6";
import AccessNIFormStep7 from "./pages/AccessNIFormStep7";
import AccessNIFormStep8 from "./pages/AccessNIFormStep8";
import AccessNIFormStep9 from "./pages/AccessNIFormStep9";
import AccessNIFormStep10 from "./pages/AccessNIFormStep10";
import AccessNIFormStep11 from "./pages/AccessNIFormStep11";
import AccessNIFormStep12 from "./pages/AccessNIFormStep12";
import AccessNIFormStep12Payment from "./pages/AccessNIFormStep12Payment";
import AccessNIFormStep13 from "./pages/AccessNIFormStep13";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FormProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/accessni-form" element={<AccessNIForm />} />
              <Route path="/accessni-form-step2" element={<AccessNIFormStep2 />} />
              <Route path="/accessni-form-step3" element={<AccessNIFormStep3 />} />
              <Route path="/accessni-form-step4" element={<AccessNIFormStep4 />} />
              <Route path="/accessni-form-step5" element={<AccessNIFormStep5 />} />
              <Route path="/accessni-form-step5-add" element={<AccessNIFormStep5Add />} />
              <Route path="/accessni-form-step6" element={<AccessNIFormStep6 />} />
              <Route path="/accessni-form-step7" element={<AccessNIFormStep7 />} />
              <Route path="/accessni-form-step8" element={<AccessNIFormStep8 />} />
              <Route path="/accessni-form-step9" element={<AccessNIFormStep9 />} />
              <Route path="/accessni-form-step10" element={<AccessNIFormStep10 />} />
              <Route path="/accessni-form-step11" element={<AccessNIFormStep11 />} />
              <Route path="/accessni-form-step12" element={<AccessNIFormStep12 />} />
              <Route path="/accessni-form-step12-payment" element={<AccessNIFormStep12Payment />} />
              <Route path="/accessni-form-step13" element={<AccessNIFormStep13 />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FormProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
