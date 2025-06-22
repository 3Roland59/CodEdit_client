import { BASE_URL } from "@/config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

const fetchAllSubmissions = async (): Promise<Submission[]> => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(`${BASE_URL}/api/v1/submissions/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  
  return data;
};

export const useAllSubmissions = () => {
  return useQuery<Submission[], Error>({
    queryKey: ["allSubmissions"],
    queryFn: fetchAllSubmissions,
    staleTime: 0,
    retry: 1,
  });
};
