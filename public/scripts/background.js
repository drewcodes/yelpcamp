var counter = 0;
function changeBG(){
    var imgs = [
        "urlhttps://farm4.staticflickr.com/3919/15209731536_7f896f0aa0.jpg)",
        "url(https://farm1.staticflickr.com/590/20744837754_f5ddcd70cc.jpg)",
        "url(https://farm4.staticflickr.com/3895/15030126225_6081b6d38f.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);


