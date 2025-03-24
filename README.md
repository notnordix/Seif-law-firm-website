# Seif Law Firm Website

A professional website for Seif Law Firm built with Next.js, featuring a blog, appointment booking system, contact form, and admin dashboard.

## Technology Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Deployment**: Vercel (recommended) or any Node.js hosting

## Prerequisites

- Node.js 18.x or later
- MySQL 8.0 or later
- npm or yarn

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone [repository-url]
cd seif-law-firm-website
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=seif_law_firm_db

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
\`\`\`

### 4. Set up the database

Create a MySQL database and run the SQL schema file:

\`\`\`bash
mysql -u root -p seif_law_firm_db < schema.sql
\`\`\`

### 5. Add admin users

You can add admin users to the database using the provided script:

\`\`\`bash
node scripts/add-admin-user.js
\`\`\`

By default, this will create an admin user with the following credentials:
- Username: new_admin@seiflawfirm.com
- Password: secure_password123

To customize the admin credentials, edit the `newAdmin` object in the script before running it:

\`\`\`javascript
const newAdmin = {
  username: "your_admin@seiflawfirm.com",
  password: "your_secure_password",
  fullName: "Admin User Name",
  email: "your_admin@seiflawfirm.com",
  role: "admin",
};
\`\`\`

#### Security Best Practices for Admin Credentials

1. **Use Strong Passwords**: Generate strong, unique passwords for each admin user.
2. **Delete or Secure the Script**: Remove or secure the admin creation script before deploying to production.
3. **Implement Password Change**: Consider requiring admins to change their password on first login.
4. **Audit Admin Actions**: Implement logging for admin actions to track changes.

### 6. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Deployment

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel
3. Configure the environment variables
4. Deploy

### Deploying to Other Hosting Providers

1. Build the project:
\`\`\`bash
npm run build
# or
yarn build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
# or
yarn start
\`\`\`

## Features

- Responsive design for all devices
- Blog with categories and search functionality
- Appointment booking system
- Contact form with email notifications
- Admin dashboard for managing content
- SEO optimized with metadata and structured data

