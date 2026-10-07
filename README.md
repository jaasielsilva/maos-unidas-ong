# Mãos Unidas – Plataforma web para ONGs

Projeto acadêmico (Uso de Design): HTML5 semântico, CSS3 responsivo com design system e JavaScript.

🔗 **Acesse o site:** https://jaasielsilva.github.io/maos-unidas-ong/

## Páginas
- [Início](https://jaasielsilva.github.io/maos-unidas-ong/) – missão, visão, valores, conquistas, equipe e contato
- [Projetos](https://jaasielsilva.github.io/maos-unidas-ong/projetos.html) – projetos sociais, voluntariado, como doar
- [Cadastro](https://jaasielsilva.github.io/maos-unidas-ong/cadastro.html) – formulário com validação visual e máscaras (CPF, telefone, CEP)

## Estrutura
```
index.html, projetos.html, cadastro.html
css/
  style.css        Ponto de entrada (importa os módulos abaixo)
  variables.css    Design system: cores, tipografia, espaçamentos, sombras
  base.css         Reset, tipografia base, utilitários
  components.css   Header, menu, botões, cards, formulários, alertas, toasts, modal, tags
  layout.css       Grid de 12 colunas, estrutura da página
  responsive.css   Breakpoints: 480, 640, 768, 1024 e 1280px
js/main.js         Menu hambúrguer/dropdown, máscaras, validação, toasts e modal
img/               Imagens em WebP e JPG (versões -sm para mobile)
```

## Recursos
- Design system com variáveis CSS (cores, 9 tamanhos de fonte, espaçamento de 8 a 64px)
- CSS Grid na estrutura da página e no grid de 12 colunas; Flexbox nos componentes
- Menu responsivo com submenu dropdown e menu hambúrguer no mobile
- Componentes: cards, botões (hover, focus, active, disabled), formulários, alerts, toasts, modal e tags
- Acessibilidade: skip link, foco visível, aria e navegação por teclado

## Como executar
Abra `index.html` no navegador ou acesse o link do site acima (GitHub Pages).
