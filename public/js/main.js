const editButton = document.querySelectorAll(".fa-edit");
Array.from(editButton).forEach((element) => {
	element.addEventListener("click", editItem);
});

const deleteButton = document.querySelectorAll(".fa-trash");
Array.from(deleteButton).forEach((element) => {
	element.addEventListener("click", deleteItem);
});

async function deleteItem() {
	const itemArtist = this.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
	const itemSong = this.previousElementSibling.previousElementSibling.innerText;

	try {
		const response = await fetch("deleteMusic", {
			method: "delete",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				artist: itemArtist,
				song: itemSong,
			}),
		});
		const data = await response.json();
		console.log(data);
		location.reload();
	} catch (err) {
		console.log(err);
	}
}

async function editItem() {}
