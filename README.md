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
├── data/                  # Centralized test data (User accounts, Addresses)
│   └── test-data.ts       
├── pages/                 # Page Object Model (POM) classes
│   ├── checkout.ts        # Locators and actions for Checkout flow
│   ├── home.ts            # Locators and actions for Home page & Search
│   └── login.ts           # Locators and actions for Login page
├── tests/                 # Test specifications
│   ├── Assignment01-02.ts # Scenarios 1 & 2: Add to basket and Checkout flow
│   └── Assignment03.ts    # Scenario 3: Search functionality verification
├── .eslintrc.json         # Linter configuration
├── .prettierrc.json       # Code formatter configuration
└── playwright.config.ts   # Playwright configuration (BaseURL, Browsers)

## 🚀 Prerequisites
Before running the tests, ensure you have the following installed:
1. **Node.js** (v18 or higher)
2. A running instance of OWASP Juice Shop (Currently configured to `https://juice-shop.herokuapp.com` in `playwright.config.ts`).

## ⚙️ Installation & Setup
1. Clone this repository to your local machine.
2. Open the terminal and navigate to the project root directory.
3. Install the required dependencies:
   npm install

4. Install Playwright browsers:
   npx playwright install

## ⚠️ Important Note Before Running
**For Scenarios 1 & 2 (`Assignment01-02.ts`) to pass, a valid registered user is required.**
Please update the test credentials in the `data/test-data.ts` file with an existing account on your Juice Shop instance:

export const user = {
  email: 'YOUR_REGISTERED_EMAIL',
  password: 'YOUR_PASSWORD'
};

## 🧪 Running the Tests

**Run all tests (Headless mode):**
npx playwright test

**Run all tests with UI (Headed mode):**
npx playwright test --headed

**Run a specific test file:**
npx playwright test tests/Assignment01-02.ts --headed
npx playwright test tests/Assignment03.ts --headed

**View Test Report:**
After running the tests, you can view the detailed HTML report:
npx playwright show-report

## 🧹 Code Quality (Linting & Formatting)
To ensure code quality and consistency, run the following commands:

**Run ESLint:**
npm run lint

**Run Prettier (Auto-format code):**
npm run format