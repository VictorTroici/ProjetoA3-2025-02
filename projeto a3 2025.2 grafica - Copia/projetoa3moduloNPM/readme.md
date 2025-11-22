

Aqui iremos brincar de construir um módulo NodeJs público com o objetivo de todos poderem ter seus próprios módulos publicados e acrescentar visibilidade aos seus projetos.

# Módulo NPM nodejs

No **Node.js**, um módulo é um conjunto de funções e objetos Javascript que podem ser utilizados por outros aplicativos. Definir um trecho de código como módulo diz mais sobre sua funcionalidade do que sobre sua estrutura — qualquer arquivo Javascript pode ser considerado um módulo se suas funções e dados forem projetados para uso externo.

Os módulos permitem reutilizar funcionalidades em diferentes programas, facilitando o desenvolvimento de aplicativos modulares e escaláveis. Além disso, possibilitam o compartilhamento de código com outros desenvolvedores. Criar módulos que exportam funções e dados úteis é uma habilidade essencial para qualquer desenvolvedor **Node.js**, pois todos os pacotes disponíveis no **npm** são, na verdade, módulos organizados e compartilhados.

Vamos aprender a criar um módulo **Node.js** usando, apenas uma ilustração, o exemplo de uma versão simplificada da biblioteca que desenvolvemos para o projeto. A ideia é que outros desenvolvedores possam utilizar em seus projetos nosso *'super modulo'* de geração de SVGs. 


### Criando uma conta no NPM
Para que seja possível publicar nosso módulo/pacote, precisamos criar uma conta no [npmjs](https://www.npmjs.com/). 

### Criando o projeto do nosso módulo

1. Criar um projeto para nosso módulo chamado, por exemplo, "mylib". 
    **IMPORTANTE:** Será necessário que seu projeto esteja sincronizado com um repositório do seu **github**. Uma forma simples de fazer isso é criar o repositório e depois cloná-lo em sua máquina. 
2. Abrir a pasta do projeto no VSCode.
3. Abrir terminal do VSCODE (verifique se o caminho no terminal está correto)



### Fazendo o login pelo terminal para publicar no **npm**  

Para que você possa publicar o seu módulo, é necessário estar logado no npm. Para logar, digite no terminal e após passe as suas credenciais da conta criada no npm.

~~~shell
npm login
~~~ 

Para testar se vc está logado:

~~~shell
npm whoami
~~~ 

### Inicializando o projeto
**IMPORTANTE**
> Como diversos alunos estarão seguindo os mesmos passos deste checkpoint, será muito provável que o nome do módulo **mylib** já tenha sido criado e o npm não deixará que você dê este nome para seu módulo. Assim, será melhor criar o módulo contendo o nome do seu usuário do npm. Isto é o que chamamos de nomes com escopo (namespace para pacotes).

> Um escopo permite que você crie um pacote com o mesmo nome de um pacote criado por outro usuário ou organização sem conflito.

Para inicializarmos nosso projeto usando seu nome de usuário como escopo do projeto:

~~~shell
npm init --scope=@my-username
~~~ 

trocando ```my-username``` com seu nome de usuário e depois responda aos prompts para gerar um arquivo ```package.json``` informando o nome do projeto como ```mylib```. Agora quando publicarmos, nosso módulo poderá ser encontrado por meio do nome: ```@my-username/mylib```

##### **Lembre-se**: 
Após criar o ```package.json```, adicione a linha abaixo que configura os módulos a usar import/export via ESM.

~~~js
"type": "module",
~~~

 
### Criando o Javascript do módulo

Agora vamos criar nosso arquivo ```index.js``` que exporta o objeto ```lib```:

~~~js
import lib from "./mylib.js"

// String contendo SVG criado
export default lib
~~~

O objeto ```lib``` contém um método que gera um SVG a partir de uma chave (string).


#### Testando sua lib ```lib```

Crie um arquivo ```teste.js``` que importa o objeto ```lib``` e imprime seu resultado:

~~~js
import lib from "./mylib.js"

// String contendo SVG criado
let svgText = lib.getSVG("ana123")
console.log(svgText);
~~~

Execute seu teste:

~~~shell
node ./teste.js
~~~ 

### Publicando o módulo 

Por padrão, pacotes com escopo são publicados com visibilidade privada. Para publicar um pacote com escopo com visibilidade pública, execute o comando:

~~~shell
npm publish --access public
~~~ 

Se tudo correr bem, seu módulo estará publicado. Você poderá verificar no site do npm acessando com sua conta.   

**IMPORTANTE**
> Por padrão, toda publicação irá verificar a versão indicada no atributo ```version``` do arquivo ```package.json```. Caso seja a mesma, irá ocorrer erro. Sempre que fizer uma nova publicação, altere o valor da versão. 

### Testando seu módulo público

Crie um projeto novo. Inicialize seu projeto com ```npm init -y```, altere o ```package.json``` adicionando a linha ```"type": "module"```, e tente instalar seu módulo (pacote):

~~~shell
npm install @my-username/mylib
~~~ 

trocando ```my-username``` com seu nome de usuário.

Crie e execute um javascript com o trecho:

~~~js
import lib from "@my-username/mylib";

// String contendo SVG criado
let svgText = lib.getSVG("ana123")
console.log(svgText);
~~~



