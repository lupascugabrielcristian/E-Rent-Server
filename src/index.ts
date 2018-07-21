import app from './server_app';

const port = process.env.PORT || 8090;

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }

    return console.log("Listerning on port 8090");
});
