# Currency Converter Application

This is a web application built using React, TypeScript, Vite, and Tailwind CSS that allows users to convert currencies using real-time exchange rates provided by the ExchangeRatesAPI. The application provides the following features:

- Convert an amount from one currency to another
- List available currencies for both the source and target currency
- Change the date for which the currency conversion rates are applied

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/aswinprasad/EximPe.git
   ```

2. Navigate to the project directory:

   ```
   cd EximPe
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Usage

1. Start the development server:

   ```
   npm run dev
   ```

2. Open your browser and visit `http://localhost:5173/EximPe/` to access the application.

3. Select the source and target currencies from the dropdown menus.

4. Enter the amount you want to convert in the input field.

5. Choose the date for which you want to apply the currency conversion rates.

6. The converted amount will be displayed based on the selected currencies and date.

## Deployment

The application is deployed using GitHub Pages. You can access the live version of the application at:

[https://aswinprasad.github.io/EximPe/](https://aswinprasad.github.io/EximPe/)

## Technologies Used

- React: A JavaScript library for building user interfaces
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript
- Vite: A fast build tool and development server for modern web applications
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs
- ExchangeRatesAPI: An API that provides exchange rates and currency data

## API

The application utilizes the ExchangeRatesAPI to fetch exchange rates and currency data. The API endpoint used is:

[https://www.exchangerate-api.com/](https://www.exchangerate-api.com/)
