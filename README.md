# OWASP Juice Shop - Automated Test Assignment

This repository contains automated UI tests for the [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) application. The framework is built using **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern for maintainability, reusability, and clean code.

## 🛠️ Tech Stack
- **Testing Framework:** Playwright
- **Language:** TypeScript
- **Design Pattern:** Page Object Model (POM) & Data-Driven Testing
- **Code Quality:** ESLint & Prettier

## 📂 Project Structure
The project is structured to separate test data, page actions, and test scenarios:

juice-shop-tests/
├── data/                  # Centralized test data (Base User, Addresses)
│   └── test-data.ts       
├── pages/                 # Page Object Model (POM) classes
│   ├── checkout.ts        # Locators and actions for Checkout flow
│   ├── home.ts            # Locators and actions for Home page & Search
│   ├── login.ts           # Locators and actions for Login page
│   └── register.ts        # Locators and actions for User Registration
├── tests/                 # Test specifications
│   ├── Assignment01-02.spec.ts # Scenarios 1 & 2: Add to basket and Checkout flow
│   └── Assignment03.spec.ts    # Scenario 3: Search functionality verification
├── .eslintrc.json         # Linter configuration
├── .prettierrc.json       # Code formatter configuration
└── playwright.config.ts   # Playwright configuration (BaseURL, Browsers)

## 🚀 Prerequisites & Local Server Setup
Before running the tests, ensure you have the following installed:
1. **Node.js** (v18 or higher)
2. A running instance of OWASP Juice Shop. By default, these tests are configured to run against a local instance to prevent flakiness.

**Start the OWASP Juice Shop Locally (Choose one):**
- Using Node.js: Clone the repository, run `npm install`, then `npm start`.
- Using Docker: Run `docker run --rm -p 3000:3000 bkimminich/juice-shop`

Ensure the application is accessible at http://localhost:3000

## ⚙️ Installation & Setup
1. Clone this repository to your local machine.
2. Open the terminal and navigate to the project root directory.
3. Install the required dependencies:
   npm install

4. Install Playwright browsers:
   npx playwright install

## ✨ Highlight: Auto-Registration Flow
**No manual user creation is required!** To ensure test stability and complete independence, `Assignment01-02.spec.ts` utilizes a `test.beforeAll` hook to dynamically create a fresh, unique user account via the UI before executing the purchase flow scenarios.

## 🧪 Running the Tests

**Run all tests (Headless mode):**
npx playwright test

**Run all tests with UI (Headed mode):**
npx playwright test --headed

**Run a specific test file:**
npx playwright test tests/Assignment01-02.spec.ts --headed
npx playwright test tests/Assignment03.spec.ts --headed

**View Test Report:**
After running the tests, you can view the detailed HTML report:
npx playwright show-report

## 🧹 Code Quality (Linting & Formatting)
To ensure code quality and consistency, run the following commands:

**Run ESLint:**
npm run lint

**Run Prettier (Auto-format code):**
npm run format