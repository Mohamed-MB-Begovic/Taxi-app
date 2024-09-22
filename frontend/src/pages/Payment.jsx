import Header from "../components/Header/Header";
import PaymentContent from "../components/payment/PaymentContent";
import Sidebar from "../components/sidebar/Sidebar";

export default function Payment() {
  return (
    <div className="page">
      <Header />
      <Sidebar />
      <PaymentContent />
    </div>
  );
}
