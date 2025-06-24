import { useUser } from "@/context/UserContext";
import { useAllSubmissions } from "@/hooks/useAllSubmissions";
import { useChallenges } from "@/hooks/useChallenges";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { differenceInDays } from "date-fns";

export default function DashboardHome() {
  const { user } = useUser();
  const { data: challenges } = useChallenges();
  const { data: submissions } = useAllSubmissions();

  const activeChallenges = () => {
    const found = challenges?.filter(
      (i) => new Date(i.deadline) > new Date()
    );
    return found?.length || 0;
  };

  const chartData =
    challenges?.map((challenge) => {
      const submissionCount = submissions?.filter(
        (sub) => sub.challengeId === challenge.id
      ).length || 0;

      const daysLeft = Math.max(
        0,
        differenceInDays(new Date(challenge.deadline), new Date())
      );

      return {
        name: challenge.title,
        submissions: submissionCount,
        deadline: daysLeft,
      };
    }) || [];

    const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6"];

const languageData = Object.entries(
  submissions?.reduce((acc: Record<string, number>, curr) => {
    acc[curr.language] = (acc[curr.language] || 0) + 1;
    return acc;
  }, {}) || {}
).map(([language, count]) => ({ name: language, value: count }));

const averageScoreData =
  challenges?.map((challenge) => {
    const relatedSubmissions = submissions?.filter(
      (s) => s.challengeId === challenge.id
    ) || [];

    const avgScore =
  relatedSubmissions.length > 0
    ? relatedSubmissions.reduce((sum, s) => sum + (s.score ?? 0), 0) /
      relatedSubmissions.length
    : 0;

    return {
      name: challenge.title,
      avgScore: parseFloat(avgScore.toFixed(2)),
    };
  }) || [];

  const calculatePerformanceRate = () => {
  if (!submissions || submissions.length === 0) return "0%";

  let passed = 0;
  let total = 0;

  submissions.forEach((submission) => {
    const results = submission.testCaseResult || [];
    results.forEach((result) => {
      total += 1;
      if (result.passed) passed += 1;
    });
  });

  const rate = total === 0 ? 0 : (passed / total) * 100;
  return `${rate.toFixed(1)}%`;
};


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
        <StatCard title="Total Submissions" value={submissions?.length || 0} />
        <StatCard title="Performance Rate" value={calculatePerformanceRate()} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Submissions per Challenge">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
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
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="deadline"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

  <ChartCard title="Submissions by Language">
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={languageData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {languageData.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </ChartCard>

  <ChartCard title="Average Score per Challenge">
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={averageScoreData}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Bar dataKey="avgScore" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>

      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
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
    <div className="bg-white rounded-3xl p-4 border border-gray-200">
      <h2 className="text-base md:text-lg font-medium text-gray-700 mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}
