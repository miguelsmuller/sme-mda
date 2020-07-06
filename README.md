# **Material Didático de Apoio**
> Plataforma mobile desenvolvida com Ionic + Angular + Firebase para a Secretaria Municipal de Educação de Rio Claro com intuito de disponibilizar PDF's com conteúdo didático de apoio durante o período de isolamento social causado pela pandemia do COVID-19.

**Versão Estável:** 2.2  
**Licensa:** Proprietário - Usu Privado  
Todos os direitos reservados.  
É estritamente proibida a cópia não autorizada de qualquer arquivo deste projeto, por qualquer meio.  


___


### [Desenvolvimento e Operação](#desenvolvimento-e-operação-1)  
* [Angular Framework](#angular-framework)  
* [Ionic Framerwork](#ionic-framework)  
* [Usando o projeto localmente](#usando-o-projeto-localmente)
* [Git Workflow](#git-workflow)  
* [Enviado atualizações](#enviado-atualizações)  
* [Precauções de contribuição](#precauções-de-contribuição)
* [Deploy](#deploy)  
### [Changelog](#changelog-1)  


___


# **Desenvolvimento e Operação**
## **Angular Framework**
 [**`Angular`**](https://angular.io/) é uma plataforma e framework para construção da interface de aplicações usando HTML, CSS e, principalmente, JavaScript, criada pelos desenvolvedores da Google.  
Ele possui alguns elementos básicos que tornam essa construção interessante.  
Dentre os principais, podemos destacar os componentes, templates, diretivas, roteamento, módulos, serviços, injeção de dependências e ferramentas de infraestrutura que automatizam tarefas, como a de executar os testes unitários de uma aplicação.  

- **Angular** - *Version: 9.0*


## **Ionic Framework**
 [**`Ionic`**](https://ionicframework.com/) é um Framework Open Source gratuito sobre a licença MIT para desenvolvimento de aplicações mobile híbridas.  
Aplicações híbridas são aplicativos móveis construídos de maneira alternativa a aplicações nativa. São construídos, geralmente, utilizando HTML+CSS+JavaScript, desta maneira se tornaram extremamente populares, pois permite o desenvolvimento multiplataforma, utilizando o mesmo HTML para diferentes sistemas operacionais.

- **Ionic** - *Version: 5.0*


## **Usando o projeto localmente**
- **Rodando localmente**  
```shell
ionic serve --lab --external
```  
- A flag `--lab` permite a vizualização multiplataforma no navegador
- A flag `--external` é para que a aplicação esteja disponivel para acesso dentro da rede internal



## **Git Workflow**  
Esse fluxo de trabalho usa duas branchs principais para registrar o histórico do projeto. O branch **`master`** armazena o histórico oficial de releases, e o branch **`develop`** serve como um ramo de integração de recursos.

O branch **`master`** é o branch que roda no ambiente de produção. Todos os commits no branch **`master`** devem possuir um número de versão.

Cada novo recurso deve residir em sua própria branch e devem partir do branch **`develop`**. Quando um recurso é concluído, ele é mesclado novamente no **`develop`**. Os recursos nunca devem  interagir diretamente com o mestre.

O branch **`develop`** é o branch que roda no ambiente de teste. Ele armazena as últimas funcionalidades incluídas no projetos e que ainda não estão aptas a entrarem no branch **`master`**.

- **Rebase do branch develop**  
```shell
git rebase -i HEAD~N
```

- **Recriação do branch develop**  
```shell
// Delete localmente
git branch -d develop

// Delete remotamente
git push origin --delete develop

git checkout -b develop
```



## **Enviado atualizações**
1. [Clone o repositório!](https://help.github.com/articles/fork-a-repo/)
2. [Sincronize](https://help.github.com/articles/syncing-a-fork/) seu fork com a última versão
3. Crie uma branch para sua funcionalidade: `git checkout -b feature-123`
4. Commit suas alterações: `git commit -m 'Commit message'`
5. Envie as alterações pra sua branch: `git push origin feature-123`
6. [Envie sua pull request](https://help.github.com/articles/using-pull-requests/)


## **Precauções de contribuição**  
Antes de enviar sua colaboração verifique seu código e as conveções adotadas no projeto e tome as seguintes providências:  

- **Sempre verifique a branch que está sendo usada**  
```shell
git status
```

- **Faça uma atualização prévia do seu chechout**  
```shell
git pull
```

- **Veja as diferenças antes de commitar**  
```shell
git diff --cached
```

- **Não commite antes de rodar o projeto localmente**
- **Veja as mudanças implementadas sendo executadas**  
- **E principalmente tenha certeza que essas alterações funcionam**  
- **[Comandos úteis do git](https://gist.github.com/leocomelli/2545add34e4fec21ec16)**




## **Deploy**
O projeto utiliza o próprio firebase através de sua ferramenta de linha comando. Antes de fazer o deploy é necessário fazer o build do projeto.

```shell
ionic build     "build": "ng build --prod --aot --build-optimizer --vendor-chunk --source-map=false"  
```

```shell
firebase deploy
```


___


# **Changelog**  
= **2.2** - 07/07/2020  
Mensagem de informação no limite da API do FirebaseStorage, Inclusão de PushNotifications e Envio de exceções para o GoogleAnalytics

= **2.1** - 03/07/2020  
Melhorias estéticas para desktop, correção de ortografia e Inserção de EventTracking do GoogleAnalytics

= **2.0** - 01/07/2020  
Atualização com melhorias de desempenho e funcionalidades  

= **1.1** - 28/04/2020  
Arquivos desnecessários excluídos  

= **1.0** - 28/04/2020  
Projeto Inicial  
