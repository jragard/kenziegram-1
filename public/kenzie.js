// uploadForm.addEventListener("submit", evt => evt.preventDefault());

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
    fetch('/latest', findNewImages)
        .then(response => response.json())
        .then(data => {
            let imageDisplay = document.getElementById('imageDisplay')
            data.latestImages.forEach((img) => {
                let newImg = document.createElement('img');
                newImg.src = img;
                imageDisplay.appendChild(newImg);
            });
            sendTime.after = data.timestamp;
            errors = 0;
        })
        .catch(response => {
            if (!response.ok) {
                errors++;
                console.log("Connection Timeout");
                if (errors == 2) {
                    clearTimeout(startPoll);
                    alert("Lost connection with server!");
                }
            }
            
        })
    startPoll = setTimeout(fetchImages, 5000);
    
}
if(errors < 2) {
fetchImages();
};