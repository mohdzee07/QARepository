# Login Test Plan

## Objective
Create a comprehensive regression and functional test plan for the login page at https://rahulshettyacademy.com/client/#/auth/login.

## Application Under Test
- URL: https://rahulshettyacademy.com/client/#/auth/login
- Page title observed: "Let's Shop"
- Primary login elements observed:
  - Email textbox with placeholder: "email@example.com"
  - Password textbox with placeholder: "enter your passsword"
  - Login button
  - Forgot password link
  - Register link

## Scope
### In Scope
- Page load and layout validation
- Empty-field validation
- Invalid credential handling
- Successful login flow
- Navigation to register and password recovery pages
- Basic UI stability and accessibility checks

### Out of Scope
- Payment or checkout flows
- Backend API contract validation beyond login response behavior
- Cross-browser performance benchmarking

## Test Environment
- Browser: Chromium/Playwright
- Base URL: https://rahulshettyacademy.com/client
- Test data:
  - Valid email/password: use a known registered test account
  - Invalid email/password: invalid@example.com / wrongpassword

## Suggested Playwright Locators
- Email field: `page.getByPlaceholder('email@example.com')`
- Password field: `page.getByPlaceholder('enter your passsword')`
- Login button: `page.getByRole('button', { name: 'Login' })`
- Forgot password link: `page.getByRole('link', { name: 'Forgot password?' })`
- Register link: `page.getByRole('link', { name: 'Register' })`

## Test Cases

| ID | Scenario | Steps | Expected Result |
|---|---|---|---|
| TC-01 | Page loads correctly | Open the login URL | Page loads successfully and the login form is visible |
| TC-02 | Login form elements are present | Inspect the page | Email field, password field, login button, forgot password link, and register link are visible |
| TC-03 | Empty form submission | Leave both fields empty and click Login | Appropriate validation message is shown and user is not logged in |
| TC-04 | Empty email only | Enter password only and click Login | Validation message for missing email is shown |
| TC-05 | Empty password only | Enter email only and click Login | Validation message for missing password is shown |
| TC-06 | Invalid credentials | Enter an invalid email/password combination and click Login | Login fails gracefully and an error message is shown |
| TC-07 | Valid credentials | Enter a valid registered account and click Login | User is authenticated and redirected to the authenticated dashboard or expected landing page |
| TC-08 | Forgot password link | Click "Forgot password?" | User is taken to the password reset page |
| TC-09 | Register link | Click "Register" | User is taken to the registration page |
| TC-10 | Password masking | Type into the password field | Password is masked and not displayed in plain text |
| TC-11 | Keyboard accessibility | Use Tab navigation across form controls | Focus moves in a logical order across the form elements |
| TC-12 | Error handling for network failure | Simulate an API/network failure during login | User gets a clear error state and no silent failure |

## Recommended Automation Notes
- Use Playwright assertions such as `expect(page).toHaveURL(...)` and `expect(locator).toBeVisible()`.
- Prefer role-based and placeholder-based locators for maintainability.
- Add explicit waits for UI transitions after login.
- Capture screenshots on failure for easier debugging.

## Example Playwright Skeleton
```js
const { test, expect } = require('@playwright/test');

test('login page smoke test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await expect(page.getByPlaceholder('email@example.com')).toBeVisible();
  await expect(page.getByPlaceholder('enter your passsword')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
```

## Exit Criteria
The login feature can be considered ready when:
- All critical login scenarios pass
- Invalid credentials show clear error handling
- Valid credentials redirect the user successfully
- The form remains usable and accessible
