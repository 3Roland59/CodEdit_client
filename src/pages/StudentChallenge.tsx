
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Code, Clock, Lightbulb, Send, CheckCircle, XCircle, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Lottie from "lottie-react";
import animationData from "../assets/success.json"
import nf from "../assets/empty.png"
import logo from "../assets/code.png"
import Editor from "@monaco-editor/react";
import { useChallenges } from "@/hooks/useChallenges";
import { BASE_URL } from "@/config/config";
import axios from "axios";


interface TestCase {
  id: string;
  inputDataType: string;
  inputValue: string;
  outputDataType: string;
  outputValue: string;
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

const StudentChallenge = () => {
  const { id } = useParams();
  
  const [challenge, setChallenge] = useState<Challenge | null>();
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [studentData, setStudentData] = useState({
    name: "",
    studentId: "",
    privateKey: ""
  });
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [challengeKey, setChallengeKey] = useState('')
  const [loading, setLoading] = useState(false)
const {data: challenges, isLoading} = useChallenges()

  useEffect(() => {
    if (id) {
      const foundChallenge = challenges?.find((c: Challenge) => c.id === id);
      setChallenge(foundChallenge);
    }
  }, [id, isLoading]);

  useEffect(() => {
    if (Number(challenge?.time) > 0 && timeLeft === null && !showAuthModal) {
      const minutes = challenge?.time || 0;
      setTimeLeft(minutes * 60);
    }
  }, [challenge, showAuthModal, timeLeft]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev! - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentData.name || !studentData.studentId || !studentData.privateKey) {
      toast.error("Error", {
  description: <p className="text-gray-700">Please fill in all required fields</p>,
  icon: <XCircle className="text-red-500" />,
  duration: 3000,
});
      return;
    }
     if (challenge?.challengeKey && challenge.challengeKey != challengeKey) {
      toast.error("Error", {
  description: <p className="text-gray-700">Incorrect challenge key</p>,
  icon: <XCircle className="text-red-500" />,
  duration: 3000,
});
      return;
    }
    setShowAuthModal(false);
  };

  const handleSubmit = async () => {
  if (!code.trim()) {
    toast.error("Error", {
      description: <p className="text-gray-700">Please write some code before submitting</p>,
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
    return;
  }
  setLoading(true)

  const submission = {
    challengeId: id,
    studentName: studentData.name,
    studentId: studentData.studentId,
    submissionKey: studentData.privateKey,
    language: selectedLanguage,
    code: code,
  };

  try {
    const res = await axios.post(`${BASE_URL}/api/v1/submissions`, submission);
    
    // Optional: check response
    if (res.status === 201 || res.status === 200) {
      toast.success("Code Submitted!", {
        description: <p className="text-gray-700">Your solution has been submitted successfully</p>,
        icon: <CheckCircle className="text-green-500" />,
        duration: 3000,
      });
      setIsSubmitted(true);
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("Submission failed", error);
    toast.error("Submission Failed", {
      description: <p className="text-gray-700">Something went wrong. Please try again.</p>,
      icon: <XCircle className="text-red-500" />,
      duration: 3000,
    });
  }finally{
    setLoading(false)
  }
};


  const getHint = () => {
    // Mock AI hint generation
    const hints = [
      "Try breaking down the problem into smaller steps",
      "Consider using a loop to iterate through the data",
      "Think about edge cases - what happens with empty inputs?",
      "Look at the expected output format carefully",
      "Consider the time complexity of your solution"
    ];
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
  toast.info("Hint", {
  description: <p className="text-gray-700">{randomHint}</p>,
  icon: <Info className="text-blue-500" />,
  duration: 3000,
});
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-gray-600 h-8 w-8" />
        </div>
      );
    }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <img
              src={nf}
              alt="empty"
              className="w-48 h-48 object-contain mx-auto"
            />
            <h2 className="text-xl font-semibold mb-2">Challenge Not Found</h2>
            <p className="text-gray-600">
              The challenge you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Lottie
  animationData={animationData} 
  loop={true}
  className="w-64 h-64 mx-auto"
/>
            <CardTitle>Submission Successful!</CardTitle>
            <CardDescription>
              Your code has been submitted and is being evaluated
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Submission Details:</p>
              <p className="font-medium">{studentData.name}</p>
              <p className="text-sm text-gray-500">ID: {studentData.studentId}</p>
              <p className="text-sm text-gray-500">Language: {selectedLanguage}</p>
            </div>
            <p className="text-sm text-gray-600">
              Results will be available shortly. Check with your teacher for the results link.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent showCloseButton={false} onInteractOutside={(e) => e.preventDefault()}
  onEscapeKeyDown={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Student Authentication</DialogTitle>
            <DialogDescription>
              Please provide your details to access the challenge
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={studentData.name}
                onChange={(e) => setStudentData({...studentData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="Enter your student ID"
                value={studentData.studentId}
                onChange={(e) => setStudentData({...studentData, studentId: e.target.value})}
                required
              />
            </div>
            {challenge?.challengeKey && <div className="space-y-2">
              <Label htmlFor="challengeKey">Challenge Key</Label>
              <Input
                id="challengeKey"
                type="text"
                placeholder="Enter the challenge key provided by your teacher"
                value={challengeKey}
                onChange={(e) => setChallengeKey(e.target.value)}
                required
              />
            </div>}
            <div className="space-y-2">
              <Label htmlFor="privateKey">Private Key</Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="Enter your private key to view result later"
                value={studentData.privateKey}
                onChange={(e) => setStudentData({...studentData, privateKey: e.target.value})}
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-bg">
              Access Challenge
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b h-[70px]">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex flex-row items-center">
            <img src={logo} alt="CodEdit Logo" className="w-10 h-10 object-contain" />
            <span className="text-blue-600 font-bold text-2xl">CodEdit</span>
          </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
    <SelectTrigger className="w-48 rounded-3xl">
      <SelectValue placeholder="Choose language" />
    </SelectTrigger>
    <SelectContent>
      {challenge.languages.split(",").map((lang) => (
        <SelectItem key={lang} value={lang}>
          {lang}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
          </div>
        </header>

        <div className="mx-auto">
          <div className="grid lg:grid-cols-2">
            {/* Challenge Details */}
            <Card className="m-4">
  <CardHeader>
    <div className="flex items-center gap-4">
              {timeLeft !== null && (
                <div className="flex items-center gap-2 text-red-600">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeLeft)}</span>
                </div>
              )}
              <div className="text-sm text-gray-600">
                {studentData.name} ({studentData.studentId})
              </div>
            </div>
    <CardTitle className="flex items-center gap-2">
      <Code className="h-5 w-5" />
      {challenge.title}
    </CardTitle>
    {challenge.time > 0 && (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="h-4 w-4" />
        Time Limit: {challenge.time} minutes
      </div>
    )}
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      {/* Problem Description */}
      <div>
        <h3 className="font-medium mb-2">Problem Description</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="whitespace-pre-wrap">{challenge.description}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Available Languages</h3>
        <div className="flex flex-wrap gap-2">
          {challenge.languages.split(",").map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-3xl text-xs"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {challenge.testCases && challenge.testCases.length > 0 && (
  <div>
    <h3 className="font-medium mb-2">Test Cases</h3>
    <div className="space-y-2">
      {challenge.testCases.map((tc, index) => (
        <div
          key={index}
          className="bg-gray-100 p-3 rounded border border-gray-200 text-sm"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-700">
                Input <span className="text-gray-500 text-sm">({tc.inputDataType.replace(";", ", ")})</span>
              </p>
              <code className="bg-white px-2 py-1 rounded block mt-1">
                {tc.inputValue.replace(";", ", ")}
              </code>
            </div>
            <div>
              <p className="font-medium text-gray-700">
                Expected Output <span className="text-gray-500 text-sm">({tc.outputDataType.replace(";", ", ")})</span>
              </p>
              <code className="bg-white px-2 py-1 rounded block mt-1">
                {tc.outputValue.replace(";", ", ")}
              </code>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}



      <Button onClick={getHint} variant="outline" className="w-full">
        <Lightbulb className="h-4 w-4 mr-2" />
        Get Hint
      </Button>
    </div>
  </CardContent>
</Card>


            {/* Code Editor */}
            <div className="relative h-[calc(100vh-70px)]">
  <div className="absolute inset-0 z-0">
    <Editor
      defaultLanguage={selectedLanguage || "javascript"}
      language={selectedLanguage || "javascript"}
      value={code}
      onChange={(value) => setCode(value || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true
      }}
    />
  </div>
</div>


{/* Floating Submit Button */}
<div className="fixed bottom-6 right-6 z-50">
  <Button
    onClick={handleSubmit}
    className="gradient-bg shadow-lg"
    disabled={!selectedLanguage || !code.trim() || loading}
  >
    {loading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin mr-2" />
      Submitting...
    </>
  ) : (
    <>
    <Send className="h-4 w-4" />
    Submit Solution
    </>
  )}
  </Button>
</div>

          </div>
        </div>
      </div>
    </>
  );
};

export default StudentChallenge;
