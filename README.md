# Mãos Unidas – Plataforma web para ONGs

Projeto acadêmico (HTML5 semântico, CSS3 responsivo e JavaScript).

## Estrutura
```
index.html      Página inicial (missão, visão, valores, equipe, contato)
projetos.html   Projetos sociais, voluntariado, como doar, prestação de contas
cadastro.html   Formulário com validação HTML5 e máscaras (CPF, telefone, CEP)
css/style.css   Sistema de design mobile-first (breakpoints 768px e 1024px)
js/main.js      Menu responsivo, máscaras e validação de CPF
img/            Imagens em WebP e JPG (versões -sm para mobile)
```

## Recursos
- Estrutura semântica (header, nav, main, section, article, footer), hierarquia de títulos consistente
- Acessibilidade: skip link, foco visível, aria, contraste AA, navegação por teclado
- Imagens `<picture>` em WebP com fallback JPG, `loading="lazy"`
- Validação nativa (required, pattern, type, min/max) e agrupamento com `fieldset`/`legend`

## Como executar
Abra `index.html` no navegador. Publicação: GitHub Pages (HTTPS).

## Validação
Valide cada HTML em https://validator.w3.org/.
