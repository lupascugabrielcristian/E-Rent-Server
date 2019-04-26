const items = db.items.find().toArray();
print(items.length);
items.forEach(item => {
	let tags = item.name.split(' ');
	if (item.description != "No description") {
		item.description.split(' ').forEach(t => tags.push(t));
	}
	let m = db.items.update({ _id: item._id }, { $set:{ searchableTags: tags } });
	print("%s", m);
});
