# Prime Client - DRAW LEAGUE

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account. Make the project `PUBLIC`!

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Virtual_Studio_Code](https://code.visualstudio.com/Download)
- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [Nodemon](https://nodemon.io)

## Built with

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>
<!-- https://socket.io/docs/v4/ -->

## Create Database and Table

DRAW LEAGUE DATABASE
    database-name: draw_league
    created-by: Joshua Tree Cohort PDA
    date: 9/10/24
*/
--TABLE CREATION:
CREATE TABLE "user" (
 "id" SERIAL PRIMARY KEY,
 "username" VARCHAR (80) UNIQUE NOT NULL,
 "password" VARCHAR (1000) NOT NULL,
 "user_role" VARCHAR (50) NOT NULL DEFAULT 'ref',
 "ref_job" VARCHAR ,
 "ref_fact" VARCHAR ,
 "ref_img" VARCHAR ,
 "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
 "full_name" VARCHAR,
 "art_medium" VARCHAR,
"phone_number" VARCHAR
 );
 CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "theme" VARCHAR(500),
    "prompt_one" VARCHAR(500),
    "prompt_two" VARCHAR(500),
    "prompt_three" VARCHAR(500),
    "event_date" DATE NOT NULL,
    "event_code" VARCHAR NOT NULL,
    "location_name" VARCHAR (500),
    "location_address" VARCHAR (500),
    "judge_name" VARCHAR,
    "judge_job" VARCHAR,
    "judge_like" VARCHAR,
    "judge_know" VARCHAR,
    "judge_img" VARCHAR,
    "judge_code" VARCHAR NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "created_by" INT REFERENCES "user"
);
CREATE TABLE "user_event" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "event_id" INT REFERENCES "event" ON DELETE CASCADE,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "team" (
    "id" SERIAL PRIMARY KEY,
    "event_id" INT REFERENCES "event",
    "team_name" VARCHAR UNIQUE NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "drawing" (
    "id" SERIAL PRIMARY KEY,
    "team_id" INT REFERENCES "team",
    "drawing_url" VARCHAR,
    "favorite_drawing" BOOLEAN DEFAULT false,
    "score" INT,
    "round" INT,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
--SEED DATA
/*******************MAKE SURE TO RUN INSERT STATEMENTS IN THIS ORDER******************/
INSERT INTO "user" (username, password, user_role, ref_job, ref_fact, ref_img)
VALUES ('admiralGreer', 'fish', 'ref', 'fisherman', 'My real name is Ishmael', 'https://plus.unsplash.com/premium_photo-1676511249826-2adf52caabee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
INSERT INTO "event" (theme, prompt_one, prompt_two, prompt_three, event_date, event_code, location_name, location_address, judge_name, judge_job, judge_like, judge_know, judge_img, judge_code, created_by)
VALUES ('Olympics', 'Opening Ceremonies', 'Sporting Event', 'Medals', '2024-9-25', '1234', 'Bauhaus', '1315 Tyler St NE, Minneapolis, MN 55413', 'Steve Perry', 'Singer', 'Journies', 'Songwriting', 'https://images.unsplash.com/photo-1536320439102-e28493dade27?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', '4321', 1);
INSERT INTO "team" (team_name, event_id)
VALUES ('Pencil Pushers', 1);
INSERT INTO "drawing" (team_id, drawing_url, score, round)
VALUES (1, 'https://images.unsplash.com/photo-1724666696560-aec1b5732c92?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',85, 1);

## Development Setup Instructions

- Run `npm install`.
    - Be sure to take stock of `package.json` to see which dependencies you'll need to add.
- Create a `.env` file at the root of the project and paste this line into the file:

```plaintext
SERVER_SESSION_SECRET=eightcaracterlongpassword
```

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm run server` to start the server.
- Run `npm run client` to start the client.
- Navigate to `localhost:5173`.

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Run `npm run server` to start the server.
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/users/register` registers a new user, see body to change username/password.
   2. `POST /api/users/login` will login a user, see body to change username/password.
   3. `GET /api/users` will get user information, by default it's not very much.

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using opening up the [Postgres.app](https://postgresapp.com), or if using [Homebrew](https://brew.sh) you can use the command `brew services start postgresql`.
- Run `npm start`.
- Navigate to `localhost:5173`.

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application.
- `public/` contains static assets for the client-side.
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site.
- `server/` contains the Express App.

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project.
1. Link the Heroku project to the project GitHub Repo.
1. Create an Heroku Postgres database.
1. Connect to the Heroku Postgres database from Postico.
1. Create the necessary tables.
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security.
1. In the deploy section, select manual deploy.

## Cloudinary 

1. Create Cloudinary account.
2. Add an environment (.env file) variable for `VITE_CLOUD_NAME` with cloud name as as a string.
3. Add an environment (.env file) variable for `VITE_PRESET_NAME` with preset name as as a string.

