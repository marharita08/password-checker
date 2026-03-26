# Password Checker
 
A web application for checking password strength based on configurable rules. Registered users can customize which rules are applied to their password validation.
 
## Features
 
- Real-time password strength checking
- Configurable validation rules:
  - Minimum length (customizable)
  - Uppercase letters
  - Lowercase letters
  - Digits
  - Special characters
  - Forbidden words (customizable)
  - No spaces
  - Limit repeated characters (customizable)
- Enable / disable individual rules
- User registration and authentication to save custom settings
- Unauthenticated users can check passwords using default rules
 
## Tech Stack
 
- **TypeScript**
- **Next.js** — App Router, Server Actions, Server Components
- **MongoDB** — database
- **Mongoose** — ODM for MongoDB
- **NextAuth.js** — authentication
 
## Running Locally
 
### 1. Clone the repository
 
```bash
git clone https://github.com/marharita08/password-checker
cd password-checker
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Start MongoDB
 
```bash
npm run db
```
 
### 4. Create `.env.local`
 
```env
MONGODB_URI=mongodb://admin:secret@localhost:27017/password-checker?authSource=admin
AUTH_SECRET=your-secret-key
```
 
> Generate `AUTH_SECRET` with:
> ```bash
> npx auth secret
> ```
 
### 5. Seed the database
 
```bash
npm run seed
```
 
### 6. Start the development server
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 