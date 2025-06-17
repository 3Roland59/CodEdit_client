import { BASE_URL } from "@/config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Type Definitions
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

const fetchSubmissions = async (challengeId: string): Promise<Submission[]> => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${BASE_URL}/api/v1/submissions/challenge/${challengeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useSubmissions = (challengeId: string) => {
  return useQuery<Submission[], Error>({
    queryKey: ["submissions", challengeId],
    queryFn: () => fetchSubmissions(challengeId),
    enabled: !!challengeId, 
    staleTime: 0,
    retry: 1,
  });
};
