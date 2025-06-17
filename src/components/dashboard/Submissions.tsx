
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Copy, BarChart3, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import nf from "../../assets/empty.png"
import { useChallenges } from "@/hooks/useChallenges";
import { useSubmissions } from "@/hooks/useSubmissions";

interface TestCaseResult {
  id: string;
  input: string;
  expected: string;
  output: string;
  passed: boolean;
  executionTime: string;
  errorMessage: string;
}

interface Submission {
  id: string;
  studentId: string;
  submissionKey: string;
  studentName: string;
  challengeId: string;
  code: string;
  language: string;
  success: boolean;
  score: number;
  message: string;
  testCaseResult: TestCaseResult[];
  createdAt: string;
}

const Submissions = () => {
  const { challengeId } = useParams();
  
  const [challenge, setChallenge] = useState<any>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showModal, setShowModal] = useState(false);
    const {data: challenges, isLoading} = useChallenges()
    const {data: subs, isLoading: isLoadingS} = useSubmissions(challengeId || '')

  useEffect(() => {
    if (challengeId) {
      const foundChallenge = challenges?.find((c) => c.id === challengeId);
      setChallenge(foundChallenge);
    }
  }, [challengeId]);

  useEffect(() =>{
    setSubmissions(subs || [])
  }, [isLoadingS])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const viewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const copyResultLink = (submission: Submission) => {
    // In a real app, this would generate a secure link
    const resultLink = `${window.location.origin}/results?studentId=${submission.studentId}&key=${submission.id}`;
    navigator.clipboard.writeText(resultLink);
    toast.info("Result Link Copied", {
  description: <p className="text-gray-700">Share this link with the student to view their results</p>,
  icon: <Info className="text-blue-500" />,
  duration: 3000,
});
  };


  const getStats = () => {
    const total = submissions?.length;
    const passed = submissions.filter(s => s.success === true).length;
    const avgScore = total > 0 ? Math.round(submissions.reduce((sum, s) => sum + s.score, 0) / total) : 0;
    const languages = [...new Set(submissions.map(s => s.language))];
    
    return { total, passed, avgScore, languages };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-600 h-8 w-8" />
      </div>
    );
  }

  if (!challenge) {
    return (
        <Card className="text-center py-12">
          <CardContent>
            <img
                          src={nf}
                          alt="empty"
                          className="w-48 h-48 object-contain mx-auto"
                        />
            <h3 className="text-lg font-medium text-gray-900">Challenge not found</h3>
          </CardContent>
        </Card>
    );
  }

  return (
      <div className="max-w-6xl mx-auto p-2 sm:p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submissions for "{challenge.title}"
          </h1>
          <p className="text-gray-600">
            Track and analyze student submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Passed</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Languages Used</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.languages.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Submissions</CardTitle>
            <CardDescription>
              Click on a submission to view detailed results
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingS ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No submissions yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Students will appear here once they submit their solutions
                </p>
              </div>
            ) :
            submissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No submissions yet</p>
                <p className="text-sm text-gray-400 mt-2">
                  Students will appear here once they submit their solutions
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.studentName}</TableCell>
                      <TableCell>{submission.studentId}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.language}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={submission.success ? "bg-blue-600" : ""} variant={submission.success ? "default" : "destructive"}>
                          {submission.success? "passed" : "failed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{submission.score}%</TableCell>
                      <TableCell>{formatDate(submission.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewSubmission(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyResultLink(submission)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Submission Details Modal */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submission Details</DialogTitle>
              <DialogDescription>
                {selectedSubmission?.studentName} ({selectedSubmission?.studentId})
              </DialogDescription>
            </DialogHeader>
            
            {selectedSubmission && (
              <div className="space-y-6">
                {/* Submission Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Language</div>
                    <div>{selectedSubmission.language}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Status</div>
                    <Badge className={selectedSubmission.success ? "bg-blue-600" : ""}  variant={selectedSubmission.success ? "default" : "destructive"}>
                      {selectedSubmission.success? "passed" : "failed"}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Score</div>
                    <div className="text-xl font-bold text-primary">{selectedSubmission.score}%</div>
                  </div>
                </div>

                {/* Code */}
                <div>
                  <h3 className="font-medium mb-2">Submitted Code</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
                      <code>{selectedSubmission.code || "// No code submitted"}</code>
                    </pre>
                  </div>
                </div>

                {/* Test Results */}
                <div>
                  <h3 className="font-medium mb-4">Test Case Results</h3>
                  <div className="space-y-3">
                    {selectedSubmission.testCaseResult.map((test, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Test Case {index + 1}</span>
                          <Badge className={test.passed ? "bg-blue-600" : ""}  variant={test.passed ? "default" : "destructive"}>
                            {test.passed ? "Passed" : "Failed"}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div><span className="font-medium">Input:</span> {test.input}</div>
                          <div><span className="font-medium">Expected:</span> {test.expected}</div>
                          <div><span className="font-medium">Actual:</span> {test.output}</div>
                          <div className="text-gray-600">Execution time: {test.executionTime}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default Submissions;
