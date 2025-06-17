import { Link } from "react-router"; // corrected import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Calendar, Copy, Info } from "lucide-react";
import { toast } from "sonner";
import empty from "../../assets/empty.png";
import { useChallenges } from "@/hooks/useChallenges"; // <--- ✅ import hook
import { Loader2 } from "lucide-react"; // optional loading spinner

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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-600 h-8 w-8" />
      </div>
    );
  }

  if (challenges?.length == 0 || ! challenges) {
    return (
      <div className="max-w-4xl mx-auto p-2 sm:p-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Challenges</h1>
          <p className="text-gray-600">Manage and share your coding challenges</p>
        </div>

        <Card className="text-center py-12">
          <img src={empty} alt="empty" className="w-48 h-48 object-contain mx-auto" />
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">No challenges yet</h3>
              <p className="text-gray-600">Create your first coding challenge to get started</p>
              <Link to="/dashboard/post-challenge">
                <Button className="rounded-3xl gradient-bg cursor-pointer">
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
            {challenges?.length} challenge{challenges?.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <Link to="/dashboard/post-challenge">
          <Button className="gradient-bg rounded-3xl cursor-pointer">
            Create New Challenge
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {challenges?.map((challenge) => (
          <Card key={challenge.id}>
            <CardHeader>
  <div className="flex flex-col sm:flex-row justify-between gap-4">
    <div className="flex-1">
      <CardTitle className="text-xl mb-2">{challenge.title}</CardTitle>
      <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
    </div>
    <div className="flex gap-2 self-start sm:self-auto ">
      <Button
        className="cursor-pointer"
        variant="outline"
        size="sm"
        onClick={() => copyShareLink(challenge.id)}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <Link to={`/dashboard/my-challenges/${challenge.id}`}>
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
      {challenge.languages.split(",").map((language) => (
        <Badge key={language} variant="secondary">
          {language.trim()}
        </Badge>
      ))}
    </div>

    <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-600">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Created {formatDate(challenge.createdAt)}</span>
        </div>
        {challenge.time !== 0 && (
          <div className="flex items-center gap-1">
            <span>⏱️ {challenge.time} min</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <span>📝 {challenge.testCases.length} test cases</span>
        </div>
      </div>

      <div>
        <Link to={`/dashboard/submissions/${challenge.id}`}>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Users className="h-4 w-4 mr-1" />
            View Submissions
          </Button>
        </Link>
      </div>
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
