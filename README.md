# Productly — Product Catalog Dashboard

Productly is a responsive product catalog dashboard built with React and TypeScript. This project demonstrates frontend development skills through reusable components, REST API integration, data filtering, loading and error states, and a simulated authentication flow.

Product data is retrieved from the [DummyJSON API](https://dummyjson.com/).

## Features

- **Simulated Login** — A simple frontend login flow with a protected dashboard.
- **Dashboard** — Displays product statistics, available categories, and average ratings.
- **Product Catalog** — Retrieves product data from DummyJSON.
- **Search** — Search products by name.
- **Category Filter** — Filter products by category.
- **Product Details** — View product information in a detail modal.
- **Pagination** — Navigate through the filtered product catalog.
- **Loading, Error, and Empty States** — Provides feedback while loading data, when requests fail, or when no products match the filters.
- **Responsive Layout** — Supports desktop and mobile screens.
- **Reusable Components** — Separates product cards, filters, loading indicators, error states, and other UI elements.

## Tech Stack

- React
- TypeScript
- Vite
- Axios
- React Router
- Lucide React
- CSS
- DummyJSON REST API

## Requirements

Make sure the following tools are installed:

- Node.js
- npm
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/productly.git
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Open the project directory

```bash
cd productly
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Build for production

```bash
npm run build
```

## Demo Login

Use the following credentials to access the application:

- **Email:** `admin@productly.demo`
- **Password:** `Productly123!`

> This is a simulated frontend authentication flow for demonstration purposes. It does not provide real backend authentication or production-grade security.

## API

Product data is provided by DummyJSON.

- API base URL: `https://dummyjson.com`
- Products endpoint: `/products`
- Categories endpoint: `/products/categories`

The application retrieves data from the API and processes search and category filtering on the client side.

## Project Structure

The project separates pages, reusable components, API services, and data types to improve maintainability.

```text
src/
├── components/
│   ├── common/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   └── Loading.tsx
│   └── products/
│       ├── ProductCard.tsx
│       ├── ProductDetailModal.tsx
│       ├── ProductFilters.tsx
│       └── ProductGrid.tsx
├── pages/
│   ├── DashboardPage.tsx
│   └── ProductsPage.tsx
├── services/
│   └── productService.ts
├── types/
│   └── product.ts
├── App.tsx
└── index.css
```

The structure above describes the main application files. Other files required by the existing Vite and routing setup may also be present.

## Development Notes

- API calls are separated into a service layer.
- TypeScript interfaces define the expected product data structure.
- Reusable components keep the UI consistent.
- Loading, error, and empty states improve the user experience.
- Product search and category filtering are handled on the frontend.
- Authentication is simulated and is not intended for production use.

## License

This project was created for educational and technical assessment purposes.
