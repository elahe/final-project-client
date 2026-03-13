# Wearly

## See the App!
https://wearly-rust.vercel.app/

![Wearly Logo](./public/logo.png)

---

## Description

Wearly is an online fashion marketplace where users can browse clothing products, view detailed product pages, and purchase items securely. Creators can also upload and manage their own products on the platform.

#### Client Repository  
https://github.com/elahe/final-project-client

#### Server Repository  
https://github.com/bilelmarzouki/Final-bootCamp-project

---

## Technologies & Libraries Used

- React
- React Router
- Axios
- Vite
- TailwindCSS
- Stripe (Online Payments)
- React Icons
- React Loader Spinner
- ESLint

---

## Backlog Functionalities

Features planned for future development:

- Product search functionality
- Product filtering by category
- User profile page
- Order history
- Product reviews and ratings
- Wishlist feature
- Admin dashboard

---

# Client Structure

## User Stories

- **404 Page** – As a user I want to see a 404 page when I visit a page that does not exist  
- **Homepage** – As a user I want to see products on the homepage  
- **Sign Up** – As a user I want to create an account  
- **Login** – As a user I want to log in to my account  
- **Product List** – As a user I want to see all available products  
- **Product Details** – As a user I want to see detailed information about a product  
- **Cart** – As a user I want to add products to my cart and review them  
- **Checkout** – As a user I want to complete payment securely using Stripe  
- **Creator Page** – As a creator I want to upload and manage products  

---

## Client Routes

### React Router Routes

| Path | Page | Permissions | Behavior |
|-----|-----|-----|-----|
| `/` | HomePage | Public | Displays homepage with product list |
| `/signup` | Signup | Public | User registration |
| `/login` | Login | Public | User login |
| `/products` | ProductPage | Public | Shows all products |
| `/products/:productId` | ProductDetailsPage | Private | Shows single product details |
| `/creator` | CreatorPage | Creator Only | Allows creators to upload products |
| `/cart` | CartPage | Private | Displays user shopping cart |
| `/payment-success` | PaymentSuccess | Private | Displays successful payment message |
| `*` | NotFoundPage | Public | Shows 404 page |

---

## Other Components

- NavBar
- Footer
- Private Route
- PrivateCreator Route
- PaymentSuccess Component

---

## Services

### Auth Service
- login(user)
- signup(user)
- verify()

### Product Service
- getProducts()
- getProductDetails(id)
- addProduct(product)
- updateProduct(id)
- deleteProduct(id)

---

## Context

- Auth Context

---

## Links

### Collaborators

Elahe  Hashemi
https://github.com/elahe

Bilel Marzouki
https://github.com/bilelmarzouki

---

### Project

Client Repository  
https://github.com/elahe/final-project-client

Server Repository  
https://github.com/bilelmarzouki/Final-bootCamp-project

Live App  
https://wearly-rust.vercel.app/