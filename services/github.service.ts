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
    const response = await fetch(`${GITHUB_API}/user/repos?per_page=100`, {
        headers: getHeaders(token),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch repositories");
    }

    return response.json();
};


export const getRepositoryById = async (token: string, id: number | string) => {
    const response = await fetch(`${GITHUB_API}/repositories/${id}`, {
        headers: getHeaders(token),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch repository by ID");
    }

    return response.json();
};

export const getLanguagesById = async (token: string, id: number | string) => {
    // Сначала получаем репозиторий, чтобы узнать owner и name
    const repo = await getRepositoryById(token, id);
    const owner = repo.owner.login;
    const repoName = repo.name;

    const response = await fetch(
        `${GITHUB_API}/repos/${owner}/${repoName}/languages`,
        {
            headers: getHeaders(token),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch languages");
    }

    return response.json();
};

export const getCommitsById = async (
    token: string,
    id: number | string,
    perPage = 30
) => {
    const repo = await getRepositoryById(token, id);
    const owner = repo.owner.login;
    const repoName = repo.name;

    const response = await fetch(
        `${GITHUB_API}/repos/${owner}/${repoName}/commits?per_page=${perPage}`,
        {
            headers: getHeaders(token),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch commits");
    }

    const commits = await response.json();

    const commitsWithStats = await Promise.all(
        commits.map(async (commit: any) => {
            const detailResponse = await fetch(
                `${GITHUB_API}/repos/${owner}/${repoName}/commits/${commit.sha}`,
                {
                    headers: getHeaders(token),
                }
            );

            if (!detailResponse.ok) {
                return {
                    ...commit,
                    stats: { additions: 0, deletions: 0, total: 0 },
                };
            }

            const detail = await detailResponse.json();

            return {
                ...commit,
                stats: detail.stats,
            };
        })
    );

    return commitsWithStats;
};

export const getContributorsById = async (
    token: string,
    id: number | string,
    perPage = 30
) => {
    const repo = await getRepositoryById(token, id);
    const owner = repo.owner.login;
    const repoName = repo.name;

    const response = await fetch(
        `${GITHUB_API}/repos/${owner}/${repoName}/contributors?per_page=${perPage}`,
        {
            headers: getHeaders(token),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch contributors");
    }

    return response.json();
};