# Github Workflow

Make a new branch, on new branch do the following:

-   git add .
-   git commit -m "message"
-   git push
-   Make a pull request, review and approve pull request (LOOK AT CODE)
-   Then merge to main
-   Checkout back to main
-   git pull
- Update your working branch by switching to that branch and using
    -   git merge main

# Git Stash

1. Git stash to pick up all the changes
2. Git checkout the current local branch
3. Git stash apply to move all the changes to current local branch
4. Git stash drop – delete all the changes

## Create the user in psql using the following command:

-   CREATE USER 'username' WITH PASSWORD 'password' CREATEDB;

## To create the database type in the terminal:

-   npx dotenv sequelize db:create

## To generate the models use:

-   npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

-   npx sequelize-cli model:generate --name Question --attributes ownerId:integer,title:string,description:text

-   npx sequelize-cli model:generate --name Answer --attributes userId:integer,questionId:integer,answer:text

-   npx sequelize-cli model:generate --name Upvote --attributes userId:integer,questionId:integer

## To generate the seed files use:

-   npx dotenv sequelize seed:generate --name demo-user
-   npx dotenv sequelize seed:generate --name questions
-   npx dotenv sequelize seed:generate --name answers

## Sequelize commands for _initial creation_:

-   npx dotenv sequelize db:create
-   npx dotenv sequelize db:migrate
-   npx dotenv sequelize db:seed:all

## Sequelize commands for _resetting the database_:

-   npx dotenv sequelize db:drop
-   npx dotenv sequelize db:create
-   npx dotenv sequelize db:migrate
-   npx dotenv sequelize db:seed:all

## Sequelize commands for _unseeding and reseeding_:

-   npx dotenv sequelize db:seed:undo:all
-   npx dotenv sequelize db:migrate:undo:all
-   npx dotenv sequelize db:migrate
-   npx dotenv sequelize db:seed:all

## Database's custom scripts for the database:

-   "reseed": "npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo && npx
    dotenv sequelize db:
    migrate && npx sequelize db:seed:all",
-   "reset": "npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize
    db:migrate && npx dotenv sequelize db:seed:all",
-   "create": "npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv
    sequelize db:seed:all"

## Associations:

-   **Person** belongsTo **HairColor**
-   **HairColor** hasMany **Person**

**_For a one to many relationship_**:

-   The side with the **_foreignKey_** should use **belongsTo**
-   The other side should use **hasMany**
