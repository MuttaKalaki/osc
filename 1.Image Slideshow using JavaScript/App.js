let images=[ 
"./assets/img1.jpg", 
"./assets/img2.jpg", 
"./assets/img3.jpg", 
"./assets/img4.jpg" 
]; 
let index=0; 
let slide = document.getElementById('slide_show'); 
let changeimg=()=>{ 
index++;//index=index+1 
if(index >=images.length){ 
index=0; 
} 
slide.src =images[index]; 
} 
setInterval(changeimg,2000); 
