# E-Store Manager

<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png" alt="Typescript" width="80" height="80">
    <img alt="Next JS" src="https://cdn.worldvectorlogo.com/logos/next-js.svg" width="80" height="80">
    <img alt="React Query" src="https://miro.medium.com/v2/resize:fit:1400/1*elhu-42TzQEdsFjKDbQhhA.png" width="80" height="80">
    <img alt="Ant Design" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDFMkgc-3Ic_ulT8KOXJCkvQeLLUlgo9TpOg&s" width="80" height="80">
    <img alt="Tailwind" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png" width="80" height="80">
</div>

## Overview

**E-Store Manager** is a modern E-commerce Dashboard Application for administrators to manage products and carts efficiently. The app provides a user-friendly interface for performing CRUD (Create, Read, Update, Delete) operations on both products and carts.

> **Note:** All data operations are performed on the client side using [DummyJSON](https://dummyjson.com/) as a mock API. No real backend or persistent storage is used.

### Key Features

- **Products Management**

  - View all products in table and chart formats
  - Create, update, and delete products (client-side, via DummyJSON)
  - Filter products by category, brand, and price range (with auto-saving of filters)
  - Search products
  - Pagination for product listings

- **Carts Management**
  - View all carts in a table
  - View cart details
  - Create, update, and delete carts (client-side, via DummyJSON)
  - Pagination for carts

### Tech Stack

- **TypeScript**
- **Next.js**
- **TanStack Query (React Query)**
- **Ant Design**
- **Tailwind CSS**
- **Shadcn UI**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v10 or higher

### Installation

```sh
cd E-Store-Manager
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## Background

This project was originally built with JavaScript as part of a technical test. It was later rewritten in TypeScript and enhanced with additional libraries and features for better maintainability and user experience.

## Live Demo

[faiznurfaza-estore.vercel.app](https://faiznurfaza-estore.vercel.app/)

---

Feel free to contribute or open issues for suggestions and improvements!
