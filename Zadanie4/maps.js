const carousel = document.getElementById("carousel");
const marker = [];
const divCarousel = document.createElement('div');
// AIzaSyA2TCzYM97AFbWTf8ZcAP55Ro5SUDxDf7o
fetch('photos.json').then(response => {
    return response.json();
}).then(data => {

    const uluru = { lat: 48.7000, lng: 19.5000 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: uluru,
    });

    for (let i = 0; i < data.photos.length; i++) {
        //CAROUSEL
        const imgCarousel = document.createElement('img');
        

        divCarousel.setAttribute("class", "divC carousel-item");
        divCarousel.setAttribute("data-title", data.photos[i].GPS);
        imgCarousel.setAttribute("class", "d-block w-100");
        imgCarousel.setAttribute("src", data.photos[i].path);

        divCarousel.appendChild(imgCarousel);
        carousel.appendChild(divCarousel);
    }

    for (let i = 0; i < data.photos.length; i++) {
        let positions = data.photos[i].GPS;
        let gpsPositions = positions.split(' ');
        let lat = parseFloat(gpsPositions[0]);
        let lng = parseFloat(gpsPositions[1]);

        marker[i] = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map,
            title: "Hello World!",
        });



        marker[i].addListener("click", () => {
            //console.log(positions);

            let divC = document.querySelectorAll('.divC');
            //let gps;
            divC.forEach(filter => {
                 let gps = filter.getAttribute('data-title');
                console.log("kokot");
                let items = carousel.getElementsByTagName('div');
                for (let item in items) {
                    //console.log("pes");
                    if (positions == gps) {
                        console.log('kus');
                        items[item].setAttribute("class", "divC carousel-item active");
                        //console.log(items[item]);
                    }
    
    
                }

                // if(positions == gps) {
                //     console.log("mooore");
                //     divCarousel.setAttribute("class", "divC carousel-item active");
    // }
            })

            //let items = carousel.getElementsByTagName('div');
            //console.log(items);
            

            const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
            myModal.show();
        }
        );

    }

}).catch(err => {

});






