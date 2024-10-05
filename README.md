# OrganizeMe 📝✨

OrganizeMe is your go-to **weekly task management web app**! It’s designed to help you keep track of your to-do list in the simplest and most efficient way possible. With OrganizeMe, you’ll no longer miss a beat—whether it’s getting your work done or remembering that important coffee date.

---

## Features 🚀

### 🗓️ **To-Do List for Each Day of the Week**  
For every day of the week, you’ve got your personal task list where you can:
- **Add** new tasks (because let’s face it, the list always grows).
- **Delete** tasks (hopefully because you completed them).
- **Mark tasks as done** ✅ (so satisfying).
- **Unmark tasks** as done (we all procrastinate sometimes).
- **Mark tasks as important** 🌟 (because some tasks deserve VIP status).
- See all your **important tasks** in a dedicated section!

### 🧑‍💻 **Customizable User Profile**  
Personalize your OrganizeMe experience!  
- Update your **profile picture**
- Change your **username** and **email** whenever you like.

### 🔒 **Secure Authentication with JWT**  
All your routes are secured with JWT (JSON Web Token). Your data stays private and secure while you manage your tasks. 


---

## Tech Stack 🛠️

### **Back-end:**
- **Node.js** and **Express.js** power the server-side logic.
- **JWT Authentication** ensures your routes are secure.

### **Front-end:**
- **Handlebars** is used to create templates.
- **Bootstrap** gives the app a responsive design.

---

## How to Run OrganizeMe Locally ⚙️

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/OrganizeMe.git
   cd OrganizeMe

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file and add your environment variables:
   ```bash
    MONGO_DB= mongodb://localhost:27017/organizeme
    PORT=5000 
    JWT_SECRET=add_a_jwt_secret_key_here

4. Run the app:
   ```bash
   npm start

5. Visit http://localhost:5000/user/signup and start organizing your life! 🎉

<img width="851" alt="signup" src="https://github.com/user-attachments/assets/69130bf3-73d4-4371-94c0-e6921c97e71d">


<img width="820" alt="login" src="https://github.com/user-attachments/assets/006b03e9-9c0e-4ee2-989a-158937fb6221">



