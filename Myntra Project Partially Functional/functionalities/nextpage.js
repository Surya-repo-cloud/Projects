function assignment()
{
  let productsContainer= document.querySelector('#div1');
  if(!productsContainer)
    return;
  newHtml='';
  for(let i=0;i<productArr.length;i++)
  {
    let productPrice=productArr[i].actualPrice-(productArr[i].actualPrice*(productArr[i].discountPercent/100));
    if(productArr[i].ratings.noOfRating!==0)
    {newHtml+=`<a href="#" class="product-container"><img src="${productArr[i].imageAddress}" alt="product1">
          <span class="product">
            <span class="ratings">${productArr[i].ratings.stars}⭐|<span>${(productArr[i].ratings.noOfRating>1000)?productArr[i].ratings.noOfRating/100+`k`:productArr[i].ratings.noOfRating}</span></span>
            <div class="company">${productArr[i].company}</div>
            <div class="product-name">${productArr[i].productName}</div>
            <div class="price">
              <span class="product-price">Rs.${Math.floor(productPrice)}</span>
              <span class="actual-price">Rs.${productArr[i].actualPrice}</span>
              <span class="discount-percent">(${productArr[i].discountPercent}% off)</span>
            </div>
            <button class="add-btn" onclick="addtocart(${i});cartcounter();save();">Add to cart</button>
          </span>
        </a>`;}
        else
        {newHtml+=`<a href="#" class="product-container"><img src="${productArr[i].imageAddress}" alt="product1">
          <span class="product">
            <span class="hide">${productArr[i].ratings.stars}⭐|<span>${(productArr[i].ratings.noOfRating>1000)?productArr[i].ratings.noOfRating/100+`k`:productArr[i].ratings.noOfRating}</span></span>
            <div class="company">${productArr[i].company}</div>
            <div class="product-name">${productArr[i].productName}</div>
            <div class="price">
              <span class="product-price">Rs.${Math.floor(productPrice)}</span>
              <span class="actual-price">Rs.${productArr[i].actualPrice}</span>
              <span class="discount-percent">(${productArr[i].discountPercent}% off)</span>
            </div>
            <button class="add-btn" onclick="addtocart(${i});cartcounter();save();">Add to cart</button>
          </span>
        </a>`;}
        productsContainer.innerHTML=newHtml;
  }
} 
let cartProducts=[];
function addtocart(index)
{
  for(let i=0;i<cartProducts.length;i++)
  {
    if(cartProducts[i].imageIndex===productArr[index].imageIndex)
    {cartProducts[i].quantity++;
      console.log('i am in loop');
      return;
    }
  }
  console.log('i am outside loop');
  cartProducts.push(productArr[index]);
}
function cartcounter(){
  let innerHtml='';
  if(cartProducts.length===0)
   innerHtml=`<span id="cart-no-of-items0">0</span>`;
  else
   innerHtml=`<span id="cart-no-of-items">${cartProducts.length}</span>`;
  document.querySelector('#changeinnerhtml').innerHTML=innerHtml;
}
function save(){
  localStorage.setItem("cartData",JSON.stringify(cartProducts));
}
function load(){
  if(!JSON.parse(localStorage.getItem("cartData")))
    return;
  cartProducts=JSON.parse(localStorage.getItem("cartData"));
}
function onload(){
  assignment();
  load();
  cartcounter();
}
onload();