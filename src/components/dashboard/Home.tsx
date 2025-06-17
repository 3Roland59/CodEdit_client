import { useUser } from "@/context/UserContext";
import { useChallenges } from "@/hooks/useChallenges";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Math", submissions: 45, deadline: 3 },
  { name: "Science", submissions: 30, deadline: 1 },
  { name: "English", submissions: 55, deadline: 2 },
];

export default function DashboardHome() {
  const {user} = useUser()
  const { data: challenges } = useChallenges();

  const activeChallenges = ()=>{
    const found = challenges?.filter(i=> new Date(i.deadline) > new Date())
    return found?.length || 0
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}
          </h1>
          <p className="text-gray-600">
            Manage your coding challenges and track student progress
          </p>
        </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Challenges" value={challenges?.length || 0} />
        <StatCard title="Active Challenges" value={activeChallenges()} />
        <StatCard title="Total Submissions" value={24} />
        <StatCard title="Performance Rate" value="+3%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Submissions per Challenge">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="submissions"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Deadlines in Days">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="deadline"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number|string }) {
  return (
    <div className="relative mb-2 sm:mb-0 bg-white rounded-2xl p-4 pt-6 border border-gray-200 overflow-visible">
      <div className="absolute -top-5 left-5 text-3xl md:text-4xl font-bold text-indigo-600">
        {value}
      </div>
      <h2 className="text-sm text-gray-500 mt-2">{title}</h2>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      <h2 className="text-base md:text-lg font-medium text-gray-700 mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}
