
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Clock, Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";
import nf from "../assets/empty.png"
import logo from "../assets/code.png"
import { useSearchParams } from "react-router";
import { useChallenges } from "@/hooks/useChallenges";
import axios from "axios";
import { BASE_URL } from "@/config/config";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReactMarkdown from "react-markdown";

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

const ResultLookup = () => {
  const [searchParams] = useSearchParams();
const urlChallengeId = searchParams.get("challenge");
  const [showLookupModal, setShowLookupModal] = useState(true);
  const [lookupData, setLookupData] = useState({ studentId: "", privateKey: "" });
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [challenge, setChallenge] = useState<any>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
const [analysisResult, setAnalysisResult] = useState<null | { title: string; content: string }>(null);
  const {data: challenges, isLoading} = useChallenges()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
      if (urlChallengeId) {
        const foundChallenge = challenges?.find((c) => c.id === urlChallengeId);
        setChallenge(foundChallenge);
      }
    }, [isLoading]);

  const handleLookup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!lookupData.studentId || !lookupData.privateKey) {
    toast.error("Missing Fields", {
      description: <p className="text-gray-700">Please fill in both Student ID and Private Key</p>,
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
    return;
  }

  setAnalysisResult(null);
  setLoading(true);

  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/submissions/student/${urlChallengeId}/${lookupData.studentId}/${lookupData.privateKey}`
    );

    const data = res.data;

    if (!data || Object.keys(data).length === 0) {
      toast.error("No Results Found", {
        description: <p className="text-gray-700">Please check your Student ID and Private Key</p>,
        icon: <XCircle className="text-red-500" />,
        duration: 3000,
      });
      return;
    }

    setSubmission(data);
    const foundChallenge = challenges?.find((c) => c.id === urlChallengeId);
        setChallenge(foundChallenge);

    toast.success("Result Found", {
      description: <p className="text-gray-700">Your submission result was loaded successfully</p>,
      icon: <CheckCircle className="text-green-500" />,
      duration: 2500,
    });

    setShowLookupModal(false);
  } catch (err: any) {
    console.error(err);
    toast.error("Lookup Failed", {
      description: <p className="text-gray-700">{err?.response?.data?.error|| err?.response?.status==403 && "Incorrect prrivate key" ||"Something went wrong. Please try again later."}</p>,
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
};

const exportResultToPDF = () => {
  if (!submission || !challenge) return;

  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text(`Submission Result for ${submission.studentName} (${submission.studentId})`, 14, 20);

  // Basic Info
  doc.setFontSize(12);
  doc.text(`Challenge: ${challenge.title}`, 14, 30);
  doc.text(`Language: ${submission.language}`, 14, 36);
  doc.text(`Score: ${submission.score}%`, 14, 42);
  doc.text(`Submitted: ${formatDate(submission.createdAt)}`, 14, 48);
  doc.text(`Status: ${submission.success ? "Passed" : "Failed"}`, 14, 54);
  doc.text(
    `Test Cases Passed: ${submission.testCaseResult.filter((t) => t.passed).length}/${submission.testCaseResult.length}`,
    14,
    60
  );

  // Table of test case results
  autoTable(doc, {
    startY: 70,
    head: [["#", "Input", "Expected", "Output", "Status", "Time"]],
    body: submission.testCaseResult.map((t, index) => [
      index + 1,
      t.input,
      t.expected,
      t.output,
      t.passed ? "Passed" : "Failed",
      t.executionTime,
    ]),
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [79, 70, 229] },
  });

  let y = (doc as any)?.lastAutoTable?.finalY || 80;

  // Code block
  const codeLines = submission.code?.split("\n") || ["// No code submitted"];
  doc.setFontSize(14).setFont("helvetica", "bold");
  doc.text("Submitted Code:", 14, y + 10);
  y += 16;

  doc.setFont("Courier", "normal");
  doc.setFontSize(10);
  const maxWidth = 180;
  const lineHeight = 5;

  for (const line of codeLines) {
    const wrapped = doc.splitTextToSize(line, maxWidth);
    for (const l of wrapped) {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(l, 14, y);
      y += lineHeight;
    }
  }

  // AI Analysis
  if (analysisResult) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14).setFont("helvetica", "bold");
    doc.text("AI Analysis:", 14, y + 10);
    y += 16;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const analysisLines = doc.splitTextToSize(`${analysisResult.title}\n\n${analysisResult.content}`, maxWidth);

    for (const line of analysisLines) {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 14, y);
      y += lineHeight;
    }
  }

  // Save the PDF
  doc.save(`result-${submission.studentId}.pdf`);
};



const analyzeCode = async () => {
  if (!submission || !challenge) return;

  setAnalysisLoading(true);
  setAnalysisResult(null);

  const prompt = `Analyze the following code submission.

Challenge Description:
${challenge.description}

Submitted Code:
${submission.code}

Test Cases:
${submission.testCaseResult
    .map(
      (t, i) => `Test Case ${i + 1}:
Input: ${t.input}
Expected: ${t.expected}
Output: ${t.output}
Passed: ${t.passed}
Execution Time: ${t.executionTime}`
    )
    .join("\n\n")}

Provide detailed feedback on:
1. Correctness
2. Optimization opportunities
3. Code quality
4. Edge cases handled or missed
`;

  const options = {
    method: "POST",
    url: "https://open-ai32.p.rapidapi.com/conversationgpt35",
    headers: {
      "x-rapidapi-key": "ca1b249b7bmsh36fd72e9ca0bd25p1ba44djsnb30f488bd941",
      "x-rapidapi-host": "open-ai32.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      web_access: false,
    },
  };

  try {
    const response = await axios.request(options);
    const resultText =
      response.data?.result || response.data?.choices?.[0]?.message?.content;

    setAnalysisResult({
      title: "AI Code Feedback",
      content: resultText || "No response from AI model.",
    });
  } catch (error) {
    console.error("AI analysis error:", error);
    toast.error("AI Analysis Failed", {
      description: "Something went wrong analyzing the code.",
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
  } finally {
    setAnalysisLoading(false);
  }
};

  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };


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
              {loading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin mr-2" />
      Lookingup Results...
    </>
  ) : (
    <>
    <Search className="h-4 w-4 mr-2" />
              Lookup Results
              </>
  )}
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
            <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
  {/* Left Side: Result Header + Test Cases (2/3 of width on large screens) */}
  <div className="space-y-6 lg:col-span-2">
    {/* Result Header */}
    <Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="mb-3">
          {submission.studentName} ({submission.studentId})
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          {submission.success ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
          {challenge.title}
        </CardDescription>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-blue-500">{submission.score}%</div>
        <Badge variant={submission.success ? "default" : "destructive"}>
          {submission.success? "passed" : "failed"}
        </Badge>
      </div>
    </div>
  </CardHeader>

  <CardContent>
    {/* Challenge Description */}
    {challenge.description && (
      <div className="mb-3 text-sm text-gray-700">
        <h4 className="font-semibold text-gray-800 mb-1">Challenge Description</h4>
        <p className="whitespace-pre-line">{challenge.description}</p>
      </div>
    )}
    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
      <div>
        <span className="font-medium">Language:</span> {submission.language}
      </div>
      <div>
        <span className="font-medium">Submitted:</span> {formatDate(submission.createdAt)}
      </div>
      <div>
        <span className="font-medium">Test Cases:</span>{" "}
        {submission.testCaseResult.filter((t) => t.passed).length}/{submission.testCaseResult.length} passed
      </div>
    </div>

<Button onClick={exportResultToPDF} className="w-full mt-3" variant="outline">
  Export Result as PDF
</Button>

    
  </CardContent>
</Card>


    {/* Test Case Results */}
    <Card>
      <CardHeader>
        <CardTitle>Test Case Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {submission.testCaseResult.map((test, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Test Case {index + 1}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={test.passed ? "default" : "destructive"}>
                    {test.passed ? "passed" : "failed"}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    {test.executionTime}
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
                  <span className="font-medium">Actual:</span> {test.output}
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
              ""}
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
        <div className="prose prose-sm max-w-none text-gray-700">
  <ReactMarkdown>{analysisResult.content}</ReactMarkdown>
</div>

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
