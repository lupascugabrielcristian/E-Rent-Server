import { MongoClient, Db } from 'mongodb';

class DbClient {
    public db: Db;

    public connect(onConnectionEstablished: Function) { 
		MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err, client) => {
			if (err) {
				console.log("Could not connect to server because of error: " + err);
			}
			else {
				this.db = client.db("e-rent");
				onConnectionEstablished(this.db);
				console.log("Database connection was established");
			}
		});
	}
}

export = new DbClient();
