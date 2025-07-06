# RaviTrends

RaviTrends is a modern e-commerce platform that serves as your guide to modern living, offering the latest trends, styles, and inspirations.

## 🚀 Features

- **Modern E-commerce Interface**: Clean and responsive design built with React and Tailwind CSS
- **Product Management**: Full CRUD operations for products with image upload functionality
- **User Authentication**: Secure login and registration system
- **Shopping Cart**: Add, remove, and manage items in cart
- **Search & Filter**: Advanced product search and filtering capabilities
- **Order Management**: Complete order processing and tracking
- **Admin Dashboard**: Comprehensive admin panel for managing products, orders, and users
- **Responsive Design**: Mobile-first design that works on all devices

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Admin Panel
- **React** - Frontend framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router DOM** - Routing

## 📁 Project Structure

```
RaviTrends/
├── frontend/           # Main e-commerce website
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── context/    # Context API for state management
│   │   ├── assets/     # Images, icons, and static assets
│   │   └── pages/      # Page components
│   ├── public/         # Static files
│   └── package.json
├── backend/            # Express.js API server
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── uploads/        # File upload directory
│   └── package.json
└── admin/              # Admin dashboard
    ├── src/
    │   ├── components/ # Admin components
    │   ├── assets/     # Admin assets
    │   └── pages/      # Admin pages
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ravitrends.git
   cd ravitrends
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file and add your environment variables
   echo "MONGODB_URI=your_mongodb_connection_string" > .env
   echo "JWT_SECRET=your_jwt_secret" >> .env
   echo "PORT=4000" >> .env
   
   # Start the backend server
   npm run server
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Start the frontend development server
   npm run dev
   ```

4. **Admin Panel Setup**
   ```bash
   cd ../admin
   npm install
   
   # Start the admin development server
   npm run dev
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/ravitrends
JWT_SECRET=your_super_secret_jwt_key
PORT=4000
CLOUDINARY_NAME=your_cloudinary_name (if using Cloudinary)
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📱 Usage

### For Customers
1. Visit the main website
2. Browse products by categories
3. Use the search bar to find specific items
4. Add items to cart
5. Proceed to checkout
6. Create an account or login
7. Complete your order

### For Administrators
1. Access the admin panel
2. Login with admin credentials
3. Manage products (add, edit, delete)
4. View and process orders
5. Monitor user activity

## 🛡 Security Features

- **Password Hashing**: Using bcrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Multer configuration for safe file uploads
- **CORS Protection**: Configured for secure cross-origin requests

## 📊 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (Admin)
- `POST /api/product/remove` - Remove product (Admin)
- `POST /api/product/single` - Get single product

### Orders
- `POST /api/order/place` - Place new order
- `POST /api/order/status` - Update order status (Admin)
- `POST /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin)

### Cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart
- `POST /api/cart/get` - Get cart items

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Website**: [ravitrends.com](https://ravitrends.com)
- **Email**: contact@ravitrends.com
- **Phone**: +94-77 0055500
- **Facebook**: [facebook.com/ravitrends](https://facebook.com/ravitrends)
- **Instagram**: [instagram.com/ravitrends](https://instagram.com/ravitrends)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the flexible database
- Express.js for the robust web framework

---

**RaviTrends** - Discover the latest trends, styles, and inspirations with RaviTrends – Your guide to modern living.