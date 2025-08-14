const express = require(`express`);
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    {id: 1, lastName: `eclavea`, firstName: `peter paul`, section: `BSIT 4A`, status: `p`},
    {id: 2, lastName: `florido`, firstName: `pedro`, section: `BSIT 4A`, status: `a`},
];

app.get(`/users`,(req,res)=> {
    const {lastName, firstName, section, status} = req.body;

    const userIndex = users.findIndex(user=> user.firstName === firstName 
        && user.lastName === lastName);

    if(userIndex !== -1) {
      //if user exists, update their status
        users[userIndex].status = status;
        console.log(`Updated attend for ${lastName} ${firstName} to: ${status}`);
        res.status(200).json({message: `Attendance for ${lastName} 
            ${firstName} has been updated to ${status}. `});
    } else {
        //if user does not exist, add a new entry
        const newUser = {
            id: users.length + 1,
            lastName,
            firstName,
            section,
            status
        };
        users.push(newUser);
            console.log(`New user added: ${lastName} ${firstName} with status: ${status}`);

            res.status(201).json({ message: `New student ${lastName} ${firstName} 
                has been added with status: ${status}.`});
    };

});

app.get(`/users`, (req,res) => {
    res.status(200).json(users);
});

app.get(`/`, (req,res) => {
    res.send(`Server is up and running!`);
});

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);

});


module.exports = app;
