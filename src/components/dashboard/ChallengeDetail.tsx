import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Users,
  Calendar,
  Clock,
  Info,
  Loader2,
  FileText,
  Code2,
  Eye,
  EyeOff,
  Key,
  Trash2,
  AlertCircle,
  Share2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import nf from "../../assets/notfound.png";
import { useChallenges } from "@/hooks/useChallenges";

interface TestCase {
  id: string;
  inputDataType: string;
  inputValue: string;
  outputDataType: string;
  outputValue: string;
  hidden: boolean;
}

interface Challenge {
  id: string;
  userId: string;
  title: string;
  description: string;
  time: number;
  languages: string;
  challengeKey: string;
  createdAt: string;
  deadline: string;
  testCases: TestCase[];
}

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: challenges, isLoading } = useChallenges();

  useEffect(() => {
    if (id) {
      const foundChallenge = challenges?.find((c: Challenge) => c.id === id);
      setChallenge(foundChallenge);
    }
  }, [id, challenges]);

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/challenge/${id}`;
    navigator.clipboard.writeText(shareLink);
    toast.info("Link copied", {
      description: (
        <p className="text-gray-700">
          Challenge URL has been copied to your clipboard.
        </p>
      ),
      icon: <Info className="text-blue-500" />,
      duration: 3000,
    });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Key copied", {
      description: <p className="text-gray-700">Challenge key copied to clipboard.</p>,
      icon: <CheckCircle className="text-green-500" />,
      duration: 3000,
    });
  };

  const handleDeactivate = () => {
    toast.info("Challenge deactivated", {
      description: <p className="text-gray-700">This challenge has been deactivated.</p>,
      icon: <Info className="text-blue-500" />,
      duration: 3000,
    });
  };

  const handleDelete = () => {
    toast.success("Challenge deleted", {
      description: <p className="text-gray-700">Challenge has been permanently deleted.</p>,
      icon: <CheckCircle className="text-green-500" />,
      duration: 3000,
    });
    setShowDeleteDialog(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 opacity-20 blur-2xl rounded-full animate-pulse"></div>
          <Loader2 className="relative animate-spin text-blue-600 h-12 w-12" />
        </div>
        <p className="text-gray-600 font-medium">Loading challenge details...</p>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-20 blur-xl"></div>
          <Card className="relative border-2 border-red-100 rounded-3xl shadow-lg overflow-hidden">
            <CardContent className="text-center py-12">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-red-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>
                <img
                  src={nf}
                  alt="Not found"
                  className="relative w-48 h-48 object-contain mx-auto drop-shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Challenge not found
              </h3>
              <p className="text-gray-600 mb-6">
                The challenge you're looking for doesn't exist or has been deleted.
              </p>
              <Link to="/dashboard/my-challenges">
                <Button className="px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105 transform">
                  Back to Challenges
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const visibleTestCases = challenge.testCases.filter(tc => !tc.hidden).length;
  const hiddenTestCases = challenge.testCases.filter(tc => tc.hidden).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
                {challenge.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 ml-14">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span>Created {formatDate(challenge.createdAt)}</span>
              </div>
              {challenge.deadline && (
                <Badge
                  variant={isDeadlinePassed(challenge.deadline) ? "destructive" : "default"}
                  className="flex items-center gap-1"
                >
                  <Clock className="h-3 w-3" />
                  Deadline: {formatDate(challenge.deadline)}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <Button
              onClick={copyShareLink}
              className="group flex-1 lg:flex-none px-5 py-5 rounded-xl border-2 border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50 text-gray-900 font-semibold transition-all shadow-md hover:shadow-lg"
              variant="outline"
            >
              <Share2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Share Link
            </Button>
            <Link to={`/dashboard/submissions/${challenge.id}`} className="flex-1 lg:flex-none">
              <Button className="w-full px-5 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105 transform">
                <Users className="h-4 w-4 mr-2" />
                Submissions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Challenge Info */}
        <div className="relative group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          <Card className="relative border-2 border-gray-100 hover:border-indigo-200 transition-all shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Challenge Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                  Description
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-5 rounded-2xl border border-gray-200">
                  <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{challenge.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    Allowed Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {challenge.languages.split(",").map((language) => (
                      <Badge
                        key={language}
                        variant="secondary"
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-indigo-700 font-medium hover:scale-105 transition-transform"
                      >
                        {language.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    Challenge Settings
                  </h3>
                  <div className="space-y-2.5">
                    {challenge.time !== 0 && (
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700 font-medium">Time limit: {challenge.time} minutes</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm text-gray-700 font-medium">{challenge.testCases.length} test cases ({visibleTestCases} visible, {hiddenTestCases} hidden)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge Key Section */}
              {challenge.challengeKey && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                    Challenge Key
                  </h3>
                  <div className="flex gap-2 items-center p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200">
                    <Key className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <code className="flex-1 font-mono text-sm font-bold text-amber-900 break-all">
                      {challenge.challengeKey}
                    </code>
                    <Button
                      onClick={() => copyKey(challenge.challengeKey)}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-amber-100 text-amber-700"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 ml-1">Share this key with students to grant access to the challenge</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Test Cases */}
        <div className="relative group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          <Card className="relative border-2 border-gray-100 hover:border-indigo-200 transition-all shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Test Cases</CardTitle>
                  <CardDescription className="mt-1">
                    These test cases validate student solutions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenge.testCases.map((testCase, index) => (
                  <div key={testCase.id} className="relative group/test">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover/test:opacity-10 blur transition-opacity"></div>
                    <Card className="relative p-5 border-2 border-gray-100 hover:border-indigo-200 transition-all hover:shadow-md rounded-2xl">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                            {index + 1}
                          </span>
                          Test Case {index + 1}
                        </h4>
                        <Badge
                          variant={testCase.hidden ? "secondary" : "default"}
                          className={`flex items-center gap-1.5 ${
                            testCase.hidden 
                              ? "bg-gray-100 text-gray-700 border border-gray-300" 
                              : "bg-green-100 text-green-700 border border-green-300"
                          }`}
                        >
                          {testCase.hidden ? (
                            <>
                              <EyeOff className="h-3 w-3" />
                              Hidden
                            </>
                          ) : (
                            <>
                              <Eye className="h-3 w-3" />
                              Visible
                            </>
                          )}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                            Input
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-200">
                            <span className="text-xs font-semibold text-blue-600 block mb-1">
                              Type: {testCase.inputDataType.replace(";", ", ")}
                            </span>
                            <code className="text-sm text-gray-900 font-mono">
                              {testCase.inputValue.replace(";", ", ")}
                            </code>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                            Expected Output
                          </div>
                          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-xl border border-indigo-200">
                            <span className="text-xs font-semibold text-indigo-600 block mb-1">
                              Type: {testCase.outputDataType.replace(";", ", ")}
                            </span>
                            <code className="text-sm text-gray-900 font-mono">
                              {testCase.outputValue.replace(";", ", ")}
                            </code>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Share Section */}
        <div className="relative group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          <Card className="relative border-2 border-gray-100 hover:border-indigo-200 transition-all shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                  <Share2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Share Challenge</CardTitle>
                  <CardDescription className="mt-1">
                    Share this link {challenge.challengeKey && "and key"} with your students
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border-2 border-gray-200 font-mono text-sm break-all text-gray-700">
                  {window.location.origin}/challenge/{challenge.id}
                </div>
                <Button
                  onClick={copyShareLink}
                  variant="outline"
                  className="group/copy px-6 border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
                >
                  <Copy className="h-4 w-4 group-hover/copy:scale-110 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Section */}
        <div className="relative group animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          <Card className="relative border-2 border-gray-100 hover:border-red-200 transition-all shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Danger Zone</CardTitle>
                  <CardDescription className="mt-1">
                    Manage challenge status and deletion
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDeactivate}
                  variant="outline"
                  className="group/deact flex-1 px-6 py-5 border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-orange-700 font-semibold rounded-xl transition-all hover:shadow-md"
                >
                  <XCircle className="h-4 w-4 mr-2 group-hover/deact:scale-110 transition-transform" />
                  Deactivate Challenge
                </Button>
                <Button
                  onClick={() => setShowDeleteDialog(true)}
                  variant="outline"
                  className="group/del flex-1 px-6 py-5 border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-700 font-semibold rounded-xl transition-all hover:shadow-md"
                >
                  <Trash2 className="h-4 w-4 mr-2 group-hover/del:scale-110 transition-transform" />
                  Delete Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border-2 border-red-200">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Challenge?</h3>
              <p className="text-gray-600">
                This action cannot be undone. All submissions and data will be permanently deleted.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowDeleteDialog(false)}
                variant="outline"
                className="flex-1 py-5 rounded-xl border-2 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="flex-1 py-5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg shadow-red-500/50"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;
