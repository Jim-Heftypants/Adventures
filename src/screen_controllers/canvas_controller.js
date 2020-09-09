const doSomeThings = () => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = document.getElementsByClassName('kelpy')[0];
    img.addEventListener("load", () => {
        ctx.drawImage(img, 10, 10);
    })
}

export default doSomeThings;