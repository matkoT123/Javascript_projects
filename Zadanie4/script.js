const carousel = document.getElementById("carousel");

fetch('photos.json').then(response => {
    return response.json();
}).then(data => {

    const row = document.getElementById("rowID");
    
    for (let i = 0; i < data.photos.length; i++) {
        //gallery
        const img = document.createElement('img');
        const div = document.createElement('div');  

        div.setAttribute("class", "col-md-4 galleryItem");
        div.setAttribute("data-title", data.photos[i].title); //forSearch

        img.setAttribute("src", data.photos[i].path);
        img.setAttribute("class", "w-100 h-100 imageM");
        img.setAttribute("id", i);

        div.appendChild(img);
        row.appendChild(div);

        const imgCarousel = document.createElement('img');
        const divCarousel = document.createElement('div');

        divCarousel.setAttribute("class", "carousel-item");
        imgCarousel.setAttribute("class", "d-block w-100");
        imgCarousel.setAttribute("src", data.photos[i].path);

        divCarousel.appendChild(imgCarousel);
        carousel.appendChild(divCarousel);

        search();

    }

}).catch(err => {

});

function search() {
    let search = document.getElementById('searchBox');
    let images = document.querySelectorAll('.galleryItem');

    search.oninput = () => {
        images.forEach(hide => hide.style.display = 'none');
        let value = search.value;
        images.forEach(filter => {
            let title = filter.getAttribute('data-title');
            console.log(title);
            title = title.toLowerCase();
            if(title.includes(value.toLowerCase())) {
                filter.style.display = 'block';
            }
            if(search.value == '') {
                filter.style.display = 'block';
            }
        }) 
    } 
}

// MODAL
document.addEventListener("click",function (e){
    if(e.target.classList.contains("imageM")){

        let items = carousel.getElementsByTagName('div');

        for(let item in items) {
            if(e.target.id == item) {
                
                items[item].setAttribute("class", "carousel-item active");
                console.log(items[item]);
            } 
              else {
                items = carousel.getElementsByTagName('div');
                //items[item].setAttribute("class", "carousel-item");
                console.log(items[item]);
            }  
            

        }

        const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
        myModal.show();
  } 
})