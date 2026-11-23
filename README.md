# Outras formas de ver

Fotolivro digital de Diana Domingues Araujo. Abra `index.html` no navegador para testar. No computador, a leitura começa com 001 e 002 lado a lado. No celular, cada página aparece separadamente. Use as setas, os botões ou o gesto de deslizar. Clique ou toque na página para ampliar e use **Fechar** ou Escape para voltar.

## Atualizar o livro

1. **Substituir uma página:** coloque o novo JPG de 1800 × 2400 px em `imagens/paginas/`, com o mesmo nome. Atualize a cópia de 900 × 1200 px em `imagens/leitura/` com o mesmo nome ou remova a cópia antiga para o leitor usar o JPG original. Na ampliação, o leitor sempre usa o original.
2. **Acrescentar ou remover:** adicione ou retire o nome do JPG no array `bookContent.pages` em `content.js`. Para acrescentar, inclua o original na pasta e, se possível, a cópia leve. A entrada opcional em `bookContent.details` aceita `description` para descrever a imagem, `label` para nomear a página, `title` e `paragraphs` para transcrever textos. Eles ficam disponíveis a leitores de tela sem aparecer na diagramação.
3. **Reordenar:** rearranje os nomes em `bookContent.pages`. Mantenha `001.jpg` e `002.jpg` nas duas primeiras posições para preservar a abertura atual. Em `bookContent.information`, edite Sobre o olhar, Sobre o projeto e Créditos.
4. **Publicar ou atualizar:** envie `index.html`, `styles.css`, `reader.js`, `content.js`, `.nojekyll` e as pastas `imagens/paginas/` e `imagens/leitura/` à raiz do repositório. Em **Settings → Pages**, selecione **Deploy from a branch**, a branch desejada e **/(root)**. Salve e abra a URL mostrada em **Pages**. Envie as alterações à mesma branch para atualizar. [Documentação do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
