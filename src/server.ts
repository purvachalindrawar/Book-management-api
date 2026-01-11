import app from './app';
// We will use dotenv later, for now hardcoding port or default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
