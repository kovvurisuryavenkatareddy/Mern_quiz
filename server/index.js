const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const sendEmail = require('./SendEmail');
const UserModel = require("./model/User");
const QuestionModel = require("./model/Questions");
const ScoreModel = require("./model/ScoreModel");
const ApplicationModel = require("./model/Application");
const app = express();
app.use(express.json());
app.use(cors()); 

mongoose.connect("mongodb+srv://ksvreddy:8341771218@fitness.zcjvn0h.mongodb.net/quiz?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true });

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({ message: "Success" });
                } else {
                    res.json({ message: "The password is incorrect" });
                }
            } else {
                res.json({ message: "No record existed" });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

app.post("/register", (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

app.post("/add-question", (req, res) => {
    const { title, question, options, correctAnswer } = req.body;

    // Create a new instance of QuestionModel
    const newQuestion = new QuestionModel({
        title,
        question,
        options,
        correctAnswer
    });

    // Save the new question to the database
    newQuestion.save()
        .then(question => {
            res.json({ message: "Question added successfully", question: question });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// In your backend index.js or routes file
app.get("/quiz/:title", (req, res) => {
    const quizTitle = req.params.title;
    QuestionModel.find({ title: quizTitle })
        .then(questions => {
            res.json(questions);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }); 
});

app.delete("/quiz/:id", async (req, res) => {
    const questionId = req.params.id;
    try {
        // Find the question by ID and delete it
        await QuestionModel.findByIdAndDelete(questionId);
        res.json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/save-score", async (req, res) => {
    try {
        // Extract user name and score from the request body
        const { name, score } = req.body;
        // Create a new Score document
        const newScore = new ScoreModel({
            name,
            score
        });
        // Save the score to MongoDB
        await newScore.save();
        // Respond with success message
        res.json({ message: "Score saved successfully" });
    } catch (error) {
        console.error("Failed to save score:", error);
        // Respond with error message
        res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/quiz/:id", async (req, res) => {
    const questionId = req.params.id;
    const { question, options, correctOption } = req.body;
    try {
        // Find the question by ID and update it
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(questionId, {
            question,
            options,
            correctOption
        }, { new: true }); // { new: true } ensures the updated document is returned
        res.json(updatedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get("/get-application", async (req, res) => {
    try {
        const data = await ApplicationModel.find({});
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Create data
app.post("/create-application", async (req, res) => {
    try {
        const data = new ApplicationModel(req.body);
        await data.save();
        res.send({ success: true, message: "Data saved successfully", data: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Send email with link
app.post("/api/sendemail", async (req, res) => {
    const { email } = req.body;
    const subject = "Thank You Message";
    const message = `
    <h3>Greetings</h3>
    <p>You are selected for Global Coding Club.</p>
    <p>Click <a href="http://localhost:3000/user">here</a> to view the Hello World page.</p>
    <p>Regards</p>
`;

    try {
        await sendEmail(subject, message, email);
        res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});


app.put("/update/:id", async (req, res) => {
    const { id } = req.params;  
    const updatedFields = req.body; 

    try {
        // Update the document with the provided ID
        const result = await ApplicationModel.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!result) {
            return res.status(404).send({ success: false, message: "Data not found" });
        }

        res.send({ success: true, message: "Data updated successfully", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});


//delete
app.delete("/delete/:id",async(req,res)=>{
    const id =req.params.id
    console.log(id)
    const data = await ApplicationModel.deleteOne({_id : id})
    res.send({success: true, message : "data deleted sucessfully"})
})

app.listen(3001, () => {
    console.log("server is running on http://localhost:3001/");
}); 
