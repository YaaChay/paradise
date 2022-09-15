import { sessionStorageUtil } from "../utils/sessionStorageUtil.js";

function MovieContainer(id, imgUrl, startTime) {
    var div = document.createElement("div");
    var button = document.createElement("button");
    var img = document.createElement("img");
    var time = document.createElement("p");

    div.classList.add("movie");
    img.setAttribute("src", imgUrl);
    time.innerText = startTime;

    button.appendChild(img);
    div.appendChild(button);
    div.appendChild(time);

    button.onclick = () => {
        sessionStorageUtil.setItem("movieId", id);
        window.open("../pages/booking.html", "_self");
    }

    return div;
}

export { MovieContainer };

/* 
<div class="movie">
    <button>
        <img src="../../assets/temporary/thor-love-and-thunder.jpg">
    </button>
    <p>08:00AM</p>
</div>
*/