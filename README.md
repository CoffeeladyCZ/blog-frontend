# blog-frontend

Blogging platform for adding and editing articles.

**Techstack:**

- React, React Router, Redux,
- MUI, Styled components,
- Axios, i18next,
- Jest, testing-library/react, Cypress.

The production version is in the `release/0.3.0` branch. This version is also viewable on Vercel.

Branch `development` is for development only and may not always be fully functional.

You need to create an `.env` file with:
- `VITE_APP_API_URL` (contains the path to the API)
- `VITE_APP_X_API_KEY` (generated tenant)

**Functionality:**

After logging in, the user can edit and delete his articles. After logging out, only view. 
After logging in, the user will receive an access_token that is valid for 1 hour, after which the user will be automatically logged out. So far there is no implemented the logic of keeping the article broken down.
The blog offers a choice of Czech and English language (the language of the articles remains unchanged).

**ROADMAPA:**

- Ability to add comments. - **BE is not functional.**
- Vote about comments.
- Improvements to the editing window.
- Add pagination to My article table.
- It would be good to create more unit tests.

All planned issues are submitted on github.
