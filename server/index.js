const express = require('express');

// Create the express app
const app = express();

// Create a controller for handling user requests
const userController = {
    getUsers: (req, res) => {
        // Get the list of users from the service
        const users = userService.getUsers();
        // Send the list of users as a response
        res.send(users);
    },
    addUser: (req, res) => {
        // Get the user data from the request body
        const user = req.body;
        // Add the user using the service
        userService.addUser(user);
        // Send a success response
        res.send({ message: 'User added successfully' });
    }
};

// Create a service for managing users
const userService = {
    users: [],
    getUsers: () => {
        return userService.users;
    },
    addUser: (user) => {
        userService.users.push(user);
    }
};


// Use the router for all user requests
app.use('/api', userRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
