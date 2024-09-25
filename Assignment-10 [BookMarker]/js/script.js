const bookMarkName = document.getElementById("book-mark-name");
const bookMarkUrl = document.getElementById("bookMark-URL");
const tableContent = document.getElementById("tableContent");

var addMoreInfo = [];

window.onload = function() {
    if (localStorage.getItem("bookMarkInfo") !== null) {
        addMoreInfo = JSON.parse(localStorage.getItem("bookMarkInfo"));
        displayBookMark();
    }
}

function displayBookMark() {
    var element = "";
    for (let i = 0; i < addMoreInfo.length; i++) {
        element += `
        <tr>
            <td>${i + 1}</td>
            <td>
                <i class="fa-solid fa-bookmark me-2 fw-bold ${getIconColor(addMoreInfo[i].name)}"></i>
                <span class="fs-5 fw-bold">${addMoreInfo[i].name}</span>
            </td>
            <td><button onclick="openPage(${i})" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button onclick="deleteItem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
        </tr>`;
    }
    tableContent.innerHTML = element;
}

function clearList() {
    bookMarkName.value = "";
    bookMarkUrl.value = "";
}

function addBookMark() {
    let name = bookMarkName.value.trim();
    let url = bookMarkUrl.value.trim();

    // Check if name or URL is empty
    if (name === '' || url === '') {
        alert('Please enter both a name and a URL for the bookmark.');
        return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    let bookMark = {
        name: name,
        url: url
    }
    addMoreInfo.push(bookMark);
    localStorage.setItem("bookMarkInfo", JSON.stringify(addMoreInfo));
    displayBookMark();
    clearList();
}

function deleteItem(indexItem) {
    addMoreInfo.splice(indexItem, 1);
    localStorage.setItem("bookMarkInfo", JSON.stringify(addMoreInfo));
    displayBookMark();
}

function openPage(index) {
    let url = addMoreInfo[index].url;
    
    // Check if the URL starts with http:// or https://
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // If not, add https:// to the beginning
        url = 'https://' + url;
    }
    
    // Open the URL in a new tab
    window.open(url, '_blank');
}

function getIconColor(iconName) {
    switch (iconName.toLowerCase()) {
        case "facebook":
        case "linkedin":
            return "text-primary";
        case "twitter":
            return "text-info";
        case "instagram":
            return "text-danger";
        case "google":
            return "text-warning";
        default:
            return "text-secondary";
    }
}
