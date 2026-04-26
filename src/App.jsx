import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ChatbotPage from './pages/ChatbotPage'
import BookConsultationPage from './pages/BookConsultationPage'
import BookingSuccessPage from './pages/BookingSuccessPage'
import AdminLayout from './layouts/AdminLayout'
import ConsultationVerificationPage from './pages/admin/ConsultationVerificationPage'
import EnquiryReportPage from './pages/admin/EnquiryReportPage'
import ConsultationReportPage from './pages/admin/ConsultationReportPage'
import StaffReportPage from './pages/admin/StaffReportPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/enquiry" element={<ChatbotPage />} />
        <Route path="/book-consultation" element={<BookConsultationPage />} />
        <Route path="/book-consultation/success" element={<BookingSuccessPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/consultations" replace />} />
          <Route path="consultations" element={<ConsultationVerificationPage />} />
          <Route path="reports/enquiry" element={<EnquiryReportPage />} />
          <Route path="reports/consultations" element={<ConsultationReportPage />} />
          <Route path="reports/staff" element={<StaffReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
