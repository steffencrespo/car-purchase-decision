[![Build Status](https://travis-ci.org/steffencrespo/car-purchase-decision.svg?branch=master)](https://travis-ci.org/steffencrespo/car-purchase-decision)
[![GitHub Pages](https://img.shields.io/badge/view-demo-blue?logo=github)](https://steffencrespo.github.io/car-purchase-decision/)

# 📊 What Car Am I Going to Buy?

> lots of cars, lots of options, hard to make the right choice.

---

## 🚗 Purpose

When you are shopping for a new car there is always the option of having a spreadsheet or a piece of paper where you can write down the models you want and the offers you found in the market. Although pen and paper are always great friends, and notes apps are always handy, you can't easily see what details each model has. You can't easily add new models and keep track of the max price you want to pay for each model.

Whacambuy helps you with a visual list of the car models that are under your radar. Add new models, remove the ones you don't feel like having anymore.

It also includes a backend API to store your preferences and decision logic to compare car purchase versus ride-sharing.

---

## 🧭 How to Use This App

1. On the welcome page, click Learn More for additional information  
   ![Welcome Page](/README-images/1-welcome.png "Welcome Page")  
   ![How To Use This App](/README-images/2-howto.png "How To Use")
2. Sign up by clicking the 'Get Started' button and fill out the user info form  
   ![New User Form](/README-images/3-signup.png "Sign Up")
3. Log in entering your newly created or already existing credentials  
   ![Login](/README-images/4-login.png "Login Page")
4. The list view is going to be loaded and you will see your cars once you are logged in  
   ![List View](/README-images/5-list-view.png "List View")
5. Click 'Add new car' in the nav bar and enter the specifics of the models you want to buy  
   ![Add Car](/README-images/7-add-car.png "Add Car Form")
6. Search the web and local auto traders and add to your list including the max price you would pay
7. Enter notes regarding your search: too hard to find? Too expensive? Gas-guzzling?  
   ![Enter Notes](/README-images/8-edit-car.png "Edit Car Comments")
8. Click on 'Change View' in the nav bar to see all the details of your models to compare one by one  
   ![Display Car Details](/README-images/6-simplified-list.png "Car Details")
9. Found out that the V8 sports you always wanted costs a fortune to maintain? Remove it by pressing the 'X' icon

---

## 🛠️ Tech Stack

- HTML, CSS, Bootstrap
- JavaScript (Vanilla + jQuery)
- Node.js, Express.js
- MongoDB, Mongoose
- Heroku (deployment)
- Travis CI (CI)
- Passport (authentication)

---

## ▶️ How to Run Locally

### Option 1: Full App (with backend and MongoDB)

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB:
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

3. Start the app:
```bash
npm run start
```

4. Open your browser at:
```
http://localhost:8080
```

### Option 2: Frontend Only

If you just want to test the interface:
```bash
open index.html
```
Or use:
```bash
npx serve
```

---

## 📂 Project Structure

```
car-purchase-decision/
├── index.html
├── script.js
├── style.css
├── server.js
├── models/
├── auth/
├── users/
├── config.js
└── README.md
```

---

## 🔐 API Reference

### Users
| Method       | Endpoint                    | Description                              | Access   |
|--------------|-----------------------------|------------------------------------------|----------|
| GET, POST    | `/api/users/`               | Create or return user                    | Public   |
| GET          | `/api/users/userId/:name`   | Get user ID by username                  | Protected|

### Auth
| Method       | Endpoint                    | Description                              | Access   |
|--------------|-----------------------------|------------------------------------------|----------|
| POST         | `/api/auth/login`           | Get auth token                           | Public   |
| POST         | `/api/auth/refresh`         | Refresh auth token                       | Protected|

### Cars
| Method       | Endpoint                    | Description                              | Access   |
|--------------|-----------------------------|------------------------------------------|----------|
| POST         | `/purchaseList`             | Add car to list                          | Protected|
| GET          | `/purchaseList/:userId`     | Get cars by user                         | Protected|
| PUT          | `/purchaseList/:carId`      | Update car                               | Protected|
| DELETE       | `/purchaseList/:carId`      | Remove car                               | Protected|

---

## 💡 Roadmap

- [ ] Show financing estimate per car
- [ ] Add links to real-world offers
- [ ] Deploy backend on Heroku + frontend on GitHub Pages

---

## 📄 License

MIT — feel free to use, fork, and adapt.

---

## 👤 Author

**Leo Steffen**  
[GitHub @steffencrespo](https://github.com/steffencrespo)
