$(document).ready(function(){


let height = $(window).height()
// console.log(height)



$(window).scroll(function(){
    let currentHeight = $(window).scrollTop();
    console.log(currentHeight)

    if(currentHeight>height-180){
        $(".side-nav").addClass("scroll-nav")
    }else{
        $(".side-nav").removeClass("scroll-nav")
        setactive("home")
    }
    
})
    $(".navbar-toggler").click(function(){
        let icon = $(".navbar-collapse").hasClass("show")
        // console.log(icon);
        if(icon){
            $(".icon-menu").removeClass("fa-close").addClass("fa-bars")
        }else{
            $(".icon-menu").removeClass("fa-bars").addClass("fa-close")
        }
    })
    function setactive(current){
        $(".nav-link").removeClass("current-section")
        $(`.nav-link[href='#${current}']`).addClass("current-section");
    }
    function navscroll(){
        let currentplace= $("section[id]");
        let windowWidth = $(window).innerWidth();
        console.log(windowWidth);
        currentplace.waypoint(function(direction){
            if(direction == "down" || windowWidth == 768){
                let currentHere = $(this.element).attr("id");
                setactive(currentHere);
            }
        },{offset:"15%"});

        currentplace.waypoint(function(direction){
            if(direction == "down" && windowWidth == 768 ){
                let currentHere = $(this.element).attr("id");
                setactive(currentHere);
            }
        },{offset:"50%"});

        currentplace.waypoint(function(direction){
            if(direction == "up"){
                let currentHere = $(this.element).attr("id");
                // console.log(currentHere);
                setactive(currentHere);
            }
        },{offset:"-12%"})
    }
     
    navscroll();
    $(window).on("load",function(){
        $(".loader-container").fadeOut(500,function(){
            $(this).remove();
        })
    })
})