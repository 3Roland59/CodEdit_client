import { BASE_URL } from "@/config/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TestCase {
  id: string;
  inputDataType: string;
  inputValue: string;
  outputDataType: string;
  outputValue: string;
  hidden: boolean;
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

const fetchChallenges = async (): Promise<Challenge[]> => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(BASE_URL+"/api/v1/challenges/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useChallenges = () => {
  return useQuery<Challenge[], Error>({
    queryKey: ["challenges"],
    queryFn: fetchChallenges,
    staleTime: 0,
    retry: 1,
  });
};
