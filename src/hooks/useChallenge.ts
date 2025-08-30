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

const fetchChallenge = async (id:string): Promise<Challenge> => {
  const { data } = await axios.get(BASE_URL+"/api/v1/challenges/"+id);
  return data;
};

export const useChallenge = (id: string) => {
  return useQuery<Challenge, Error>({
    queryKey: ["challenge", id],
    queryFn: () => fetchChallenge(id),
    staleTime: 0,
    retry: 1,
  });
};

