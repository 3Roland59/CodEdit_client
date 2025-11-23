import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Calendar, Copy, Info, Plus, Sparkles, Clock, FileText, Code2, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import empty from "../../assets/empty.png";
import { useChallenges } from "@/hooks/useChallenges";
import { Loader2 } from "lucide-react";

const Challenges = () => {
  const { data: challenges, isLoading } = useChallenges();

  const copyShareLink = (challengeId: string) => {
    const shareLink = `${window.location.origin}/challenge/${challengeId}`;
    navigator.clipboard.writeText(shareLink);
    toast.info("Link copied", {
      description: <p className="text-gray-700">Challenge URL has been copied to your clipboard.</p>,
      icon: <Info className="text-blue-500" />,
      duration: 3000,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
          <Loader2 className="relative animate-spin text-blue-600 h-12 w-12" />
        </div>
        <p className="text-gray-600 font-medium">Loading your challenges...</p>
      </div>
    );
  }

  if (challenges?.length == 0 || challenges) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
              My Challenges
            </h1>
          </div>
          <p className="text-gray-600 ml-14">Manage and share your coding challenges</p>
        </div>

        {/* Empty State */}
        <div className="relative group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity"></div>
          
          <Card className="relative border-2 border-gray-100 hover:border-blue-200 transition-all shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
            
            <CardContent className="text-center py-16">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-blue-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>
                <img src={empty} alt="No challenges" className="relative w-48 h-48 object-contain mx-auto drop-shadow-lg" />
              </div>
              
              <div className="space-y-4 max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-900">No challenges yet</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create your first coding challenge and start empowering students to learn and grow
                </p>
                
                <div className="pt-4">
                  <Link to="/dashboard/post-challenge">
                    <Button className="group px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105 transform">
                      <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                      Create Your First Challenge
                      <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-gray-200">
                  {[
                    { icon: Code2, label: "Custom Test Cases" },
                    { icon: Clock, label: "Time Limits" },
                    { icon: Users, label: "Track Students" }
                  ].map((feature, i) => (
                    <div key={i} className="text-center">
                      <feature.icon className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                      <p className="text-xs text-gray-600">{feature.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                My Challenges
              </h1>
            </div>
            <div className="flex items-center gap-2 ml-14">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-gray-600">
                <span className="font-bold text-indigo-600">{challenges?.length}</span> challenge{challenges?.length !== 1 ? "s" : ""} created
              </p>
            </div>
          </div>
          
          <Link to="/dashboard/post-challenge">
            <Button className="group px-6 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105 transform">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Create New Challenge
            </Button>
          </Link>
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="grid gap-6">
        {challenges?.map((challenge, index) => (
          <div
            key={challenge.id}
            className="relative group animate-fade-in-up"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <Card className="relative border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300  rounded-3xl overflow-hidden">
              {/* Gradient Top Bar */}
              
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex-shrink-0">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl sm:text-2xl mb-2 group-hover:text-indigo-600 transition-colors">
                          {challenge.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-base leading-relaxed">
                          {challenge.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 self-start">
                    <Button
                    title="Copy Link"
                      className="group/btn hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                      variant="outline"
                      size="sm"
                      onClick={() => copyShareLink(challenge.id)}
                    >
                      <Copy className="h-4 w-4 group-hover/btn:rotate-12 transition-transform" />
                    </Button>
                    <Link to={`/dashboard/my-challenges/${challenge.id}`}>
                      <Button 
                      title="View Details"
                        variant="outline" 
                        size="sm"
                        className="hover:scale-110 transition-transform shadow-md hover:shadow-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Languages */}
                <div className="flex flex-wrap gap-2">
                  {challenge.languages.split(",").map((language) => (
                    <Badge 
                      key={language} 
                      variant="secondary"
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-indigo-700 font-medium hover:scale-105 transition-transform"
                    >
                      {language.trim()}
                    </Badge>
                  ))}
                </div>

                {/* Stats and Actions */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Calendar className="h-4 w-4 text-indigo-600" />
                      <span className="text-gray-700 font-medium">{formatDate(challenge.createdAt)}</span>
                    </div>
                    
                    {challenge.time !== 0 && (
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 font-medium">{challenge.time} min</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      <span className="text-gray-700 font-medium">{challenge.testCases.length} test cases</span>
                    </div>
                  </div>

                  <div>
                    <Link to={`/dashboard/submissions/${challenge.id}`}>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group/view w-full sm:w-auto px-4 py-2 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md"
                      >
                        <Users className="h-4 w-4 mr-2 group-hover/view:scale-110 transition-transform" />
                        <span className="font-semibold">View Submissions</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;

