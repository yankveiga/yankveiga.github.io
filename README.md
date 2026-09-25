# Portfolio Yan Veiga

Portfolio estatico pronto para publicar no GitHub Pages usando a pasta `docs`.

## Publicar no GitHub Pages

1. No GitHub, crie um repositorio publico chamado `yankveiga.github.io`.
2. Nao marque as opcoes para criar README, `.gitignore` ou licenca.
3. Abra o PowerShell nesta pasta e execute:

```powershell
git init
git add .
git commit -m "Cria portfolio pessoal"
git branch -M main
git remote add origin https://github.com/yankveiga/yankveiga.github.io.git
git push -u origin main
```

4. No repositorio do GitHub, acesse `Settings` > `Pages`.
5. Em `Build and deployment`, escolha `Deploy from a branch`.
6. Selecione a branch `main`, a pasta `/docs` e clique em `Save`.

Depois da publicacao, o endereco sera:

`https://yankveiga.github.io/`

## Rodar localmente

```bash
cd docs
python -m http.server 4173
```

Depois acesse `http://localhost:4173`.
