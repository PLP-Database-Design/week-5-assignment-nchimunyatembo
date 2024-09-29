
//BACKEND CONNECTION TO THE DATABSE ASSIGNMENT

//Definition of varriables
const express = require('express');
const app = express();
const port = 3000; // You can choose any port number

// Middleware of the server
app.use(express.json()); // Parse JSON request bodies

// Routes part
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// GET endpoint to retrieve all patients
app.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.findAll({
            attributes: ['patient_id', 'first_name', 'last_name', 'date_of_birth']
        });

        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve patients' });
    }
});
// GET endpoint to retrieve all providers
app.get('/providers', async (req, res) => {
    try {
        const providers = await Provider.findAll({
            attributes: ['first_name', 'last_name', 'provider_specialty']
        });

        res.json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve providers' });
    }
});

// GET endpoint to retrieve patients by first name
app.get('/patients/:firstName', async (req, res) => {
    const firstName = req.params.firstName;

    try {
        const patients = await Patient.findAll({
            where: {
                first_name: {
                    [Op.iLike]: `%${firstName}%`
                }
            }
        });

        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve patients' });
    }
});

// GET endpoint to retrieve providers by specialty
app.get('/providers/:specialty', async (req, res) => {
    const specialty = req.params.specialty;

    try {
        const providers = await Provider.findAll({
            where: {
                provider_specialty: {
                    [Op.iLike]: `%${specialty}%`
                }
            }
        });

        res.json(providers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve providers' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});