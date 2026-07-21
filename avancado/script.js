(function(){
  const products=[
    {id:"p1",name:"Samsung Galaxy S25 Ultra",category:"smartphones",type:"phone",price:7699,oldPrice:8499,rating:4.9,reviews:218,stock:true,badge:"Destaque",image:"https://api.samsungmobilepress.com/api/v1/file/E2D865121417BED4CCCE3AB6288204C6D10F27F744C5DA9475826F3CB5DC71EF261AC479715828213145AFB12DE9D44B464767C4A30B4E584FA0694EC4CE33A95AF3914FF18C9539AD4BDB058282C9FA128C39363B2D1503347D5496C2410128A8340AD04090BD6582AE881B89F5B2257FA7343BBEC5725513CA21B107939A25B9AF41361FF726E729CE0E44560746EC",imageAlt:"Samsung Galaxy S25 Ultra",description:"Smartphone premium da Samsung com S Pen integrada, estrutura em titânio e recursos Galaxy AI.",features:["Tela de 6,9 polegadas","S Pen integrada","Câmera ultra-wide de 50 MP","Resistência IP68"]},
    {id:"p2",name:"Sony WH-1000XM5",category:"audio",type:"headphones",price:2299,oldPrice:2599,rating:4.8,reviews:487,stock:true,badge:"-12%",sale:true,image:"https://www.sony.com.br/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",imageAlt:"Headphone Sony WH-1000XM5",description:"Headphone sem fio Sony com cancelamento de ruído, chamadas nítidas e acabamento confortável.",features:["Cancelamento de ruído","Bluetooth sem fio","Modo som ambiente","Estojo de transporte"]},
    {id:"p3",name:"MacBook Air 13” com M5",category:"computadores",type:"laptop",price:12499,oldPrice:null,rating:4.9,reviews:94,stock:true,badge:"Novo",image:"https://www.apple.com/v/macbook-air/z/images/overview/hero/hero_static__c9sislzzicq6_large.png",imageAlt:"Dois MacBook Air de 13 polegadas na cor azul-céu",description:"Notebook fino e leve da Apple com chip M5, tela Liquid Retina e bateria para trabalhar longe da tomada.",features:["Chip Apple M5","Tela Liquid Retina","Design fino e leve","macOS"]},
    {id:"p4",name:"Apple Watch Series 11",category:"wearables",type:"watch",price:5499,oldPrice:5799,rating:4.7,reviews:163,stock:true,badge:"Novo",image:"https://www.apple.com/v/apple-watch-series-11/c/images/overview/contrast/contrast_s11__dkui1dgfuwcy_large.png",imageAlt:"Apple Watch Series 11 em ouro rosa",description:"Relógio inteligente da Apple com recursos de saúde, atividade física e conectividade no pulso.",features:["Pontuação de sono","Apps de saúde","GPS integrado","watchOS"]},
    {id:"p5",name:"Logitech MX Mechanical Mini",category:"acessorios",type:"keyboard",price:999,oldPrice:null,rating:4.8,reviews:121,stock:true,badge:null,image:"https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/mx-mechanical/gallery/mx-mechanical-mini/mx-mechanical-mini-mini-keyboard-top-view-graphite-us.png",imageAlt:"Teclado Logitech MX Mechanical Mini grafite",description:"Teclado mecânico compacto e iluminado da Logitech para produtividade em vários dispositivos.",features:["Formato compacto","Iluminação inteligente","Conexão sem fio","Easy-Switch"]},
    {id:"p6",name:"JBL Flip 6",category:"audio",type:"speaker",price:699,oldPrice:799,rating:4.6,reviews:205,stock:false,badge:"Esgotando",image:"https://www.jbl.com.br/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw4e91d6eb/1_JBL_FLIP6_HERO_BLACK_29391_x2.png?sw=535&sh=535",imageAlt:"Caixa de som portátil JBL Flip 6 preta",description:"Caixa de som portátil JBL com som potente, proteção contra água e poeira e design fácil de levar.",features:["Proteção IP67","Até 12h de reprodução","Bluetooth","JBL PartyBoost"]},
    {id:"p7",name:"Controle sem Fio Xbox",category:"acessorios",type:"game",price:499,oldPrice:549,rating:4.7,reviews:279,stock:true,badge:"Oferta",sale:true,image:"https://assets.xboxservices.com/assets/55/83/55836945-e141-4d47-9dad-21d902948816.jpg?n=111101_Gallery-0_1_1350x759.jpg",imageAlt:"Controle sem Fio Xbox Carbon Black",description:"Controle Xbox com design ergonômico, botão de compartilhamento e conexão Bluetooth.",features:["Bluetooth","Botão Compartilhar","Direcional híbrido","Xbox, PC e celular"]},
    {id:"p8",name:"Canon EOS R50",category:"acessorios",type:"camera",price:4999,oldPrice:null,rating:4.9,reviews:68,stock:true,badge:"Criadores",image:"https://www.canon.com.br/img/bloco/conteudo/item/39881/931x400imagemproduto2.jpg",imageAlt:"Câmera mirrorless Canon EOS R50",description:"Câmera mirrorless Canon compacta para fotografia, vídeos 4K e criação de conteúdo.",features:["Sensor APS-C de 24,2 MP","Processador DIGIC X","Vídeo 4K","Dual Pixel CMOS AF II"]}
  ];
  const labels={all:"Todos",smartphones:"Smartphones",audio:"Áudio",computadores:"Computadores",wearables:"Wearables",acessorios:"Acessórios"};
  const storageKey="nexora_shop_v1";
  let stored={};
  try{stored=JSON.parse(localStorage.getItem(storageKey))||{}}catch(e){stored={}}
  let cart=Array.isArray(stored.cart)?stored.cart:[];
  let favorites=Array.isArray(stored.favorites)?stored.favorites:[];
  let filters={category:"all",price:"all",stock:false,search:"",sort:"featured",favoriteOnly:false,saleOnly:false};
  let checkoutData={};

  const money=value=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0}).format(value);
  const escapeHtml=value=>String(value??"").replace(/[&<>'"]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]);
  const productById=id=>products.find(product=>product.id===id);
  const save=()=>localStorage.setItem(storageKey,JSON.stringify({cart,favorites}));
  const productImageMarkup=product=>`<img class="product-photo" src="${product.image}" alt="${product.imageAlt}" loading="lazy" decoding="async" />`;
  const icon=name=>`<svg class="ui-icon" aria-hidden="true"><use href="../icons.svg#${name}"></use></svg>`;
  const stars=()=>Array.from({length:5},()=>icon("star")).join("");
  const cartQuantity=()=>cart.reduce((sum,item)=>sum+item.qty,0);
  const cartTotal=()=>cart.reduce((sum,item)=>sum+productById(item.id).price*item.qty,0);

  function filteredProducts(){
    let result=products.filter(product=>{
      const categoryOk=filters.category==="all"||product.category===filters.category;
      const searchOk=!filters.search||(product.name+" "+labels[product.category]).toLowerCase().includes(filters.search.toLowerCase());
      const stockOk=!filters.stock||product.stock;
      const favoriteOk=!filters.favoriteOnly||favorites.includes(product.id);
      const saleOk=!filters.saleOnly||product.sale||product.oldPrice;
      let priceOk=true;
      if(filters.price==="under500")priceOk=product.price<500;
      if(filters.price==="500to1500")priceOk=product.price>=500&&product.price<=1500;
      if(filters.price==="over1500")priceOk=product.price>1500;
      return categoryOk&&searchOk&&stockOk&&favoriteOk&&saleOk&&priceOk;
    });
    if(filters.sort==="low")result.sort((a,b)=>a.price-b.price);
    if(filters.sort==="high")result.sort((a,b)=>b.price-a.price);
    if(filters.sort==="rating")result.sort((a,b)=>b.rating-a.rating);
    return result;
  }

  function productCard(product){
    const favorite=favorites.includes(product.id);
    return `
      <article class="product-card">
        <div class="product-media">
          ${product.badge?`<span class="product-badge ${product.sale?"sale":""}">${product.badge}</span>`:""}
          <button class="favorite ${favorite?"active":""}" data-action="toggle-favorite" data-id="${product.id}" type="button" aria-label="${favorite?"Remover dos":"Adicionar aos"} favoritos">${icon("heart")}</button>
          <button class="product-open" data-action="open-product" data-id="${product.id}" type="button" aria-label="Ver detalhes de ${product.name}">${productImageMarkup(product)}</button>
        </div>
        <div class="product-body">
          <span class="product-category">${labels[product.category]}</span>
          <h3>${product.name}</h3>
          <div class="rating">${stars()} <span>${product.rating} (${product.reviews})</span></div>
          <div class="product-price"><div>${product.oldPrice?`<del>${money(product.oldPrice)}</del>`:""}<strong>${money(product.price)}</strong></div><button class="add-button" data-action="add-cart" data-id="${product.id}" type="button" aria-label="Adicionar ${product.name} ao carrinho">${icon("plus")}</button></div>
        </div>
      </article>
    `;
  }

  function renderProducts(){
    const result=filteredProducts();
    document.getElementById("product-grid").innerHTML=result.map(productCard).join("");
    document.getElementById("product-grid").hidden=result.length===0;
    document.getElementById("empty-products").hidden=result.length!==0;
    document.getElementById("result-count").textContent=result.length+" produto"+(result.length===1?"":"s")+" encontrado"+(result.length===1?"":"s");
    document.querySelectorAll("#category-nav button[data-category]").forEach(button=>button.classList.toggle("active",button.dataset.category===filters.category&&!filters.favoriteOnly&&!filters.saleOnly));
    renderActiveFilters();
  }

  function renderCategories(){
    document.getElementById("category-filters").innerHTML=Object.keys(labels).map(category=>{
      const count=category==="all"?products.length:products.filter(product=>product.category===category).length;
      return `<button class="${filters.category===category?"active":""}" data-action="set-category" data-category="${category}" type="button">${labels[category]} <span>${count}</span></button>`;
    }).join("");
  }

  function renderActiveFilters(){
    const active=[];
    if(filters.category!=="all")active.push([labels[filters.category],"category"]);
    if(filters.price!=="all")active.push([filters.price==="under500"?"Até R$ 500":filters.price==="500to1500"?"R$ 500 — R$ 1.500":"Acima de R$ 1.500","price"]);
    if(filters.stock)active.push(["Pronta entrega","stock"]);
    if(filters.search)active.push(['Busca: \"'+filters.search+'\"',"search"]);
    if(filters.favoriteOnly)active.push(["Somente favoritos","favorites"]);
    if(filters.saleOnly)active.push(["Somente ofertas","sale"]);
    document.getElementById("active-filters").innerHTML=active.map(item=>`<button class="active-filter" data-action="remove-filter" data-filter="${item[1]}" type="button">${item[0]} ${icon("x")}</button>`).join("");
  }

  function renderBadges(){
    document.getElementById("cart-count").textContent=cartQuantity();
    document.getElementById("favorite-count").textContent=favorites.length;
  }

  function addToCart(id){
    const existing=cart.find(item=>item.id===id);
    if(existing)existing.qty+=1;else cart.push({id,qty:1});
    save();renderBadges();renderCart();
    showToast("Produto adicionado",productById(id).name+" entrou no carrinho.");
  }

  function changeQuantity(id,amount){
    const item=cart.find(entry=>entry.id===id);
    if(!item)return;
    item.qty+=amount;
    if(item.qty<=0)cart=cart.filter(entry=>entry.id!==id);
    save();renderBadges();renderCart();
  }

  function renderCart(){
    const items=document.getElementById("cart-items");
    const footer=document.getElementById("cart-footer");
    document.getElementById("drawer-count").textContent=cartQuantity()+" ite"+(cartQuantity()===1?"m":"ns");
    if(!cart.length){
      items.innerHTML=`<div class="empty-cart">${icon("shopping-bag")}<h3>Seu carrinho está vazio</h3><p>Adicione produtos para continuar.</p></div>`;
      footer.innerHTML="";
      return;
    }
    items.innerHTML=cart.map(item=>{
      const product=productById(item.id);
      return `<article class="cart-item"><div class="cart-thumb">${productImageMarkup(product)}</div><div><strong>${product.name}</strong><small>${money(product.price)}</small><div class="quantity"><button data-action="cart-minus" data-id="${product.id}" type="button" aria-label="Diminuir quantidade">${icon("minus")}</button><span>${item.qty}</span><button data-action="cart-plus" data-id="${product.id}" type="button" aria-label="Aumentar quantidade">${icon("plus")}</button></div></div><button class="remove-item" data-action="cart-remove" data-id="${product.id}" type="button" aria-label="Remover">${icon("trash")}</button></article>`;
    }).join("");
    const shipping=cartTotal()>=299?"Frete grátis aplicado":"Faltam "+money(299-cartTotal())+" para o frete grátis";
    footer.innerHTML=`<div class="cart-total"><span>Subtotal</span><strong>${money(cartTotal())}</strong></div><button class="button primary" data-action="open-checkout" type="button">Finalizar compra ${icon("arrow-right")}</button><p class="shipping-note">${shipping}</p>`;
  }

  function openCart(){
    document.getElementById("drawer-backdrop").hidden=false;
    const drawer=document.getElementById("cart-drawer");
    drawer.classList.add("open");drawer.setAttribute("aria-hidden","false");
    document.body.classList.add("locked");
  }
  function closeCart(){
    document.getElementById("drawer-backdrop").hidden=true;
    const drawer=document.getElementById("cart-drawer");
    drawer.classList.remove("open");drawer.setAttribute("aria-hidden","true");
    if(document.getElementById("checkout-modal").hidden)document.body.classList.remove("locked");
  }

  function openProduct(id){
    const product=productById(id);
    const modal=document.getElementById("product-modal");
    modal.innerHTML=`<section class="modal" role="dialog" aria-modal="true" aria-label="Detalhes de ${product.name}"><button class="modal-close" data-action="close-product" type="button" aria-label="Fechar">${icon("x")}</button><div class="product-modal-content"><div class="modal-media">${productImageMarkup(product)}</div><div class="modal-copy"><span class="product-category">${labels[product.category]}</span><h2>${product.name}</h2><div class="rating">${stars()} <span>${product.rating} · ${product.reviews} avaliações</span></div><p>${product.description}</p><div class="modal-features">${product.features.map(feature=>`<span>${icon("check")} ${feature}</span>`).join("")}</div><div class="modal-buy"><div>${product.oldPrice?`<del>${money(product.oldPrice)}</del>`:""}<strong>${money(product.price)}</strong></div><button class="button primary" data-action="add-cart-close" data-id="${product.id}" type="button">Adicionar ao carrinho ${icon("arrow-right")}</button></div></div></div></section>`;
    modal.hidden=false;document.body.classList.add("locked");
  }
  function closeProduct(){document.getElementById("product-modal").hidden=true;document.getElementById("product-modal").innerHTML="";document.body.classList.remove("locked")}

  function renderCheckout(step){
    const modal=document.getElementById("checkout-modal");
    if(step===1){
      modal.innerHTML=`<form class="modal checkout" id="checkout-form" data-step="1" role="dialog" aria-modal="true" aria-label="Finalizar compra"><button class="modal-close" data-action="close-checkout" type="button" aria-label="Fechar checkout">${icon("x")}</button><span class="eyebrow">Checkout seguro</span><h2>Dados para entrega</h2><p>Etapa 1 de 2 · Preencha para continuar.</p><div class="steps"><i class="active"></i><i></i></div><div class="checkout-grid"><label class="full">Nome completo<input name="name" value="${escapeHtml(checkoutData.name)}" required /></label><label>E-mail<input name="email" type="email" value="${escapeHtml(checkoutData.email)}" required /></label><label>WhatsApp<input name="phone" type="tel" value="${escapeHtml(checkoutData.phone)}" required /></label><label>CEP<input name="zip" inputmode="numeric" value="${escapeHtml(checkoutData.zip)}" required /></label><label>Cidade<input name="city" value="${escapeHtml(checkoutData.city)}" required /></label><label class="full">Endereço<input name="address" value="${escapeHtml(checkoutData.address)}" required /></label></div><div class="checkout-actions"><button class="button ghost" data-action="close-checkout" type="button">Cancelar</button><button class="button primary" type="submit">Continuar ${icon("arrow-right")}</button></div></form>`;
    }else if(step===2){
      modal.innerHTML=`<form class="modal checkout" id="checkout-form" data-step="2" role="dialog" aria-modal="true" aria-label="Pagamento"><button class="modal-close" data-action="close-checkout" type="button" aria-label="Fechar checkout">${icon("x")}</button><span class="eyebrow">Checkout seguro</span><h2>Pagamento e revisão</h2><p>Etapa 2 de 2 · Esta é uma compra demonstrativa.</p><div class="steps"><i class="active"></i><i class="active"></i></div><div class="order-review"><div><h3>Forma de pagamento</h3><div class="payment-options"><label><input type="radio" name="payment" value="pix" checked /> PIX · 5% de desconto</label><label><input type="radio" name="payment" value="card" /> Cartão · até 12x sem juros</label><label><input type="radio" name="payment" value="boleto" /> Boleto bancário</label></div></div><aside class="review-box"><h3>Resumo</h3><div class="review-row"><span>Produtos</span><strong>${cartQuantity()} item(ns)</strong></div><div class="review-row"><span>Frete</span><strong>Grátis</strong></div><div class="review-row total"><span>Total</span><strong>${money(cartTotal())}</strong></div></aside></div><div class="checkout-actions"><button class="button ghost" data-action="checkout-back" type="button">${icon("arrow-left")} Voltar</button><button class="button primary" type="submit">Confirmar pedido</button></div></form>`;
    }else{
      const order="NX"+Math.floor(100000+Math.random()*900000);
      modal.innerHTML=`<section class="modal success-order" role="dialog" aria-modal="true" aria-label="Pedido confirmado"><b>${icon("check")}</b><h2>Pedido confirmado!</h2><p>O pedido <strong>#${order}</strong> foi criado. Esta loja é demonstrativa, então nenhuma cobrança foi realizada.</p><button class="button primary" data-action="finish-checkout" type="button">Voltar para a loja</button></section>`;
    }
    modal.hidden=false;document.body.classList.add("locked");
  }
  function closeCheckout(){document.getElementById("checkout-modal").hidden=true;document.getElementById("checkout-modal").innerHTML="";document.body.classList.remove("locked")}

  function clearFilters(){
    filters={category:"all",price:"all",stock:false,search:"",sort:"featured",favoriteOnly:false,saleOnly:false};
    document.getElementById("search-input").value="";
    document.getElementById("sort-select").value="featured";
    document.querySelector('input[name="price"][value="all"]').checked=true;
    document.getElementById("stock-only").checked=false;
    renderCategories();renderProducts();
  }

  function showToast(title,message){
    const toast=document.getElementById("toast");
    document.getElementById("toast-title").textContent=title;
    document.getElementById("toast-message").textContent=message;
    toast.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.hidden=true,3300);
  }

  document.addEventListener("click",event=>{
    const target=event.target.closest("[data-action]");
    if(!target)return;
    const action=target.dataset.action,id=target.dataset.id;
    if(action==="add-cart")addToCart(id);
    if(action==="quick-add"){addToCart(id);openCart()}
    if(action==="add-cart-close"){addToCart(id);closeProduct();openCart()}
    if(action==="open-product")openProduct(id);
    if(action==="close-product")closeProduct();
    if(action==="toggle-favorite"){
      favorites=favorites.includes(id)?favorites.filter(item=>item!==id):[...favorites,id];save();renderBadges();renderProducts();
    }
    if(action==="open-cart")openCart();
    if(action==="close-cart")closeCart();
    if(action==="cart-minus")changeQuantity(id,-1);
    if(action==="cart-plus")changeQuantity(id,1);
    if(action==="cart-remove"){cart=cart.filter(item=>item.id!==id);save();renderBadges();renderCart()}
    if(action==="set-category"){
      filters.category=target.dataset.category;filters.favoriteOnly=false;filters.saleOnly=false;renderCategories();renderProducts();
    }
    if(action==="toggle-favorites"){
      filters.favoriteOnly=!filters.favoriteOnly;filters.saleOnly=false;renderProducts();document.getElementById("catalogo").scrollIntoView();
    }
    if(action==="show-deals"){
      filters.saleOnly=true;filters.favoriteOnly=false;renderProducts();document.getElementById("catalogo").scrollIntoView();
    }
    if(action==="remove-filter"){
      const key=target.dataset.filter;
      if(key==="category")filters.category="all";
      if(key==="price"){filters.price="all";document.querySelector('input[name="price"][value="all"]').checked=true}
      if(key==="stock"){filters.stock=false;document.getElementById("stock-only").checked=false}
      if(key==="search"){filters.search="";document.getElementById("search-input").value=""}
      if(key==="favorites")filters.favoriteOnly=false;
      if(key==="sale")filters.saleOnly=false;
      renderCategories();renderProducts();
    }
    if(action==="clear-filters")clearFilters();
    if(action==="toggle-filters"){
      document.getElementById("filters").classList.toggle("open");document.body.classList.toggle("locked",document.getElementById("filters").classList.contains("open"));
    }
    if(action==="toggle-mobile-menu")document.getElementById("category-nav").classList.toggle("open");
    if(action==="open-checkout"){closeCart();renderCheckout(1)}
    if(action==="close-checkout")closeCheckout();
    if(action==="checkout-back")renderCheckout(1);
    if(action==="finish-checkout")closeCheckout();
  });

  document.getElementById("category-nav").addEventListener("click",event=>{
    const button=event.target.closest("[data-category]");
    if(button){filters.category=button.dataset.category;filters.favoriteOnly=false;filters.saleOnly=false;renderCategories();renderProducts();document.getElementById("catalogo").scrollIntoView();document.getElementById("category-nav").classList.remove("open")}
  });
  document.getElementById("header-search").addEventListener("submit",event=>{event.preventDefault();filters.search=document.getElementById("search-input").value.trim();renderProducts();document.getElementById("catalogo").scrollIntoView()});
  document.getElementById("search-input").addEventListener("input",event=>{filters.search=event.target.value.trim();renderProducts()});
  document.getElementById("sort-select").addEventListener("change",event=>{filters.sort=event.target.value;renderProducts()});
  document.querySelectorAll('input[name="price"]').forEach(input=>input.addEventListener("change",event=>{filters.price=event.target.value;renderProducts()}));
  document.getElementById("stock-only").addEventListener("change",event=>{filters.stock=event.target.checked;renderProducts()});
  document.getElementById("drawer-backdrop").addEventListener("click",closeCart);
  document.getElementById("product-modal").addEventListener("click",event=>{if(event.target.id==="product-modal")closeProduct()});
  document.getElementById("checkout-modal").addEventListener("click",event=>{if(event.target.id==="checkout-modal")closeCheckout()});
  document.getElementById("checkout-modal").addEventListener("submit",event=>{
    if(event.target.id!=="checkout-form")return;
    event.preventDefault();
    if(event.target.dataset.step==="1"){checkoutData=Object.fromEntries(new FormData(event.target));renderCheckout(2)}
    else{cart=[];save();renderBadges();renderCart();renderCheckout(3)}
  });
  document.getElementById("newsletter-form").addEventListener("submit",event=>{event.preventDefault();event.target.reset();showToast("Você entrou para a lista","As próximas novidades chegarão no seu e-mail.")});
  document.addEventListener("keydown",event=>{
    if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();document.getElementById("search-input").focus()}
    if(event.key==="Escape"){closeCart();if(!document.getElementById("product-modal").hidden)closeProduct();if(!document.getElementById("checkout-modal").hidden)closeCheckout()}
  });
  document.getElementById("year").textContent=new Date().getFullYear();
  renderCategories();renderProducts();renderBadges();renderCart();
})();
