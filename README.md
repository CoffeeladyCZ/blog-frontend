# blog-frontend

Blogging platform for adding and editing articles.

**Techstack:**

- React,
- MUI, Styled component,
- Axios, Jest, testing-library/react, Cypress.

The production version is in the `release/1.0` branch. This version is also viewable on Vercel.

You need to create an `.env` file with:
- `REACT_APP_API_URL` (contains the path to the API)
- `REACT_APP_X_API_KEY` (generated tenant)

**Functionality:**

After logging in, the user can edit and delete his articles. After logging out, only view. 
After logging in, the user will receive an access_token that is valid for 1 hour, after which the user will be automatically logged out. So far there is no implemented the logic of keeping the article broken down.

**Planned user enhancements:**

- Ability to add comments (API currently allows it just not implemented on FE).
- Improvements to the editing window.
- Add pagination to My article table.
- It would be good to create more unit tests.
- Display all texts using the i18next library.

All planned issues are submitted on github.

Credentials:

- marcela@test.cz
- testpassword
