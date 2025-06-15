
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Clock, Zap } from "lucide-react";
import { toast } from "sonner";
import nf from "../assets/empty.png"
import logo from "../assets/code.png"

interface Submission {
  id: string;
  challengeId: string;
  studentName: string;
  studentId: string;
  privateKey: string;
  language: string;
  code: string;
  submittedAt: string;
  status: string;
  score: number;
}

const ResultLookup = () => {
  const [showLookupModal, setShowLookupModal] = useState(true);
  const [lookupData, setLookupData] = useState({ studentId: "", privateKey: "" });
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [challenge, setChallenge] = useState<any>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
const [analysisResult, setAnalysisResult] = useState<null | { title: string; content: string }>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissions = JSON.parse(localStorage.getItem("submissions") || "[]");
    const foundSubmission = submissions.find((s: Submission) => 
      s.studentId === lookupData.studentId && s.privateKey === lookupData.privateKey
    );

    if (!foundSubmission) {
      toast.error("No Results Found", {
  description: <p className="text-gray-700">Please check your Student ID and Private Key</p>,
  icon: <XCircle className="text-blue-500" />,
  duration: 3000,
});
      return;
    }

    // Get challenge details
    const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
    const challengeDetails = challenges.find((c: any) => c.id === foundSubmission.challengeId);

    setSubmission(foundSubmission);
    setChallenge(challengeDetails);
    setShowLookupModal(false);
  };

  const analyzeCode = () => {
  setAnalysisLoading(true);
  setAnalysisResult(null); // Optional: reset if re-running

  setTimeout(() => {
    const analyses = [
      {
        title: "Code Optimization Suggestions",
        content:
          "Your solution works correctly! Here are some optimization suggestions:\n\n1. Use a more efficient algorithm\n2. Optimize memory usage\n3. Improve edge case handling",
      },
      {
        title: "Code Analysis & Fixes",
        content:
          "Your code has some issues. Here's how to fix them:\n\n1. Fix logic in line 5 (should be <=)\n2. Add null checks\n3. Handle empty input arrays",
      },
    ];

    const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];
    setAnalysisResult(randomAnalysis);
    setAnalysisLoading(false);
  }, 2000); // Simulate 2 seconds of loading
};


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const mockTestResults = [
    { input: "[2, 7, 11, 15], target = 9", expected: "[0, 1]", actual: "[0, 1]", passed: true, time: "2ms" },
    { input: "[3, 2, 4], target = 6", expected: "[1, 2]", actual: "[1, 2]", passed: true, time: "1ms" },
    { input: "[3, 3], target = 6", expected: "[0, 1]", actual: "[0, 1]", passed: true, time: "1ms" },
  ];

  return (
    <>
      <Dialog open={showLookupModal} onOpenChange={setShowLookupModal}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Lookup Your Results</DialogTitle>
            <DialogDescription>
              Enter your Student ID and Private Key to view your submission results
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="Enter your student ID"
                value={lookupData.studentId}
                onChange={(e) => setLookupData({...lookupData, studentId: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="Enter your private key"
                value={lookupData.privateKey}
                onChange={(e) => setLookupData({...lookupData, privateKey: e.target.value})}
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-bg">
              <Search className="h-4 w-4 mr-2" />
              Lookup Results
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex flex-row items-center">
            <img src={logo} alt="CodEdit Logo" className="w-10 h-10 object-contain" />
            <span className="text-blue-600 font-bold text-2xl">CodEdit</span>
          </div>
            <Button onClick={() => setShowLookupModal(true)} variant="outline">
              <Search className="h-4 w-4 mr-2" />
              New Lookup
            </Button>
          </div>
        </header>

        {submission && challenge ? (
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
  {/* Left Side: Result Header + Test Cases (2/3 of width on large screens) */}
  <div className="space-y-6 lg:col-span-3">
    {/* Result Header */}
    <Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="flex items-center gap-2">
          {submission.status === "passed" ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          {challenge.title}
        </CardTitle>
        <CardDescription>
          Submitted by {submission.studentName} ({submission.studentId})
        </CardDescription>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-primary">{submission.score}%</div>
        <Badge variant={submission.status === "passed" ? "default" : "destructive"}>
          {submission.status}
        </Badge>
      </div>
    </div>
  </CardHeader>

  <CardContent>
    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
      <div>
        <span className="font-medium">Language:</span> {submission.language}
      </div>
      <div>
        <span className="font-medium">Submitted:</span> {formatDate(submission.submittedAt)}
      </div>
      <div>
        <span className="font-medium">Test Cases:</span>{" "}
        {mockTestResults.filter((t) => t.passed).length}/{mockTestResults.length} passed
      </div>
    </div>

    {/* Challenge Description */}
    {challenge.description && (
      <div className="mt-6 text-sm text-gray-700">
        <h4 className="font-semibold text-gray-800 mb-2">Challenge Description</h4>
        <p className="whitespace-pre-line">{challenge.description}</p>
      </div>
    )}
  </CardContent>
</Card>


    {/* Test Case Results */}
    <Card>
      <CardHeader>
        <CardTitle>Test Case Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTestResults.map((test, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Test Case {index + 1}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={test.passed ? "default" : "destructive"}>
                    {test.passed ? "PASS" : "FAIL"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    {test.time}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Input:</span> {test.input}
                </div>
                <div>
                  <span className="font-medium">Expected:</span> {test.expected}
                </div>
                <div>
                  <span className="font-medium">Actual:</span> {test.actual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Right Side: Submitted Code (2/3 of width) */}
<div className="space-y-6 lg:col-span-2">
  {/* Code Card */}
  <Card>
    <CardHeader>
      <CardTitle>Submitted Code</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
          <code>
            {submission.code ||
              "// Your submitted code will appear here\nfunction solution(input) {\n    // Implementation\n    return result;\n}"}
          </code>
        </pre>
      </div>
    </CardContent>
  </Card>

  {/* AI Analysis Button Card */}
  <Card>
  <CardContent className="">
    {analysisLoading ? (
      <Button disabled className="w-full">
        <Zap className="h-4 w-4 mr-2 animate-spin" />
        Analyzing...
      </Button>
    ) : analysisResult ? (
      <div>
        <h3 className="font-semibold text-lg mb-2">{analysisResult.title}</h3>
        <pre className="text-sm whitespace-pre-wrap text-gray-700">
          {analysisResult.content}
        </pre>
      </div>
    ) : (
      <Button onClick={analyzeCode} variant="outline" className="w-full">
        <Zap className="h-4 w-4 mr-2" />
        Analyze Code with AI
      </Button>
    )}
  </CardContent>
</Card>

</div>

</div>

          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="text-center p-8">
              <CardContent>
                <img
              src={nf}
              alt="empty"
              className="w-48 h-48 object-contain mx-auto"
            />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Results to Display</h3>
                <p className="text-gray-600 mb-4">
                  Use the lookup feature to find your submission results
                </p>
                <Button onClick={() => setShowLookupModal(true)} className="gradient-bg">
                  Lookup Results
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultLookup;
