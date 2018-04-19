sendTime = {
    "after": 0
};
var errors = 0;

function fetchImages() {
    
    var findNewImages = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendTime),
    };
    fetch('http://localhost:3000/latest', findNewImages)
        .then(response => response.json())
        .then(data => {
            let imageDisplay = document.getElementById('imageDisplay')
            data.latestImages.forEach((img) => {
                let newImg = document.createElement('img');
                newImg.src = img;
                imageDisplay.appendChild(newImg);
            });
            sendTime.after = data.timestamp;
        })
        .catch(response => {
            if (!response.ok) {
                errors++;
            }
            
        })
    startPoll = setTimeout(fetchImages, 5000);
    if (errors >= 1) {
        clearTimeout(startPoll);
        alert("Lost connection with server!");
    }
}
if(errors < 2) {
fetchImages();
};