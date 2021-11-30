function scrollDetect(e){
    let st = e.target.scrollingElement.scrollTop;
    const navbar = document.querySelector('.navbar');

    if(st > window.innerHeight / 1.5){
        navbar.classList.add('fixed-top')
    }else{
        navbar.classList.remove('fixed-top')
    }
}

window.addEventListener('scroll', scrollDetect)

const playButton = document.querySelector('.btn-video-player');

let videoModal = new bootstrap.Modal(document.getElementById('finsetModal'), {
    keyboard: false
  })

playButton.addEventListener('click', function(){
    videoModal.show();
    // console.log(videoModal)
    videoModal._element.querySelector('.modal-body').innerHTML = `<iframe width="800" height="600" src="https://www.youtube.com/embed/7tz4Ya6gzG4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
})

let ajaxCompanyIntro = new XMLHttpRequest();
ajaxCompanyIntro.onreadystatechange = function() {
    if(ajaxCompanyIntro.readyState === 4){
        if(ajaxCompanyIntro.status === 200){
            let intros = JSON.parse(ajaxCompanyIntro.responseText);
            let introDatas = intros.data
            let introMsg = intros.message
            const introPost = document.querySelector('#company-intro-posts .row');
            for(let i = 0; i <=introDatas.length; i++){
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