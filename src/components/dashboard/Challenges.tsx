
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Calendar, Copy, Info } from "lucide-react";
import { toast } from "sonner";
import empty from "../../assets/empty.png"

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

const Challenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    const storedChallenges = JSON.parse(localStorage.getItem("challenges") || "[]");
    setChallenges(storedChallenges);
  }, []);

  const copyShareLink = (challengeId: string) => {
    const shareLink = `${window.location.origin}/challenge/${challengeId}`;
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
      month: 'short',
      day: 'numeric'
    });
  };

  if (challenges.length === 0) {
    return (
        <div className="max-w-4xl mx-auto p-2 sm:p-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Challenges</h1>
            <p className="text-gray-600">
              Manage and share your coding challenges
            </p>
          </div>

          <Card className="text-center py-12">
            <img
              src={empty}
              alt="empty"
              className="w-48 h-48 object-contain mx-auto"
            />
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">No challenges yet</h3>
                <p className="text-gray-600">
                  Create your first coding challenge to get started
                </p>
                <Link to="/teacher/post-challenge">
                  <Button className="rounded-3xl gradient-bg">
                    Create Your First Challenge
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
    );
  }

  return (
      <div className="max-w-6xl mx-auto p-2 sm:p-0">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Challenges</h1>
            <p className="text-gray-600">
              {challenges.length} challenge{challenges.length !== 1 ? 's' : ''} created
            </p>
          </div>
          <Link to="/teacher/post-challenge">
            <Button className="gradient-bg rounded-3xl">
              Create New Challenge
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <Card key={challenge.id} className="hover:bg-blue-100 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{challenge.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {challenge.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                    className="cursor-pointer"
                      variant="outline"
                      size="sm"
                      onClick={() => copyShareLink(challenge.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Link to={`/teacher/challenge/${challenge.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {challenge.languages.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created {formatDate(challenge.createdAt)}</span>
                      </div>
                      {challenge.hasTimeLimit && (
                        <div className="flex items-center gap-1">
                          <span>⏱️ {challenge.timeLimit} min</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span>📝 {challenge.testCases.length} test cases</span>
                      </div>
                    </div>
                    
                    <Link to={`/teacher/submissions/${challenge.id}`}>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        View Submissions
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
  );
};

export default Challenges;
