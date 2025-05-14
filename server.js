const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());

// Define the email sending function
const sendEmail = (formData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'slark1530@gmail.com', // Your Gmail address
            pass: 'liwu cfwi uney xkfv',  // Replace with your Gmail App Password
        },
    });

    const mailOptions = {
  from: 'slark1530@gmail.com',
  to: 'slark1530@gmail.com',
  subject: 'New Nutrition Assessment Submission',
  text: `
Name: ${formData.name}
Age: ${formData.age}
Gender: ${formData.gender}
Height: ${formData.heightUnit === 'inches' ? formData.heightInches : formData.heightCm}
Weight: ${formData.weightUnit === 'kg' ? formData.weightKg : formData.weightLb}

Likes: ${(formData['likes[]'] || []).join(', ')}
Dislikes: ${(formData['dislikes[]'] || []).join(', ')}
Dietary Restrictions: ${(formData['restrictions[]'] || []).join(', ')}

Activity Level: ${formData.activity}
Meals: ${formData.meals}
Breakfast: ${formData.breakfast}
Lunch: ${formData.lunch}
Dinner: ${formData.dinner}
Snacks: ${formData.snacks}

Goal: ${formData.goal}
Appearance Preference: ${formData.appearance}
Focus Area: ${formData.focusArea}

Exercises: ${(formData['exercise[]'] || []).join(', ')}
Exercise Frequency: ${formData.exerciseFreq}

Fitness Goals: ${(formData['fitnessGoals[]'] || []).join(', ')}

Budget: ${formData.budget}
Investments: ${(formData['investments[]'] || []).join(', ')}
Supplements: ${(formData['supplements[]'] || []).join(', ')}
  `
};


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// POST endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body; // Capture the form data sent by the user
    console.log('Form Data Received:', formData); // Log the form data
    sendEmail(formData); // Send the email with form data
    res.send('Form submitted successfully!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
