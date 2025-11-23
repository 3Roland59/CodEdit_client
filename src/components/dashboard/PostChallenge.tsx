import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Copy, XCircle, CheckCircle, Info, Loader2, Code2, FileText, Clock, Key, Calendar, Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Lottie from "lottie-react";
import animationData from "../../assets/success.json";
import { BASE_URL } from "@/config/config";
import axios from "axios";

interface TestCase {
  id: string;
  inputDataType: string;
  inputValue: string;
  outputDataType: string;
  outputValue: string;
  hidden: boolean;
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
    challengeKey:""
  });

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "1", inputDataType: "", inputValue: "", outputDataType: "", outputValue: "", hidden: false }
  ]);

  const [showShareLink, setShowShareLink] = useState("");
  const [loading, setLoading] = useState(false);

  const languages = ["python", "javascript"];
  const dataTypes = ["string", "integer", "decimal", "boolean", "array"];

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      inputDataType: "string",
      inputValue: "",
      outputDataType: "string",
      outputValue: "",
      hidden: false,
    };
    setTestCases([...testCases, newTestCase]);
  };

  const removeTestCase = (id: string) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
    }
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: string | boolean) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const isValidType = (type: string) => dataTypes.includes(type.trim());

  const isValidTestCase = (tc: TestCase) => {
    const inputDataTypes = tc.inputDataType.split(";").map(t => t.trim());
    const inputValues = tc.inputValue.split(";").map(v => v.trim());
    const outputDataTypes = tc.outputDataType.split(";").map(t => t.trim());
    const outputValues = tc.outputValue.split(";").map(v => v.trim());

    const allInputDataTypesValid = inputDataTypes.every(isValidType);
    const allOutputDataTypesValid = outputDataTypes.every(isValidType);

    const inputCountMatches = inputDataTypes.length === inputValues.length;
    const outputCountMatches = outputDataTypes.length === outputValues.length;

    return (
      tc.inputValue &&
      tc.outputValue &&
      allInputDataTypesValid &&
      allOutputDataTypesValid &&
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.languages.length === 0) {
      toast.error("Missing language selection", {
        description: (
          <p className="text-gray-700">
            Please select at least one programming language.
          </p>
        ),
        icon: <XCircle className="text-red-500" />,
        duration: 4000,
      });
      return;
    }

    if (testCases.some((tc) => !isValidTestCase(tc))) {
      toast.error("Invalid Test Case", {
        description: (
          <p className="text-gray-700">
            Make sure each test case has valid, semicolon-separated types and values.
            <br />
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
        description: (
          <p className="text-gray-700">
            Deadline must be a future date and time.
          </p>
        ),
        icon: <XCircle className="text-red-500" />,
        duration: 4000,
      });
      return;
    }

    let deadline = "";
    let time = 0;
    if (formData.hasDeadline) {
      deadline = new Date(formData.deadline).toISOString();
    }
    if (formData.hasTimeLimit) {
      time = Number(formData.timeLimit);
    }

    const challenge = {
      title: formData.title,
      description: formData.description,
      deadline,
      time,
      challengeKey: formData.challengeKey,
      languages: formData.languages.join(","),
      testCases,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.post(
        BASE_URL+"/api/v1/challenges",
        challenge,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const challengeId = res.data.id;
      const shareLink = `${window.location.origin}/challenge/${challengeId}`;
      setShowShareLink(shareLink);

      toast.success("Challenge created", {
        description: (
          <p className="text-gray-700">
            Your students can now access the challenge.
          </p>
        ),
        icon: <CheckCircle className="text-green-500" />,
        duration: 4000,
      });
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to create challenge", {
        description: (
          <p className="text-gray-700">
            {error?.response?.data?.message || "Please try again later."}
          </p>
        ),
        icon: <XCircle className="text-red-500" />,
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
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
      <div className="max-w-2xl mx-auto p-4 sm:p-6 animate-fade-in-up">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
          
          <Card className="relative border-2 border-green-100 hover:border-green-200 transition-all shadow-2xl rounded-3xl overflow-hidden">
            
            <CardHeader className="text-center pb-4">
              <div className="relative inline-block mx-auto">
                <Lottie
                  animationData={animationData} 
                  loop={true}
                  className="relative w-48 h-48 mx-auto drop-shadow-2xl"
                />
              </div>
              
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mt-4">
                Challenge Created Successfully!
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Share this link with your students to give them access to the challenge
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6 px-8 pb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-2xl border-2 border-gray-200 font-mono text-sm break-all text-gray-700">
                  {showShareLink}
                </div>
                <Button 
                  onClick={copyShareLink} 
                  variant="outline"
                  className="group px-6 border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all"
                >
                  <Copy className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={() => setShowShareLink("")} 
                  variant="outline"
                  className="flex-1 py-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 font-semibold transition-all group"
                >
                  <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Create Another Challenge
                </Button>
                <Button 
                  onClick={() => navigate("/dashboard/my-challenges")}
                  className="flex-1 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105 transform"
                >
                  View All Challenges
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
            Create New Challenge
          </h1>
        </div>
        <p className="text-gray-600 ml-14">Design a coding challenge for your students</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="relative group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          
          <Card className="relative border-2 border-gray-100 hover:border-indigo-200 transition-all shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
            
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Challenge Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Two Sum Problem"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
                <div className="p-3 rounded-xl bg-green-50 border border-green-200 mb-2">
                  <p className="text-xs text-green-700 flex items-center gap-2">
                    <Info className="h-4 w-4 flex-shrink-0" />
                    Challenge should be in the form of a function that has a return value
                  </p>
                </div>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the problem..."
                  className="min-h-[140px] rounded-2xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">Programming Languages</Label>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((language) => (
                    <div key={language} className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer">
                      <Checkbox
                        id={language}
                        checked={formData.languages.includes(language)}
                        onCheckedChange={(checked) => 
                          handleLanguageChange(language, checked as boolean)
                        }
                        className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                      <Label htmlFor={language} className="cursor-pointer font-medium capitalize">{language}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer">
                    <Checkbox
                      id="hasTimeLimit"
                      checked={formData.hasTimeLimit}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, hasTimeLimit: checked as boolean })
                      }
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Clock className="h-4 w-4 text-blue-600" />
                    <Label htmlFor="hasTimeLimit" className="cursor-pointer font-medium">Set Time Limit</Label>
                  </div>
                  
                  {formData.hasTimeLimit && (
                    <div className="space-y-2 pl-2 animate-fade-in-up">
                      <Label htmlFor="timeLimit" className="text-sm font-semibold text-gray-700">Time Limit (minutes)</Label>
                      <Input
                        id="timeLimit"
                        type="number"
                        placeholder="30"
                        value={formData.timeLimit}
                        onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
                        className="rounded-2xl border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all cursor-pointer">
                    <Checkbox
                      id="hasDeadline"
                      checked={formData.hasDeadline}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, hasDeadline: checked as boolean })
                      }
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <Label htmlFor="hasDeadline" className="cursor-pointer font-medium">Set Deadline</Label>
                  </div>

                  {formData.hasDeadline && (
                    <div className="space-y-2 pl-2 animate-fade-in-up">
                      <Label htmlFor="deadline" className="text-sm font-semibold text-gray-700">Deadline (date & time)</Label>
                      <Input
                        id="deadline"
                        type="datetime-local"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="rounded-2xl border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
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
                    Define test cases to validate student solutions
                  </CardDescription>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 mt-4">
                <p className="text-xs text-green-700 flex items-center gap-2">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  Data types allowed: {dataTypes.join(", ")}
                </p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <div key={testCase.id} className="relative group/test">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover/test:opacity-10 blur transition-opacity"></div>
                  
                  <Card className="relative p-5 border-2 border-gray-100 hover:border-indigo-200 transition-all rounded-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        Test Case {index + 1}
                      </h4>
                      {testCases.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTestCase(testCase.id)}
                          className="group/del border-2 border-red-200 hover:border-red-400 hover:bg-red-50 text-red-700 transition-all"
                        >
                          <Trash2 className="h-4 w-4 group-hover/del:scale-110 transition-transform" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Input Types</Label>
                        <Input
                          placeholder='e.g., string;array'
                          value={testCase.inputDataType}
                          onChange={(e) => updateTestCase(testCase.id, "inputDataType", e.target.value)}
                          className="rounded-xl border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                        <p className="text-xs text-gray-500">
                          Use semicolon to separate (e.g., <code className="bg-gray-100 px-1 py-0.5 rounded">string;boolean</code>)
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Input Values</Label>
                        <Input
                          placeholder="e.g., hello;[2, 7, 11, 15]"
                          value={testCase.inputValue}
                          onChange={(e) => updateTestCase(testCase.id, "inputValue", e.target.value)}
                          className="rounded-xl border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Output Types</Label>
                        <Input
                          placeholder='e.g., boolean;integer'
                          value={testCase.outputDataType}
                          onChange={(e) => updateTestCase(testCase.id, "outputDataType", e.target.value)}
                          className="rounded-xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                        />
                        <p className="text-xs text-gray-500">
                          Use semicolon to separate (e.g., <code className="bg-gray-100 px-1 py-0.5 rounded">string;boolean</code>)
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Output Values</Label>
                        <Input
                          placeholder="e.g., false;8"
                          value={testCase.outputValue}
                          onChange={(e) => updateTestCase(testCase.id, "outputValue", e.target.value)}
                          className="rounded-xl border-2 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer mt-4">
                      <Checkbox
                        id={`hidden-${testCase.id}`}
                        checked={testCase.hidden || false}
                        onCheckedChange={(checked) =>
                          updateTestCase(testCase.id, "hidden", checked as boolean)
                        }
                        className="data-[state=checked]:bg-gray-600 data-[state=checked]:border-gray-600"
                      />
                      {testCase.hidden ? (
                        <EyeOff className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-600" />
                      )}
                      <Label htmlFor={`hidden-${testCase.id}`} className="cursor-pointer font-medium">
                        Hidden from students
                      </Label>
                    </div>
                  </Card>
                </div>
              ))}
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={addTestCase}
                className="w-full py-6 rounded-2xl border-2 border-dashed border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-700 font-semibold transition-all group"
              >
                <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
                Add Test Case
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security */}
        <div className="relative group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
          
          <Card className="relative border-2 border-gray-100 hover:border-amber-200 transition-all shadow-lg hover:shadow-xl rounded-3xl overflow-hidden">
            
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                  <Key className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Security</CardTitle>
                  <CardDescription className="mt-1">
                    Optional: Add a key to restrict access to this challenge
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <Label htmlFor="challengeKey" className="text-sm font-semibold text-gray-700">Challenge Key (Optional)</Label>
              <Input
                id="challengeKey"
                placeholder="Enter a key required to access this challenge"
                value={formData.challengeKey}
                onChange={(e) => setFormData({ ...formData, challengeKey: e.target.value })}
                className="rounded-2xl border-2 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all"
              />
            </CardContent>
          </Card>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <Button 
            onClick={handleSubmit}
            disabled={loading}
            className="group px-8 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Creating Challenge...
              </>
            ) : (
              <>
                Create Challenge
                <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostChallenge;
