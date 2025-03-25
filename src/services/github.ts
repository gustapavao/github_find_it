// Função para buscar o perfil do GitHub
export const fetchGitHubProfile = async (username: string) => {
    if (!username) return null;
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("Usuário não encontrado");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Função para buscar os repositórios do GitHub
export const fetchGitHubRepos = async (username: string) => {
    if (!username) return [];
    try {
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        if (!response.ok) throw new Error("Erro ao buscar repositórios");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Função para contar as linguagens usadas nos repositórios
export const fetchGitHubLanguages = async (username: string) => {
    if (!username) return {};
    try {
        const repos = await fetchGitHubRepos(username);
        const languagesCount: Record<string, number> = {};

        for (const repo of repos) {
            if (!repo.language) continue;
            languagesCount[repo.language] =
                (languagesCount[repo.language] || 0) + 1;
        }

        return languagesCount;
    } catch (error) {
        console.error(error);
        return {};
    }
};
