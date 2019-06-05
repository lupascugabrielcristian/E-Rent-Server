const items = db.items.find().toArray();
function prettyItem(item) {
	return {
		_id: item._id,
		id: item.id,
		name: item.name
	}
}

let prettyItems = items.map(item => prettyItem(item));
print(tojson(prettyItems));
