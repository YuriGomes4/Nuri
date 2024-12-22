class GitHubAPI {
    constructor(token) {
        this.baseURL = "https://api.github.com";
        this.token = token;
    }

    async request(endpoint, method = 'GET', body = null) {
        const headers = {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };

        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        return response.json();
    }

    async criarCommit(nomeRepo, nomeDono, nomeCommit, arquivos) {
        // Step 1: Get the reference to the main branch
        const refData = await this.request(`/repos/${nomeDono}/${nomeRepo}/git/ref/heads/main`);
        const shaBaseTree = refData.object.sha;

        // Step 2: Create a tree with the new files
        if (!Array.isArray(arquivos)) {
            throw new Error('arquivos must be an array');
        }

        const treeItems = arquivos.map(arquivo => ({
            path: arquivo.caminho,
            mode: '100644',
            type: 'blob',
            content: arquivo.conteudo
        }));

        const newTree = await this.request(`/repos/${nomeDono}/${nomeRepo}/git/trees`, 'POST', {
            base_tree: shaBaseTree,
            tree: treeItems
        });

        // Step 3: Create a commit
        const commit = await this.request(`/repos/${nomeDono}/${nomeRepo}/git/commits`, 'POST', {
            message: nomeCommit,
            tree: newTree.sha,
            parents: [shaBaseTree]
        });

        // Step 4: Update the reference to point to the new commit
        await this.request(`/repos/${nomeDono}/${nomeRepo}/git/refs/heads/main`, 'PATCH', {
            sha: commit.sha
        });

        return commit;
    }
}
