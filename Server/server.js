const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bhuvi@1998",
    database: "user_management",
    port: 3306 
});

db.connect(err => {
    if (err) {
        console.error("MySQL Connection Error:", err);
        process.exit(1);
    }
    console.log("MySQL Connected...");
});


app.post("/add-user", (req, res) => {
    const { firstName, lastName, phone, email, address } = req.body;

    if (!firstName || !lastName || !phone || !email || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = "INSERT INTO users (first_name, last_name, phone, email, address) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [firstName, lastName, phone, email, address], (err) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json({ message: "User added successfully!" });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
