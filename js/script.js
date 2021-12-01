// Use window.addEventListener("scroll",) Event listener. 
// then add callback function that includes when the window height scroll down to 100vh and add 'fixed-top' class on Navbar element.
// For your mind: object.classList.add('class') this method is add class on selected element
// e.target.scrollingElement.scrollTop use that method when track scrolling amount

function scrollDetect(e){
    let st = e.target.scrollingElement.scrollTop;
    const navbar = document.querySelector('.navbar');

    if(st > window.innerHeight / 1.5){
        navbar.classList.add('fixed-top')
    }else{
        navbar.classList.remove('fixed-top')
    }
}

// Add scrollDetect callback function on window.addEventlistener('scroll', callback) Listener

window.addEventListener('scroll', scrollDetect)

// Define Play button variable

const playButton = document.querySelector('.btn-video-player');

// Create a modal with a single line of JavaScript: https://getbootstrap.com/docs/5.1/components/modal/#via-javascript
// Define videoModal then use Bootstrap modal Object request
let videoModal = new bootstrap.Modal(document.getElementById('finsetModal'), {
    keyboard: false
  })

// Create Click Event Listener on Play button variable (you already created above)
// add videoModal.show() on callback function
// Select '.modal-body' class from videoModal variable then use innerHTML method and add Youtube embed code

playButton.addEventListener('click', function(){
    videoModal.show();
    // console.log(videoModal)
    videoModal._element.querySelector('.modal-body').innerHTML = `<iframe width="800" height="600" src="https://www.youtube.com/embed/7tz4Ya6gzG4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
})

// Create an XMLHttpRequest object
// Create a callback function
// Open a GET request and use data from ../data/company_intro.json
// Send the request

let ajaxCompanyIntro = new XMLHttpRequest();
ajaxCompanyIntro.onreadystatechange = function() {
    if(ajaxCompanyIntro.readyState === 4){
        if(ajaxCompanyIntro.status === 200){
            let intros = JSON.parse(ajaxCompanyIntro.responseText);
            let introDatas = intros.data
            let introMsg = intros.message
            const introPost = document.querySelector('#company-intro-posts .row');
            for(let i = 0; i < introDatas.length; i++){
                // console.log(introDatas[i]);
                introPost.innerHTML += `
                <div class="col-12 col-md-6 col-lg-4">
                    <article class="primary">
                        <img class="img-fluid" src='${introDatas[i].thumbnail}' alt="Post1">
                        <h3>${introDatas[i].title}</h3>
                        <p>${introDatas[i].content.slice(0, 100)}</p>
                        <a class="learn" href="intro-${introDatas[i].id}.html">Learn more →</a>
                    </article>  
                </div>
                 `
            }
        } else {
            alert(ajaxCompanyIntro.statusText)
        }
    }
};
ajaxCompanyIntro.open('GET', '../data/company_intro.json');
ajaxCompanyIntro.send();



document.getElementById("subscribe").addEventListener('click', () => {
    const URL = 'http://52.221.191.153/subscribe/subscription/create';
    const submitValue = document.getElementById('finsweetInputEmail1').value;
    const requestOptions = {
        method : "POST",
        header : {'Content-Type': 'application/json'},
        body: {
            "email": submitValue
        }
    }
    console.log(requestOptions);
    fetch(URL, requestOptions)
    .then((response) => {return response.json()})
    .then((data) => {
        alert(data.message);
    }).catch((error) => {
        alert(error.message)}
    )
}
)