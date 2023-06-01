# Gracefully Baked
Gracefully baked is an e-commerce site that lists all my favorite baked goods for sale. It includes a Flask back end with SQLAlchemy and a React front end, allowing users to sign up, log in, browse and buy products, and leave reviews on those products. The app also includes the ability to create, delete, and edit products.

### Features

- User sign up and login
- Shopping cart functionality
- Product search and browsing
- Product creation, deletion, and editing
- Review creation, edit, deletion, and viewing

### Technologies Used

- Flask
- SQLAlchemy
- React

### Installation & Development

To install and run the app, follow these steps:

1. Clone the repository from GitHub:

```bash
git clone https://github.com/your-username/Gracefully-Baked.git
```

2. Install the required Python packages:
```bash
pipenv install -r requirements.txt
```

3. Install the required JavaScript packages:
```bash
cd react-app
npm install
```

4. Start the Flask server:
```bash
cd app
pipenv shell
flask run
```

5. Start the React app:
```bash
cd react-app
npm start
```

Navigate to http://localhost:3000 in your web browser to use the app.
