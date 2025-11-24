


Módulo que fornece o texto de um svg gerado a partir de chaves


Para baixar esse modulo: 

Rode no terminal os codigos:

npm install @pedroantonioc/moduloexemplo01

crie um arquivo .js e faça a importação do pacote
~~~shell
import lib from "@pedroantonioc/moduloexemplo01";
~~~ 

crie uma variável para armazenar o svg
~~~shell
let imagem = lib.getSVG("pedro");
~~~ 

retorne no console o svg: 
~~~shell
console.log(imagem);
~~~ 
