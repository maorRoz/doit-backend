# Stack(and important libs worth mentioning)

* TypeScript
* Jest
* Faker

# Note

You can ignore the `src/db/createUser.ts` and `src/db/createUserTable.ts`. they were just added for the development process. I'm assuming that you use your own implementation/table to populate the users table.

# Run

1. execute `yarn install`
2. execute `yarn start`/`yarn dev`

# Test

1. execute `yarn install`
2. execute `yarn test`

# Assumptions

- I've assumed that the backend task may reside in a separate repo. The frontend task can be found in another repo
- I've assumed that I have the freedom to choose whatever testing library I'm feeling most comfortable with, and therefore I've decided using Jest instead of Mocha+Sinon
- I've assumed that there is no expectation to any kind of ORM or remote usage of DynamoDB(I've used local installation)
- I've assumed that I don't have to think of any more tests except the one that you mentioned on the instructions
- I've assumed that if a user doesn't have an age, the age average should return NaN
- I've assumed that if a user doesn't exist, we still need to return undefined to represent it
- I've assumed that the fetching times of each user from the DB should reside in a different array



# Final words
Hopefully, you'll have tons of fun checking my work as it was for me during the implementation process :)
Let me know if you have any questions