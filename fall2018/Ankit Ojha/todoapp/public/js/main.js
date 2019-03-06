// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        let div = this.parentElement;
        let divvalue = div.textContent.slice(0, -1);
        // delete the element from the database
        fetch('/deleteTask/' + divvalue, {
                method: 'delete'
            })
            .then((data) => data.text())
            .then(data => {
                console.log('deleted data' + data);
                if (data == 'ok') {
                    div.remove();
                    location.reload();
                }
            });

    }
}

// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        let doneval;
        ev.target.classList.toggle('checked');
        if (ev.target.classList.value === 'checked') {
            doneval = true;
        } else if (ev.target.classList.value === '') {
            doneval = false;
        }
        let doneelement = ev.target.textContent.slice(0, -1);

        // update the done value in database
        fetch('updateTask/' + doneelement, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    doneval: doneval
                })
            })
            .then((data) => data.text())
            .then(data => {
                console.log(data);
            });
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    //send data to the server to insert data in the database
    fetch('/addTask', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                todo: {
                    work: inputValue,
                    done: false
                }
            })
        })
        .then((data) => data.text())
        .then(data => {
            console.log(data)
            if (data === 'ok') {
                let t = document.createTextNode(inputValue);
                li.appendChild(t);

                document.getElementById("myInput").value = "";

                let span = document.createElement("SPAN");
                let txt = document.createTextNode("\u00D7");
                span.className = "close";
                span.appendChild(txt);
                li.appendChild(span);

            }
        });

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let div = this.parentElement;
            div.style.display = "none";
        }
    }
}