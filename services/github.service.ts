
const GITHUB_API = "https://api.github.com";

const getHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
});

export const getGithubUser = async (token: string) => {
    const response = await fetch(`${GITHUB_API}/user`, {
        headers: getHeaders(token),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch GitHub user");
    }

    return response.json();
};

export const getRepositories = async (token: string) => {
    const response = await fetch(
        `${GITHUB_API}/user/repos?per_page=100`,
        {
            headers: getHeaders(token),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch repositories");
    }

    return response.json();
};