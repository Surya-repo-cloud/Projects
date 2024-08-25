onload();
function onload()
{
  load();
  cartcounter();
  showcart();
  cartValues();
}
function load()
{
  if(!JSON.parse(localStorage.getItem("cartData")))
    return;
 cartProducts=JSON.parse(localStorage.getItem("cartData"));
}
function cartcounter(){
  let innerHtml='';
  if(cartProducts.length===0)
   innerHtml=`<span id="cart-no-of-items0">0</span>`;
  else
   innerHtml=`<span id="cart-no-of-items">${cartProducts.length}</span>`;
  document.querySelector('#changeinnerhtml').innerHTML=innerHtml;
}
function showcart(){
  container=document.querySelector('.cart');
  let innerHtml='';
  if(cartProducts.length===0)
    innerHtml=`<div class="cart-empty">Your Cart Is Empty</div>`;
  else
  {for(let i=0;i<cartProducts.length;i++)
   {let productPrice=cartProducts[i].actualPrice-cartProducts[i].actualPrice*(cartProducts[i].discountPercent/100);
     innerHtml+=`<div class="cart-item">
     <img src="${cartProducts[i].imageAddress}" class="cart-product-image"> 
     <div class="company">${cartProducts[i].company}</div>
     <div class="product-name">${cartProducts[i].productName}</div>
     <div class="price"><span class="product-price">₹ ${Math.floor(productPrice)}</span>
       <span class="actual-price">₹ ${cartProducts[i].actualPrice}</span>
       <span class="discount-percent">(${cartProducts[i].discountPercent}% off)</span></div>
     <div class="return"><span class="bold">14 Day Return</span><span> is available</span></div>
     <div class="delivery-date">Delivery by <span>30 august</span></div>
     <div class="quantity">Quantity: ${cartProducts[i].quantity}</div>
     <a href='#' class="cross" onclick="remove(${i});cartValues();showcart();cartcounter();save();"><span class="material-symbols-outlined">close</span></a>
     </div>` }
   }   
  container.innerHTML=innerHtml;  
}
function remove(index){
  if(cartProducts[index].quantity===1)
    cartProducts.splice(index,1);
  else
    cartProducts[index].quantity--;
}
function save(){
  localStorage.setItem("cartData",JSON.stringify(cartProducts));
}
function cartValues()
{ 
  let totalItems=0;
  let totalMrp=0;
  let totalDiscount=0;
  let shippingFees=0;
  let total=0;
  for(let i=0;i<cartProducts.length;i++)
  {
   totalItems+=cartProducts[i].quantity;
   totalMrp+=Math.floor(cartProducts[i].quantity*cartProducts[i].actualPrice);
   totalDiscount+=Math.floor(cartProducts[i].quantity*(cartProducts[i].actualPrice*(cartProducts[i].discountPercent/100)));
  }
  total+=totalMrp-totalDiscount;
  if(total<500)
  {
    shippingFees=49;
    total+=49;
  }
  showCartValue(totalItems,totalMrp,totalDiscount,shippingFees,total);
}
function showCartValue(totalItems,totalMrp,totalDiscount,shippingFees,total)
{
  let cartValueSection=document.querySelector('.cart-value');
  let newHtml='';
  if(cartProducts.length===0)
  {
    cartValueSection.classList.add('hide-it');
  }
  if(shippingFees===0)
  {newHtml=`<div class="price-details">Price Details<span class="total-items">( ${totalItems} Items)</span></div>
                <div class="total-mrp">Total MRP<span class="pay1">₹ ${totalMrp}</span></div>
                <div class="discount-on-mrp">Discount On MRP<span class="pay2">-₹ ${totalDiscount}</span></div>
                <div class="shipping-fees">Shipping Fee<span class="pay3 cut-it">₹ 49 <span class="free">Free</span></span></div>
                <div class="total-amount">Total Amount<span class="pay4">₹ ${total}</span></div>
                <button class="place-order-btn">Place Order</button>`;}
  else              
  {newHtml=`<div class="price-details">Price Details<span class="total-items">( ${totalItems} Items)</span></div>
          <div class="total-mrp">Total MRP<span class="pay1">₹ ${totalMrp}</span></div>
          <div class="discount-on-mrp">Discount On MRP<span class="pay2">-₹ ${totalDiscount}</span></div>
          <div class="shipping-fees">Shipping Fee<span class="pay3">₹ ${shippingFees}</span></div>
          <div class="total-amount">Total Amount<span class="pay4">₹ ${total}</span></div>
          <button class="place-order-btn">Place Order</button>`;}
  cartValueSection.innerHTML=newHtml;
}