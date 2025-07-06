# E-commerce Platform

A full-stack eCommerce platform with authentication, product management, and order processing. Users can browse, filter products, and make purchases with PayPal integration.

## 🚀 Features

- **Authentication**: JWT, Google OAuth, password reset
- **Product Management**: CRUD operations, categories, attributes, image upload
- **Shopping**: Browse, filter, paginate products, shopping cart
- **Orders**: Create orders, PayPal payment, order status tracking
- **Reviews**: Product reviews and ratings
- **Admin Panel**: User management, product/category management, order management

## 🛠️ Tech Stack

**Backend:**
- Node.js, Express.js
- TypeScript/JavaScript
- MongoDB, Mongoose
- JWT Authentication
- Cloudinary (Image storage)

**Frontend:**
- React
- Redux Toolkit
- Bootstrap

**Payment:**
- PayPal Integration

## 📦 Installation

```bash
# Clone repository
git clone [<repository-url>](https://github.com/huydu17/ecommerce_fullstack)

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
```

## 🔧 Environment Variables

Create `.env` file in the `server` directory:

```env
PORT=your_server_port
NODE_ENV=your_node_environment
CLIENT_URL=your_client_url
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_TOKEN_AUDIENCE=your_jwt_token_audience
JWT_TOKEN_ISSUER=your_jwt_token_issuer
JWT_ACCESS_TOKEN_TTL=your_jwt_access_token_ttl
JWT_REFRESH_TOKEN_TTL=your_jwt_refresh_token_ttl
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
REDIS_HOST=your_redis_host
EMAIL_HOST=your_email_host
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
EMAIL_SENDER=your_email_sender
CRYPTR_KEY=your_cryptr_key
```

## 🚀 Running the Application

```bash
cd server
# Seeder Data
1. To clear existing data
npm run seed:data-d
2. To populate the database with sample data
npm run seed:data
# Run backend
npm run dev
```

## 📷 Screenshots
![image](https://github.com/user-attachments/assets/833ec9f2-fd4b-44c3-b02a-a7a85a7d2ec7)

![image](https://github.com/user-attachments/assets/a6b9e803-c5e6-45bc-9f1b-1231472fbf24)

![image](https://github.com/user-attachments/assets/74bb7b8e-4590-4663-b924-f6bd911a52d4)

![image](https://github.com/user-attachments/assets/37a06836-4a27-489f-b8f2-7d5cfa5df03d)

![image](https://github.com/user-attachments/assets/56f9e7c7-7112-4162-b139-daaa007bf854)

![image](https://github.com/user-attachments/assets/b0a41e15-ff1f-4198-af55-66dd79a69bdd)

![image](https://github.com/user-attachments/assets/6aa89e41-28ba-4750-9881-a2df3d717bad)

![image](https://github.com/user-attachments/assets/b0a613b9-cb1b-4524-97f6-96b1b431a6e4)

![image](https://github.com/user-attachments/assets/15857845-172a-48cb-9a9c-c75faaa987fe)
