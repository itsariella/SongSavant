# Song Savant

This is actually the repository for both frontend and backend of Song-Savant.
(The project was originally in another repository, but I had to reformat for production and the entire project ended up in this repo).
The frontend utilizes create-react-app and Spotify API, and the backend uses NodeJS and Express. We use npm as our package manager.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Download Node (https://nodejs.org/en/download/) and Git (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installing and running locally

A step by step series of examples that tell you how to get a development env running

Open terminal, clone repo in desired directory, such as desktop (example below)

```
cd desktop
git clone https://github.com/itsariella/song-savant-frontend.git
```
Install dependencies in root folder

```
cd song-savant-frontend
npm install
```

Navigate to react-ui folder, install dependencies, start client side using npm

```
cd react-ui
npm install
npm start

```
Open another terminal, navigate to server folder, install dependencies, start server using npm

```
cd desktop
cd song-savant-frontend
export SPOTIFY_CLIENT_ID=YourClientIdHere
export SPOTIFY_CLIENT_SECRET=YourClientSecretHere
cd server
export SPOTIFY_CLIENT_ID=YourClientIdHere
export SPOTIFY_CLIENT_SECRET=YourClientSecretHere
npm install
npm start

```

## Deployment

For production, we use heroku. If you are the owner/a collaborator of this project, set up the Heroku CLI to the heroku repo. Live project can be found at 
https://song-savant.herokuapp.com/

### Pushing to Heroku from a non-master branch
```
git push heroku branch-name:master

```

## Authors

* **Ariella Navarro** - *Frontend/Backend* - [Ariella Navarro](https://github.com/itsariella)
* **Serena So** - *Game design/Graphics contributor* - [Serena So](https://github.com/soitsrena)


## Acknowledgments

* Inspiration from Jonny Kalambay's medium article, helping us get started with it all (https://medium.com/@jonnykalambay/now-playing-using-spotifys-awesome-api-with-react-7db8173a7b13)
* Spotify API tutorials by DevTips on Youtube (https://www.youtube.com/channel/UCyIe-61Y8C4_o-zZCtO4ETQ)
* The following repo, for deploying subdirectories onto Heroku (https://github.com/mars/heroku-cra-node)

