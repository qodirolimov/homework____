"use strict";

const text = document.querySelector("#text");

const baseURL = "http://localhost:3000";

async function getUser() {
  try {
    const response = await fetch(`${baseURL}/user`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = await response.json();
    renderData(result);
  } catch (err) {
    console.log(err);
  }
}

getUser();

function renderData(data) {
  data.forEach((item) => {
    const tr = createElement("tr","item w-25", ` <td>${item.name}       </td> <td> id: ${item.id}</td> <td><button class="delete-btn delete1 bg-danger fw-bold text-light" data-del="${item.id}">delete </button></td>                                                                      <td> <button data-edit="${item.id}" class="edit bg-info  fw-bold">EDIT</button></td> `
    );
    $(".table1").dataset.id = item.id;
    $(".table1").appendChild(tr);
  });
}

function addUser(userName) {
  try {
    fetch(`${baseURL}/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ name: `${userName}` }),
    });
  } catch (err) {
    console.log(err);
  }
}

$(".btn").addEventListener("click", () => {
  if (text.value.trim().length !== 0) {
    addUser(text.value);
  } else {
    $(".modal_first").style.display = "block";
  }
});

function deleteUser(id) {
  try {
    fetch(`${baseURL}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({}),
    });
  } catch (err) {
    console.log(err);
  }
}

function updateUser(id, text) {
  try {
    fetch(`${baseURL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        name: text,
      }),
    });
  } catch (err) {
    console.log(err);
  }
}

$(".table1").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteUser(e.target.getAttribute("data-del"));
  }

  if (e.target.classList.contains("edit")) {
    let newText = prompt("enter text");
    updateUser(e.target.getAttribute("data-edit"), newText);
  }
});

$(".close1").addEventListener("click", () => {
  $(".modal_first").style.display = "none";
});
