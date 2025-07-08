import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { useState } from "react";
import {
  Bolt,
  CheckCircle,
  Grid2X2Plus,
  Home,
  List,
  LogOut,
  Menu,
  Search,
  X,
} from "lucide-react";
import logo from "../assets/code.png";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const navItems = [
  { name: "Dashboard", to: "/dashboard/home", icon: Home },
  { name: "Post Challenge", to: "/dashboard/post-challenge", icon: List },
  { name: "My Challenges", to: "/dashboard/my-challenges", icon: Grid2X2Plus },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useUser()
  const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);

const confirmLogout = () => setConfirmLogoutOpen(true);
const cancelLogout = () => setConfirmLogoutOpen(false);

  const navigate = useNavigate();

  const handleLogout = () => {
  logout()
    setConfirmLogoutOpen(false);

  toast.success("Logout successful", {
    icon: <CheckCircle className="text-green-500" />,
    duration: 4000,
  });

  navigate("/");
};


  return (
    <div className="h-screen flex overflow-hidden">
  <aside
    className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0 md:relative md:flex md:flex-col md:w-64`}
  >
    <div className="flex flex-col justify-between w-full h-full overflow-y-auto">
      <div>
        <div className="p-6 flex items-center justify-between md:justify-start md:gap-3">
          <Link to={"/"} className="flex flex-row items-center">
            <img src={logo} alt="CodEdit Logo" className="w-10 h-10 object-contain" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 font-bold text-2xl">CodEdit</span>
          </Link>
          <button
            className="md:hidden text-gray-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="space-y-2 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition text-gray-700 hover:bg-gray-100 ${
              isActive ? "bg-indigo-100 text-indigo-700" : ""
            }`
          }
          onClick={() => setSidebarOpen(false)}
        >
          <Bolt className="w-5 h-5" />
          Settings
        </NavLink>
      </div>
    </div>
  </aside>

  {sidebarOpen && (
    <div
      className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
      onClick={() => setSidebarOpen(false)}
    />
  )}

  <div className="flex-1 flex flex-col overflow-hidden">
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          className="text-gray-600 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex flex-row items-center gap-3 w-full max-w-sm">
          <Search color="#d1d5dc"/>
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 rounded-3xl focus:ring-2 focus:ring-indigo-200 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={confirmLogout} className="rounded-3xl cursor-pointer px-4" variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
      </div>
    </header>

    <main className="flex-1 relative isolate overflow-y-auto p-1 sm:p-4 bg-gray-50">
      {/* ✨ Nicer Background Blobs */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <div className="absolute left-[calc(50%-12rem)] top-[calc(50%-8rem)] h-[36rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rotate-45 transform-gpu opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side at 50% 50%, #60a5fa, transparent 60%)',
          }}
        />
        <div className="absolute right-[10%] top-[20%] h-96 w-96 rounded-full bg-green-600 opacity-10 blur-[100px] mix-blend-multiply" />
        <div className="absolute left-[10%] bottom-[10%] h-96 w-96 rounded-full bg-blue-500 opacity-10 blur-[100px] mix-blend-multiply" />
      </div>
      <Outlet />
    </main>
    <ConfirmDialog
  isOpen={confirmLogoutOpen}
  title="Confirm Logout"
  description="Are you sure you want to logout? This action cannot be undone."
  onClose={cancelLogout}
  onConfirm={() => {
    handleLogout();
  }}
/>

  </div>
</div>

  );
}
