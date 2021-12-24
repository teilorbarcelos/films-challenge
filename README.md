![Printscreen of the project](/.github/screenshot.png)

## Films-Challenge

Este projeto foi desenvolvido como desafio para uma vaga de emprego, em uma agência de publicidade, foi solicitado que eu fizesse uma aplicação responsiva consumindo a api do [TMDB](https://www.themoviedb.org/), além de usar algum pré-processador de css, React 17, bibliotecas de terceiros, fizesse uma implementação de testes com jest e etc...

Então, aí está, as técnologias usadas foram:

* React 17.0.2
* react-player 2.9.0 (para rodar os vídeos dos trailers)
* axios 0.24.0 (para fazer as requisições na API)
* node-sass 7.0.0 (para processar o scss do desenvolvimento)
* sass-loader 12.4.0 (para carregar o scss do projeto)
* style-loader 3.3.1 (para auxiliar no desenvolvimento scss)
* jest para os testes (já vem com o react)

Para rodar esse projeto você ai precisar de uma chave de api do [TMDB](https://www.themoviedb.org/), para conseguir uma basta se cadastrar e gerar uma chave nas configurações da conta, após isso, basta preencher o arquivo "/src/variables.ts.example" com as suas informações como a seguir, altere apenas o "api_key" (esse que está aí é fictício):
```
export const api_key = '81234213h234234j432a4ad0c256c620d'
export const api_address = 'https://api.themoviedb.org'
```

Após o correto preenchimento, basta renomear o arquivo para "variables.ts", então rodar os comandos básicos do react na raiz do projeto para criar o ambiente de desenvolvimento, você irá precisar do npm ou yarn instalado no seu computador para isso, os comandos são:

```yarn``` e, após instalar todas as dependências, ```yarn start```.

Com as variáveis setadas corretamente, seu ambiente de desenvolvimento deve estar pronto e o app deve abrir automaticamente no seu navegador de internet, espero que goste assim como eu gostei de desenvolver este app. :tada: