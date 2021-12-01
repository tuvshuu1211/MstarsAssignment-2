// Use window.addEventListener("scroll",) Event listener. 
// then add callback function that includes when the window height scroll down to 100vh and add 'fixed-top' class on Navbar element.
// For your mind: object.classList.add('class') this method is add class on selected element
// e.target.scrollingElement.scrollTop use that method when track scrolling amount

function scrollDetect(e){
    let st = e.target.scrollingElement.scrollTop;
    const navbar = document.querySelector('.navbar');

    if(st > window.innerHeight / 1.5){
        navbar.classList.add('fixed-top')
        // navbar.className = 'fixed-top'
    }else{
        navbar.classList.remove('fixed-top')
    }
}

// Add scrollDetect callback function on window.addEventlistener('scroll', callback) Listener

window.addEventListener('scroll', scrollDetect)

// Define Play button variable

const playButton = document.querySelector('.btn-video-player');

// Create a modal with a single line of JavaScript: https://getbootstrap.com/docs/5.1/components/modal/#via-javascript
// Define finsetModal then use Bootstrap modal Object request
let finsetModal = new bootstrap.Modal(document.getElementById('finsetModal'), {
    keyboard: false
  })

// Create Click Event Listener on Play button variable (you already created above)
// add finsetModal.show() on callback function
// Select '.modal-body' class from finsetModal variable then use innerHTML method and add Youtube embed code

playButton.addEventListener('click', function(){
    finsetModal.show();
    // console.log(finsetModal)
    finsetModal._element.querySelector('.modal-body').innerHTML = `<iframe width="100%" height="600" src="https://www.youtube.com/embed/7tz4Ya6gzG4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
})

// Create an XMLHttpRequest object
// Create a callback function
// Open a GET request and use data from ../data/company_intro.json
// Send the request

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            // console.log( JSON.parse(xhr.responseText))
            let intros = JSON.parse(xhr.responseText);
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
            alert(xhr.statusText)
        }
    }
};
xhr.open('GET', '../data/company_intro.json');
xhr.send();


/*  Add subscription email action. When subscription POST request is successful, 
    change the email element and subscribe button into "Your subscription is successful" Text. 
    POST request should be done by AJAX request. We need a POST request end point for subscription email. 
*/
// Define Subscribe by ID name
buttonSubscribe = document.getElementById("subscribe");
// Add CLICK Event Listener on the button
// Then using Fetch method POST input value to http://52.221.191.153/subscribe/subscription/create 
buttonSubscribe.addEventListener('click', () => {
    const URL = 'http://52.221.191.153/subscribe/subscription/create';
    const submitValue = document.getElementById('finsweetInputEmail1').value;
    const requestOptions = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: submitValue})
    }

    
fetch(URL, requestOptions).then(res => res.json())
  .then(res => console.log(res));

    console.log(requestOptions);
    fetch(URL, requestOptions)
    .then((response) => {
        console.log(response.status)
        if (response.status === 200){
            return response.json()
        }else{
            throw new Error("Your submission is wrong");
        }
    })
    .then((data) => {
        finsetModal.show();
        finsetModal._element.querySelector('.modal-body').innerHTML = `<p class='text-success fs-1 p-5 text-center'>${data.message}!</p>`
    }).catch((error) => {
        finsetModal.show();
        finsetModal._element.querySelector('.modal-body').innerHTML = `<p class='text-danger fs-1 p-5 text-center'>${error.message}!</p>`
    }
    )
}
)