let arr=JSON.parse(localStorage.places);

  // 1 - readData

function readData(){
  let table ='';
  arr.map((place,id)=>{
    table +=`
    <div class="col-md-4 col-sm-12">
      <div class="cart_product">
        <img src="${place.image1}" alt="">
        <h2>${place.place}</h2>
        <p>${place.details}</p>
        <button onclick="addtocart(${id})" id="cart_btn">حفظ فى السلة</button>
      </div> 
    </div>
    `;
    document.getElementById('products').innerHTML=table;

  })
}
readData();


  // 2- Search

let input=document.getElementById("search");
input.addEventListener("keyup",({keyCode,target})=>{
if(keyCode===13)
{
  search(target.value.trim());
  if(target.value.trim()==="")
  {
    readData()
  }
}
})

function search(title)
{
  arr.map(product=>{
  let table ='';
    if(product.place.indexOf(title) !== -1)
    {
      table +=`
      <div class="col-md-4 col-sm-12">
        <div class="cart_product">
          <img src="${product.image1}" alt="">
          <h2>${product.place}</h2>
          <p>${product.details}</p>
          <button id="cart_btn">حفظ فى السلة</button>
        </div> 
      </div>
      `;
      document.getElementById('products').innerHTML=table;
    }
  })
}

let allitme=[]

function addtocart(id)
{
  let cartitems =document.getElementById("cart-items");

  let selecteditme=arr[id];

  let itme =allitme.find(i=> i.place===selecteditme.place)
  selecteditme.count=1;

  if(itme)
  {
    selecteditme.count++;
  }
  else
  {
    allitme.push(selecteditme);
  }

  cartitems.innerHTML='';
  allitme.forEach(itme=>{
    cartitems.innerHTML+=`
      <h2>${itme.place } - ${itme.count}</h2>
    `
  })

}