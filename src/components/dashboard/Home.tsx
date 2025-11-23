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
import { Code2, Trophy, Users, TrendingUp, Sparkles, Calendar, Target, Award } from "lucide-react";

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

  const stats = [
    {
      title: "Total Challenges",
      value: challenges?.length || 0,
      icon: Code2,
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Challenges",
      value: activeChallenges(),
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Submissions",
      value: submissions?.length || 0,
      icon: Users,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Performance Rate",
      value: calculatePerformanceRate(),
      icon: TrendingUp,
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-50 to-orange-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
            Welcome back, {user?.username}!
          </h1>
        </div>
        <p className="text-gray-600 ml-14">Manage your coding challenges and track student progress</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Submissions per Challenge" 
          icon={Users}
          color="from-blue-500 to-indigo-500"
          delay={0.4}
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar
                dataKey="submissions"
                fill="url(#colorSubmissions)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Deadlines in Days" 
          icon={Calendar}
          color="from-amber-500 to-orange-500"
          delay={0.5}
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar
                dataKey="deadline"
                fill="url(#colorDeadline)"
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="colorDeadline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Submissions by Language" 
          icon={Code2}
          color="from-purple-500 to-pink-500"
          delay={0.6}
        >
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={languageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {languageData.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend 
                wrapperStyle={{ fontSize: '14px' }}
                iconType="circle"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Average Score per Challenge" 
          icon={Award}
          color="from-green-500 to-emerald-500"
          delay={0.7}
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={averageScoreData}>
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                stroke="#6b7280"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar 
                dataKey="avgScore" 
                fill="url(#colorScore)" 
                radius={[8, 8, 0, 0]} 
              />
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.7}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quick Stats Summary */}
      <div className="relative group animate-fade-in-up" style={{animationDelay: '0.8s'}}>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-10 blur-xl"></div>
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border-2 border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500">
              <Target className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Quick Insights</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-white rounded-xl border border-blue-200">
              <p className="text-gray-600 mb-1">Most Active Challenge</p>
              <p className="font-bold text-gray-900 truncate">
                {chartData.length > 0 
                  ? chartData.reduce((max, curr) => curr.submissions > max.submissions ? curr : max).name 
                  : "N/A"}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-blue-200">
              <p className="text-gray-600 mb-1">Average Submissions</p>
              <p className="font-bold text-gray-900">
                {chartData.length > 0 
                  ? (chartData.reduce((sum, curr) => sum + curr.submissions, 0) / chartData.length).toFixed(1)
                  : "0"}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-blue-200">
              <p className="text-gray-600 mb-1">Closest Deadline</p>
              <p className="font-bold text-gray-900">
                {chartData.length > 0 
                  ? `${Math.min(...chartData.map(c => c.deadline))} days`
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  iconColor: string;
  delay: number;
}

function StatCard({ title, value, icon: Icon, color, bgColor,  delay }: StatCardProps) {
  return (
    <div 
      className="relative group animate-fade-in-up"
      style={{animationDelay: `${delay}s`}}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
      
      <div className={`relative bg-gradient-to-br ${bgColor} rounded-3xl p-6 border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 transform overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-bl-full"></div>
        
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <p className={`text-4xl font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
              {value}
            </p>
          </div>
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
  color: string;
  delay: number;
}

function ChartCard({ title, children, icon: Icon, color, delay }: ChartCardProps) {
  return (
    <div 
      className="relative group animate-fade-in-up"
      style={{animationDelay: `${delay}s`}}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}></div>
      
      <div className="relative bg-white rounded-3xl p-6 border-2 border-gray-100 hover:border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="h-1.5 w-full absolute top-0 left-0 right-0 bg-gradient-to-r ${color}"></div>
        
        <div className="flex items-center gap-3 mb-6 mt-2">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${color} bg-opacity-10`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
