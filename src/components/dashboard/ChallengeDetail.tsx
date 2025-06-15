
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Users, Calendar, Clock, Info } from "lucide-react";
import { toast } from "sonner";
import nf from "../../assets/notfound.png"

interface Challenge {
  id: string;
  title: string;
  description: string;
  languages: string[];
  timeLimit: string;
  hasTimeLimit: boolean;
  createdAt: string;
  testCases: any[];
}

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    if (id) {
      const challenges = JSON.parse(localStorage.getItem("challenges") || "[]");
      const foundChallenge = challenges.find((c: Challenge) => c.id === id);
      setChallenge(foundChallenge);
    }
  }, [id]);

  const copyShareLink = () => {
    const shareLink = `${window.location.origin}/challenge/${id}`;
    navigator.clipboard.writeText(shareLink);
    toast("Link copied", {
  description: <p className="text-gray-700">Challenge URL has been copied to your clipboard.</p>,
  icon: <Info className="text-blue-500" />,
  duration: 3000,
});
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!challenge) {
    return (
        <div className="max-w-2xl mx-auto p-2 sm:p-0">
        <Card className="text-center py-12">
            <img
              src={nf}
              alt="empty"
              className="w-48 h-48 object-contain mx-auto"
            />
          <CardContent>
            <h3 className="text-lg font-medium text-gray-900">Challenge not found</h3>
            <p className="text-gray-600 mt-2">
              The challenge you're looking for doesn't exist.
            </p>
            <Link to="/dashboard/my-challenges">
              <Button className="mt-4 rounded-3xl gradient-bg">Back to Challenges</Button>
            </Link>
          </CardContent>
        </Card>
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto p-2 sm:p-0">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{challenge.title}</h1>
            <p className="text-gray-600">
              Created on {formatDate(challenge.createdAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={copyShareLink} className="rounded-3xl" variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy Share Link
            </Button>
            <Link to={`/teacher/submissions/${challenge.id}`}>
              <Button className="rounded-3xl gradient-bg">
                <Users className="h-4 w-4 mr-2" />
                View Submissions
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* Challenge Info */}
          <Card>
            <CardHeader>
              <CardTitle>Challenge Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{challenge.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Supported Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {challenge.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Settings</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Created {formatDate(challenge.createdAt)}</span>
                    </div>
                    {challenge.hasTimeLimit && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Time limit: {challenge.timeLimit} minutes</span>
                      </div>
                    )}
                    <div>
                      <span>Test cases: {challenge.testCases.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>
                These test cases will be used to validate student solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challenge.testCases.map((testCase, index) => (
                  <Card key={testCase.id} className="p-4">
                    <h4 className="font-medium mb-3">Test Case {index + 1}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Input</div>
                        <div className="bg-gray-50 p-2 rounded text-sm">
                          <span className="text-gray-500">({testCase.inputType})</span> {testCase.inputValue}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Expected Output</div>
                        <div className="bg-gray-50 p-2 rounded text-sm">
                          <span className="text-gray-500">({testCase.outputType})</span> {testCase.outputValue}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Share Section */}
          <Card>
            <CardHeader>
              <CardTitle>Share Challenge</CardTitle>
              <CardDescription>
                Share this link with your students to give them access to the challenge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1 bg-gray-50 p-3 rounded border text-sm font-mono">
                  {window.location.origin}/challenge/{challenge.id}
                </div>
                <Button onClick={copyShareLink} variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default ChallengeDetail;
