const container = document.getElementById("bookmarks");

let bookmarks =
JSON.parse(localStorage.getItem("bookmarks")) || [];

function loadBookmarks(){

    if(bookmarks.length===0){

        container.innerHTML="<p>No bookmarks yet.</p>";
        return;

    }

    container.innerHTML="";

    bookmarks.forEach((surah,index)=>{

        container.innerHTML+=`
        <div class="card">

            <h3>${surah.id}. ${surah.name}</h3>

            <button class="open"
            onclick="openSurah(${surah.id})">
            📖 Open
            </button>

            <button class="delete"
            onclick="deleteBookmark(${index})">
            🗑 Delete
            </button>

        </div>
        `;

    });

}

function openSurah(id){

    location.href=`surah.html?id=${id}`;

}

function deleteBookmark(index){

    bookmarks.splice(index,1);

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );

    loadBookmarks();

}

loadBookmarks();
