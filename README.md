# **Educational Sharing Activities- COVID-19**
## **OVERVIEW**
Platform for sharing educational activities (pdfs) for students in the [**Municipal Education Network of Rio Claro / Rio de Janeiro**](https://rioclaro.rj.gov.br/) during the period of social isolation caused by the pandemic of COVID-19 in the year 2020. The Project was developed with **[Angular](https://angular.io/)** + **[Ionic](https://ionicframework.com/)** + **[Firebase](https://firebase.com/)**.

The project was in production during the period of the year 2020.

- **Version:** 2.7 
- **License:** Proprietary - Private Use - All rights reserved.
- **Available for consultation and study only** 

[**`Angular`**](https://angular.io/) is a platform and framework for building the application interface using HTML, CSS and, mainly, JavaScript, created by Google's developers. It has some basic elements that make this construction interesting. Among the main ones, we can highlight the components, templates, directives, routing, modules, services, dependency injection and infrastructure tools that automate tasks, such as executing the unit tests of an application.  

[**`Ionic`**](https://ionicframework.com/) is a free Open Source Framework under the MIT license for the development of hybrid mobile applications. Hybrid applications are mobile applications built in an alternative way to native applications. They are built, generally, using HTML + CSS + JavaScript, in this way they have become extremely popular, as it allows multiplatform development, using the same HTML for different operating systems. 

[**`Firebase`**](https://console.firebase.google.com/) is a toolset platform developed by Google that helps build, improve, and grow your app. The tools it offers cover a large part of the services that developers would normally have to build on their own. This includes things like analysis, authentication, databases, configuration, file storage, push messages and the list goes on. The services are hosted in the cloud and have great scheduling flexibility. The following services offered by Firebase were used in this project: **Authentication**, **Database with Cloud Firestore**, **Storage**, **Hosting**, **Cloud Messaging**
  
<br>

## **CONTENT**
* [Project Requirements](#️project-requirements)
* [Running Locally](#️running-locally)
* [Project Workflow](#project-workflow)   
* [Contributing](#contributing)
* [Deploy](#deploy)    
* [Firebase](#firebase)    
* [Changelog](#changelog)  

<br>

# **DEVELOPMENT AND OPERATION**  
## **PROJECT REQUIREMENTS**  
### **INSTALL ALL DEPENDENCIES**
Make sure that you also have **[NodeJS](https://nodejs.org/)** and **[NPM](https://www.npmjs.com/)** installed on your computer.
- **`$ node --version`** 
- **`$ npm --version`** 

Also make sure you have **Angular CLI** and **Ionic CLI** installed globally on your machine.  
- **`$ npm install -g @angular/cli @ionic/cli`**  

Install dependencies of project with:  
- **`$ npm install`**

<br>

### **ENVIRONMENT FILES**  
It is necessary for the project to configure the firebase and mailgun through the file **`./src/environments/environment.prod.ts`** and **`./src/environments/environment.ts`**.

An example of the file can be found in the respective directory.

<br>

### **MESSAGING CONFIGURATION**  
Firebase Messaging configuration **`./src/firebase-messaging-sw.js`**

```shell
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: '',
  projectId: '',
  messagingSenderId: '',
  appId: '',
});

const messaging = firebase.messaging();
```

<br>

## **RUNNING LOCALLY**  
Run te command  
**`$ ionic serve --lab --external`**
- The **`--lab`** flag allows multiplatform viewing in the browser
- The **`--external`** flag is for the application to be available for access within the internal network 

<br>

## **PROJECT WORKFLOW**  
This workflow uses two main branches to record the project's history. The **`master`** branch stores the official release history, and the **`develop`** branch serves as a resource integration branch.

The branch **`master`** is the branch that runs in the production environment. All commits on the **`master`** branch must have a version number.

Each new resource must reside on its own branch and must start from the **`develop`** branch. When a feature is completed, it is merged back into **`develop`**. Resources should never interact directly with the master.

The branch **`develop`** is the branch that runs in the test environment. It stores the latest features included in the projects and which are not yet able to enter the branch **`master`**. 

<br>

## **CONTRIBUTING**  
### **REPORTING PROBLEMS**  
To report an issue, please [create a new pull request](https://github.com/miguelsmuller/sme-mda/pulls).  

### **SENDING CODE**  
Before sending your collaboration, check your code and the conventions adopted in the project and take the following steps:

- Always check the branch used: **`$ git status`**
- Update your branch: **`$ git pull`**
- Rebase your branch: **`$ git rebase -i HEAD~N`**
- See the differences before committing: **`$ git diff --cached`**
- Delete locally develop branch: **`$ git branch -d develop`**
- Delete remotely develop branch: **`$ git push origin --delete develop`**
- Recreate develop branch: **`$ git checkout -b develop`**

### **IMPORTANT INFORMATION**  
- Do not commit before running the project locally
- See the changes implemented being carried out
- And especially make sure that these changes work
- Useful git commands [here](https://gist.github.com/leocomelli/2545add34e4fec21ec16)  

<br>

## **DEPLOY**
Before deploying it is necessary to build the project.<br>
**`$ ionic build`**
<br>or
<br>
**`$ ng build --prod --aot --build-optimizer --vendor-chunk --source-map=false`**


The project uses firebase itself through its command line tool.<br>
**`$ firebase deploy`**

<br>

## **FIREBASE**
In order to have access to [registered users on Firebase](https://firebase.google.com/docs/cli/auth#CSV) a different procedure is required.<br>
**`$ firebase auth:export exportation.csv`**

<br>

## **CHANGELOG**  
= **2.7** - 06/05/2021  
Fixação das versões das dependências e melhora do arquivo de instrução.

= **2.6** - 14/11/2020  
Ajustes para permitir exibição pública do projeto no GitHub

= **2.5** - 06/11/2020  
Atualização com Tour Virtual Parque Arqueologio
Atualização de evento do Analytics
Ajustes finos

= **2.4** - 27/07/2020  
Listagem de Usuários
Atualização da FAQ
Ajustes finos

= **2.3** - 15/07/2020  
Atualização de evento do Analytics
Utilização do Whatsapp na página de contato

= **2.2** - 07/07/2020  
Mensagem de informação no limite da API do FirebaseStorage
Inclusão de PushNotifications
Envio de exceções para o GoogleAnalytics

= **2.1** - 03/07/2020  
Melhorias estéticas para desktop
Correção de ortografia
Inserção de EventTracking do GoogleAnalytics

= **2.0** - 01/07/2020  
Atualização com melhorias de desempenho e funcionalidades  

= **1.1** - 28/04/2020  
Arquivos desnecessários excluídos  

= **1.0** - 28/04/2020  
Projeto Inicial  
