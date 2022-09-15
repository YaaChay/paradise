import { sessionStorageUtil } from "../utils/sessionStorageUtil.js";

function Movie(id, imgUrl) {
    var button = document.createElement("button");
    var img = document.createElement("img");

    img.setAttribute("src", imgUrl);
    button.appendChild(img);

    button.onclick = () => {
        sessionStorageUtil.setItem("movieId", id);
        window.open("../pages/booking.html", "_self");
    }

    return button;
}

export { Movie };

/*
<button>
    <img src="../../assets/temporary/thor-love-and-thunder.jpg">
</button>
*/