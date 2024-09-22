import Header from "../components/Header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import ViewAttendanceComp from "../components/ViewAttendance/ViewAttendanceComp";

export default function ViewAttendance() {
  return (
    <div className="page">
      <Header />
      <Sidebar />
      <ViewAttendanceComp />
    </div>
  );
}
