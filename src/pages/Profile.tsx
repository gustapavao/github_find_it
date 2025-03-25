import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { fetchGitHubProfile, fetchGitHubRepos, fetchGitHubLanguages } from "../services/github";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [profile, setProfile] = useState<any | null>(null);
    const [error, setError] = useState("");
    const [repos, setRepos] = useState<any[]>([]);
    const [languages, setLanguages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false); // Estado para carregar

    const handleFetchProfile = async () => {
        if (!username.trim()) {
            setError("Por favor, digite um nome de usuário!");
            return;
        }

        setLoading(true);
        setError(""); // Limpa erro antes da nova busca
        setProfile(null);
        setRepos([]);
        setLanguages([]);

        try {
            const userData = await fetchGitHubProfile(username);

            // Verifica se a resposta contém "message: Not Found"
            if (!userData || userData.message === "Not Found") {
                throw new Error("Usuário não encontrado!");
            }

            const repoData = await fetchGitHubRepos(username);
            const languageData = await fetchGitHubLanguages(username);

            setProfile(userData);
            setRepos(repoData);
            setLanguages(
                Object.entries(languageData).map(([key, value]) => ({
                    name: key,
                    value,
                }))
            );
        } catch (err: any) {
            setError(err.message || "Erro ao buscar dados do GitHub.");
        } finally {
            setLoading(false);
        }
    };

    const colors = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="flex gap-4 mb-6">
                <Input
                    placeholder="Digite o nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button onClick={handleFetchProfile} {...(loading ? { disabled: true } : {})}>
                    {loading ? "Carregando..." : "Buscar"}
                </Button>

            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {profile && (
                <Card className="w-96 mb-8">
                    <CardContent>
                        <img
                            src={profile.avatar_url}
                            alt={profile.login}
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h2 className="text-2xl font-bold mt-4">{profile.name}</h2>
                        <p className="text-gray-600 mt-2">{profile.bio}</p>
                        <p className="mt-4">Seguidores: {profile.followers}</p>
                        <p>Seguindo: {profile.following}</p>
                        <a
                            href={profile.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline mt-4 inline-block"
                        >
                            Ver no GitHub
                        </a>
                    </CardContent>
                </Card>
            )}

            {repos.length > 0 && (
                <div className="w-96 mt-6">
                    <h3 className="text-lg font-bold mb-4">Repositórios Recentes</h3>
                    {repos.map((repo) => (
                        <Card key={repo.id} className="mb-4 p-4">
                            <CardContent>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 font-semibold hover:underline"
                                >
                                    {repo.name}
                                </a>
                                <p className="text-sm text-gray-500 mt-2">{repo.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {languages.length > 0 && (
                <div className="w-96 mt-8">
                    <h3 className="text-lg font-bold mb-4">Linguagens Mais Usadas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={languages}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {languages.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
