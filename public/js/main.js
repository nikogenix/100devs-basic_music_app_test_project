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

async function editItem() {
	const itemArtistNode = this.previousElementSibling.previousElementSibling;
	const itemArtist = itemArtistNode.innerText;
	const itemSongNode = this.previousElementSibling;
	const itemSong = itemSongNode.innerText;
	const cancelButton = this.nextElementSibling;

	// Update DOM

	this.classList.remove("fa-edit");
	this.classList.add("fa-save");

	cancelButton.classList.remove("fa-trash");
	cancelButton.classList.add("fa-times");

	itemArtistNode.innerText = "";
	itemSongNode.innerText = "";

	let inputArtistNode = document.createElement("input");
	inputArtistNode.setAttribute("type", "text");
	inputArtistNode.setAttribute("name", "artist");
	inputArtistNode.setAttribute("required", "");
	inputArtistNode.value = itemArtist;

	let inputSongNode = document.createElement("input");
	inputSongNode.setAttribute("type", "text");
	inputSongNode.setAttribute("name", "song");
	inputSongNode.setAttribute("required", "");
	inputSongNode.value = itemSong;

	itemArtistNode.appendChild(inputArtistNode);
	itemSongNode.appendChild(inputSongNode);

	// Save
	this.addEventListener("click", async () => {
		const inputArtist = inputArtistNode.value;
		const inputSong = inputSongNode.value;

		try {
			const response = await fetch("editMusic", {
				method: "put",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					artistOld: itemArtist,
					songOld: itemSong,
					artistNew: inputArtist,
					songNew: inputSong,
				}),
			});
			const data = await response.json();
			console.log(data);
			location.reload();
		} catch (err) {
			console.log(err);
		}
	});

	// Cancel
	cancelButton.addEventListener("click", () => {
		try {
			location.reload();
		} catch (err) {
			console.log(err);
		}
	});
}
