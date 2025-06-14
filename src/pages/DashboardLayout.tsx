import { Outlet, NavLink } from "react-router";
import { BellRing, Bolt, Grid2X2Plus, Home, List } from "lucide-react";
import logo from "../assets/code.png"

const navItems = [
  { name: "Dashboard", to: "/dashboard", icon: Home },
  { name: "Post Challenge", to: "/post-challenge", icon: List },
  { name: "My Challenges", to: "/my-hallenges", icon: Grid2X2Plus },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="p-6 flex flex-row items-center">
              <img
              src={logo}
              alt="CodEdit Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-blue-600 font-bold text-2xl">
               CodEdit</span>
          </div>
          <nav className="space-y-2 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Settings at the bottom */}
        <div className="p-4">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition text-gray-700 hover:bg-gray-100 ${
                isActive ? "bg-indigo-100 text-indigo-700" : ""
              }`
            }
          >
            <Bolt className="w-5 h-5" />
            Settings
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <div className="w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-indigo-600">
              <BellRing className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700">Tom Cook</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
