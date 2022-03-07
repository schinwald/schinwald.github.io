import { GitHubData } from "pages/api/github";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGitHub = (repos: string[]) => {
	const { data, error } = useSWR('/api/github?' + new URLSearchParams(repos.map(repo => { return ['repos', repo] })), fetcher)

    return {
        github: data as GitHubData,
        loading: !data && !error,
        error: error,
    }
}