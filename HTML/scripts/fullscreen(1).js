function setFullSreen()
{
    console.log("fullscreen");
    var elem = document.getElementsByTagName("body")[0];
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
}
