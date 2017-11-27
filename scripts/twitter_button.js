window.onload = (win, ev) => {
    document.getElementById("tweets").style.display = 'none';
};

function toggle_twitter() {
    let tweetsElement = document.getElementById("tweets");
    if (tweetsElement.style.display === 'none') {
        tweetsElement.style.display = 'block';
    } else {
        tweetsElement.style.display = 'none';
    }
}