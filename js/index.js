// console.log($('.section').eq(0).offset().top)
// console.log($('.section').eq(1).offset().top)
// console.log($('.section').eq(2).offset().top)
// console.log($('.section').eq(3).offset().top)

let sectArray = []
function sectDist(){
    for (let i=0; i<$('.section').length; i++) {
        sectArray[i] = $('.section').eq(i).offset().top
    }
}
sectDist()
// console.log(sectArray)

$(window).on('resize', function(){
    sectDist()
    // console.log(sectArray)
})


$(window).on('scroll', function(){
    let sct = $(this).scrollTop()
    // console.log(sct)
    for (let i=0; i<$(".section").length; i++) {
        let sectionTop = sectArray[i]
        let sectionBottom = sectionTop + $('.section').eq(i).outerHeight()
        if (sct>=sectionTop && sct<sectionBottom && !cflag) {
            $('.depth1 li').eq(i).addClass('on')
            .siblings().removeClass('on')
        }

        // 마지막 섹션의 높이가 윈도우 높이보다 작을 경우에만 사용하는 코드임
        // 현재는 마지막 섹션이 3번이어서 eq(2).removeClass('on'), eq(3).addClass('on') 한것임
        // 만약에 마지막 섹션이 4번이라면 eq(3).removeClass('on'), eq(4).addClass('on') 
        let winHeight = $(window).height();
        let scrollBottom = $("#wrap").height() - winHeight - 50;
        if(sct >= scrollBottom) {
            $(".depth1 li").eq(2).removeClass("on");
            $(".depth1 li").eq(3).addClass("on");
        }

    }
})    

$('.section').on('wheel DOMMouseScroll', function(e){
    let delta = e.originalEvent.wheelDelta
    // delta>0 이면 마우스휠을 위로 굴린 것이고,
    // delta<0 이면 마우스휠을 아래로 굴린 것임
    console.log(delta)
    if (delta>0) {
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 500)
    } else {
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 500)
    }
})

let cflag = false;
$('#nav .depth1 li a').on('click focus', function(e){
   e.preventDefault()
   cflag = true;
   let num = $(this).parent().index()
   // console.log(num)
   $(this).parent().addClass('on').siblings().removeClass('on')
   $('html, body').animate({
      scrollTop: sectArray[num]
   }, 500, function(){ cflag = false })
})

$(".open").on('click', function(){
    $(this).toggleClass('on')
})