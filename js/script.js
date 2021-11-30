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
    videoModal.show()
})
