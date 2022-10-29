// جافاسكريبت ملهاش كبير

// ---------- clickable menu ---------


let nevMenu = document.querySelector( ".nevMenu" );
let navLinks = document.querySelector(".navLinks");
nevMenu.addEventListener( "click", () => {
  navLinks.classList.toggle( "active" );
} )


// ---------- Slider ---------

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 50,
  loop: true,
  centerSlider: "true",
  fade: true,
  grabCursor: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
} );


// ---------- Filter Section ---------
$( document ).on( "click", ".filter-link li",function () {
  $(this).addClass("active").siblings().removeClass("active")
} );
$( document ).ready( function () {
  $( ".list" ).click( function () {
    const value = $(this).attr("data-filter");
    if(value == "all")
    {
      $( ".filter-box" ).show( "1000" );
    }
    else
    {
      if ( $( ".filter-box" ).hide() )
      {
        $( ".filter-box" ).show(  );
      $(".filter-box")
        .not("." + value)
        .hide("1000");      
      }
      else
      {
        $(".filter-box")
          .not("." + value)
          .hide("1000");   
        }
      }
  })
})



// ---------- Crud ---------


// get Elements 

let place =document.getElementById('place');
let price =document.getElementById('price');
let details =document.getElementById('details');
let image1 =document.getElementById('image1');
let image2 =document.getElementById('image2');
let loction =document.getElementById('location');
let submit =document.getElementById('submit');
let crudcontrol="create";
let indexGlobal; 
let arr;

submit.addEventListener('click',createplace);


if(localStorage.places)
{
  arr=JSON.parse(localStorage.places);
}
else
{
  arr=[];
}

//  1- Create :

function createplace(){
  let obj={
    place:place.value,
    price:price.value,
    details:details.value,
    image1:image1.value,
    image2:image2.value,
    loction:loction.value,
  }
  if(place.value!="" && price.value!="" && details.value!='' && image1.value!='') 
  {
    if(crudcontrol ==="create")
    {
    arr.push(obj)
    }
    else
    {
      arr[indexGlobal]=obj;
      console="create";
      submit.innerHTML="اضافه";
    }
  }
  else
  {
    return null;
  }
  localStorage.setItem('places',JSON.stringify(arr));
  clearValue();
  readData();
}

  // clearValue

function clearValue(){
  place.value='';
  price.value='';
  details.value='';
  image1.value='';
  image2.value='';
  loction.value='';
}
  // 2- readData

function readData(){
  // in table 
  let table ='';
  arr.map((place,id)=>{
    table +=`
    <tr data-index="${id}" draggable="true" class="draggable"> 
      <th>${id}</th>
      <td> ${place.place}</td>
      <td>${place.price}</td>
      <td>
        <button id='delete' onclick="deletItme(${id})">حذف </button>
        <button id='edit' onclick="editItme(${id})">تعديل</button>
      </td>
    </tr>
    `;
    document.getElementById('tbody').innerHTML=table;

    // in Slider 

    let  swiperWrapper='';
    arr.map((card,id)=>{
      swiperWrapper+=
      `
      <div class="card swiper-slide">
        <div class="card-content">
          <img src="${card.image1}" alt="">
          <a href=""><h2>${card.place}</h2></a>
          <p>  ${card.details}</p>
          <a href="" class="btn">اقراء المزيد </a>
        </div>
      </div>
      `
    })
    document.getElementById('swiperwrapper').innerHTML=swiperWrapper;
  })
}
readData();



//  3- delete

function deletItme(itme){
  arr.splice(itme,1);
  localStorage.places=JSON.stringify(arr);
  readData();

}


//  4- update 

function editItme(itme){
  place.value=arr[itme].place;
  price.value=arr[itme].price;
  details.value=arr[itme].details;
  image1.value=arr[itme].image1;
  image2.value=arr[itme].image2;
  loction.value=arr[itme].loction;
  submit.innerHTML="تعديل";
  crudcontrol="Edit";
  indexGlobal=itme
  document.getElementById("crud").scrollIntoView({behavior:"smooth"},true)
  place.focus();
}

let drageStartindex;
let dragEndindx;

function dragStart(){
  drageStartindex= this.getAttribute("data-index");
}
function dragOver(e){
  e.preventDefault();
}

function drop(){
  dragEndindx=this.getAttribute("data-index");
  swapItme(drageStartindex,dragEndindx);
}

function draggableItms()
{
  const draggables=document.querySelectorAll(".draggable");
  draggables.forEach(drag=>{
    drag.addEventListener("dragstart",dragStart)
    drag.addEventListener("dragover",dragOver)
    drag.addEventListener("drop",drop)
  })
}
draggableItms()

function swapItme(start,end)
{
  let text =`هل انت متاكد انك  تريد تبديل رحلة  ${arr[start.place]} الى رحلة ${arr[end]} `

  if(confirm(text))
  {
    let swaping=arr[start];
  arr[start]=arr[end];
  arr[end]=swaping;
  localStorage.setItem("places",JSON.stringify(arr))
  readData();
  location.reload();
  }
  else
  {
    return null 
  }
}



/*=============== 9- Contact Form  ===============*/

let recorting =document.getElementById("recorting");
recorting.addEventListener("click",()=>{
  var speech=true;
  window.SpeechRecognition=window.webkitSpeechRecognition;
  const recognition= new SpeechRecognition();
  recognition.lang="ar-AR";
  recognition.interinResults =true;
  recognition.addEventListener("result", (e)=>{
    const transcript=Array.from(e.results)
    .map(result=> result[0])
    .map(result => result.transcript)
    document.getElementById('textarea').innerText=transcript;
    })
  if(speech)
  {
    recognition.start();
  }
})


/*=============== Light-Dark Theme ===============*/

const themebutton =document.getElementById('theme-button');
const getcurrunttheme=()=>document.body.classList.contains('light-theme') ? 'dark': 'light' ;
const getcurrunticon= () => themebutton.classList.contains('bx-moon') ? 'bx bx-moon':'bx bx-sun';

if(localStorage.getItem('theme'))
{
  document.body.classList[localStorage.getItem('theme')=== 'dark' ? 'add' :'remove']('light-theme');
  themebutton.classList[localStorage.getItem('icon')==='bx bx-moon' ?'add' :'remove']('bx-moon');
}


themebutton.addEventListener('click',()=>{
  document.body.classList.toggle('light-theme')
  themebutton.classList.toggle('bxs-moon');
  localStorage.setItem('theme', getcurrunttheme())
  localStorage.setItem('icon', getcurrunticon())
})