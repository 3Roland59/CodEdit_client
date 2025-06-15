
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Copy, XCircle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import Lottie from "lottie-react";
import animationData from "../../assets/success.json";

interface TestCase {
  id: string;
  inputType: string;
  inputValue: string;
  outputType: string;
  outputValue: string;
}

const PostChallenge = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    languages: [] as string[],
    timeLimit: "",
    hasTimeLimit: false,
    hasDeadline: false,
  deadline: "",
  });

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "1", inputType: "", inputValue: "", outputType: "", outputValue: "" }
  ]);

  const [showShareLink, setShowShareLink] = useState("");

  const languages = ["python", "javascript", "typescript"];
  const dataTypes = ["string", "integer", "boolean", "array",];

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      inputType: "string",
      inputValue: "",
      outputType: "string",
      outputValue: ""
    };
    setTestCases([...testCases, newTestCase]);
  };

  const removeTestCase = (id: string) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
    }
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const isValidType = (type: string) => dataTypes.includes(type.trim());

const isValidTestCase = (tc: TestCase) => {
  const inputTypes = tc.inputType.split(",").map(t => t.trim());
  const inputValues = tc.inputValue.split(",").map(v => v.trim());
  const outputTypes = tc.outputType.split(",").map(t => t.trim());
  const outputValues = tc.outputValue.split(",").map(v => v.trim());

  const allInputTypesValid = inputTypes.every(isValidType);
  const allOutputTypesValid = outputTypes.every(isValidType);

  const inputCountMatches = inputTypes.length === inputValues.length;
  const outputCountMatches = outputTypes.length === outputValues.length;

  return (
    tc.inputValue &&
    tc.outputValue &&
    allInputTypesValid &&
    allOutputTypesValid &&
    inputCountMatches &&
    outputCountMatches
  );
};



  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, languages: [...formData.languages, language] });
    } else {
      setFormData({ 
        ...formData, 
        languages: formData.languages.filter(l => l !== language) 
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.languages.length === 0) {
      toast.error("Missing language selection", {
  description: <p className="text-gray-700">Please select at least one programming language.</p>,
  icon: <XCircle className="text-red-500" />,
  duration: 4000,
});
      return;
    }

    if (testCases.some(tc => !isValidTestCase(tc))) {
  toast.error("Invalid Test Case", {
    description: (
      <p className="text-gray-700">
        Make sure each test case has valid, comma-separated types and values.<br />
        Valid types: <code>{dataTypes.join(", ")}</code>
      </p>
    ),
    icon: <XCircle className="text-red-500" />,
    duration: 4000,
  });
  return;
}


    if (formData.hasDeadline && new Date(formData.deadline) <= new Date()) {
  toast.error("Invalid deadline", {
  description: <p className="text-gray-700">Deadline must be a future date and time.</p>,
  icon: <XCircle className="text-red-500" />,
  duration: 4000,
});

  return;
}

    const challengeId = Date.now().toString();
    const challenge = {
      id: challengeId,
      ...formData,
      testCases,
      createdAt: new Date().toISOString(),
      teacherId: "teacher-1"
    };

    const existingChallenges = JSON.parse(localStorage.getItem("challenges") || "[]");
    existingChallenges.push(challenge);
    localStorage.setItem("challenges", JSON.stringify(existingChallenges));

    const shareLink = `${window.location.origin}/challenge/${challengeId}`;
    setShowShareLink(shareLink);

    toast.success("Challenge created", {
  description: <p className="text-gray-700">Your students can now access the challenge.</p>,
  icon: <CheckCircle className="text-green-500" />,
  duration: 4000,
});
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(showShareLink);
    toast.info("Link copied", {
  description: <p className="text-gray-700">Challenge URL has been copied to your clipboard.</p>,
  icon: <Info className="text-blue-500" />,
  duration: 3000,
});

  };

  if (showShareLink) {
    return (
        <div className="max-w-2xl mx-auto p-2 sm:p-0">
          <Card>
            <CardHeader>
                <Lottie
  animationData={animationData} 
  loop={true}
  className="w-64 h-64 mx-auto"
/>
              <CardTitle className="text-center">Challenge Created Successfully!</CardTitle>
              <CardDescription className="text-center">
                Share this link with your students to give them access to the challenge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={showShareLink} readOnly className="flex-1" />
                <Button onClick={copyShareLink} variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <Button className="cursor-pointer rounded-3xl" onClick={() => setShowShareLink("")} variant="outline">
                  Add Challenge
                </Button>
                <Button className="cursor-pointer rounded-3xl" onClick={() => navigate("/dashboard/my-challenges")}>
                  View All Challenges
                </Button>
              </div>    
            </CardContent>
          </Card>
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto p-2 sm:p-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Challenge</h1>
          <p className="text-gray-600">
            Design a coding challenge for your students
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Challenge Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Two Sum Problem"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <CardDescription className="text-green-600">
                *Challenge should be in the form of a function that has a return value
              </CardDescription>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the problem..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Programming Languages</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) => 
                          handleLanguageChange(language, checked as boolean)
                        }
                      />
                      <Label htmlFor={language}>{language}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTimeLimit"
                    checked={formData.hasTimeLimit}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, hasTimeLimit: checked as boolean })
                    }
                  />
                  <Label htmlFor="hasTimeLimit">Set Time Limit</Label>
                </div>
                
                {formData.hasTimeLimit && (
                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      placeholder="30"
                      value={formData.timeLimit}
                      onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="space-y-3">
  <div className="flex items-center space-x-2">
    <Checkbox
      id="hasDeadline"
      checked={formData.hasDeadline}
      onCheckedChange={(checked) =>
        setFormData({ ...formData, hasDeadline: checked as boolean })
      }
    />
    <Label htmlFor="hasDeadline">Set Deadline</Label>
  </div>

  {formData.hasDeadline && (
    <div className="space-y-2">
      <Label htmlFor="deadline">Deadline (date & time)</Label>
      <Input
        id="deadline"
        type="datetime-local"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
      />
    </div>
  )}
</div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>
                Define test cases that will validate student solutions
              </CardDescription>
              <CardDescription className="text-green-600">
                *Data types allowed: string,array,integer,boolean
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <Card key={testCase.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Test Case {index + 1}</h4>
                    {testCases.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTestCase(testCase.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Input Types</Label>
                        <Input
                            placeholder='e.g., string,array'
                            value={testCase.inputType}
                            onChange={(e) => updateTestCase(testCase.id, "inputType", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                            Use comma-separated values (e.g., <code>string,boolean</code>)
                        </p>
                        </div>
                    
                    <div className="space-y-2">
                      <Label>Input Values</Label>
                      <Input
                        placeholder="e.g., hello,[2, 7, 11, 15]"
                        value={testCase.inputValue}
                        onChange={(e) => updateTestCase(testCase.id, "inputValue", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
  <Label>Output Types</Label>
  <Input
    placeholder='e.g., boolean,integer'
    value={testCase.outputType}
    onChange={(e) => updateTestCase(testCase.id, "outputType", e.target.value)}
  />
  <p className="text-sm text-muted-foreground">
    Use comma-separated values (e.g., <code>string,boolean</code>)
  </p>
</div>

                    
                    <div className="space-y-2">
                      <Label>Output Values</Label>
                      <Input
                        placeholder="e.g., false,8"
                        value={testCase.outputValue}
                        onChange={(e) => updateTestCase(testCase.id, "outputValue", e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              
              <Button type="button" variant="outline" onClick={addTestCase}>
                <Plus className="h-4 w-4 mr-2" />
                Add Test Case
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challengeKey">Challenge key</Label>
                <Input
                  id="challengeKey"
                  placeholder="Enter your key required to open challenge"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              </CardContent>
              </Card>

          <div className="flex justify-end">
            <Button type="submit" className="gradient-bg rounded-3xl">
              Create Challenge
            </Button>
          </div>
        </form>
      </div>
  );
};

export default PostChallenge;
