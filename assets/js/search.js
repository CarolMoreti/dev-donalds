const categories = document.querySelectorAll('.category');
const productsDiv = document.getElementById('products');

const products = {
  lanches: [
    { name: 'Cheddar McMelt', img: 'image 7.png', description: 'Pão escuro, carne 100% bovina e muito cheddar cremoso.', price: '36,90', ingredients: 'Pão escuro, carne bovina, cheddar cremoso, cebola ao shoyu.' },
    { name: 'McNífico Bacon', img: 'image 6.png', description: 'Hambúrguer suculento, bacon crocante e queijo derretido.', price: '37,90', ingredients: 'Pão, carne bovina, bacon, queijo cheddar, alface, tomate, cebola, maionese.' },
    { name: 'Big Mac', img: 'image 1.png', description: 'Dois hambúrgueres (100% carne bovina), alface americana...', price: '39,90', ingredients: 'Pão com gergelim, carne bovina, queijo, alface americana, molho especial, picles, cebola.' },
    { name: 'Duplo Quarterão', img: 'image 2.png', description: 'Dois hambúrgueres, queijo, cebola, picles e ketchup.', price: '42,90', ingredients: 'Pão com gergelim, duas carnes bovinas, queijo cheddar, cebola, picles, ketchup, mostarda.' },
    { name: 'Duplo Cheddar McMelt', img: 'image 5.png', description: 'O dobro de carne e cheddar cremoso.', price: '45,90', ingredients: 'Pão escuro, duas carnes bovinas, cheddar cremoso, cebola ao shoyu.' }
  ],
  fritas: [
    { name: 'Fritas Pequena', img: 'image 9.png', description: 'Porção grande de batatas crocantes.', price: '15,90', ingredients: 'Batatas, óleo vegetal, sal.' },
    { name: 'Fritas Média', img: 'image 8.png', description: 'Porção média para dividir.', price: '12,90', ingredients: 'Batatas, óleo vegetal, sal.' },
    { name: 'Fritas Grande', img: 'image 10.png', description: 'Porção individual de batatas.', price: '9,90', ingredients: 'Batatas, óleo vegetal, sal.' }
  ],
  sobremesas: [
    { name: 'Casquinha Baunilha', img: 'image 11.png', description: 'Sorvete cremoso de baunilha.', price: '4,50', ingredients: 'Leite, açúcar, aroma de baunilha.' },
    { name: 'Casquinha Chocolate', img: 'image 12.png', description: 'Sorvete com cobertura sabor chocolate.', price: '4,50', ingredients: 'Leite, açúcar, cacau em pó, aroma de baunilha.' },
    { name: 'Casquinha Mista', img: 'image 13.png', description: 'Baunilha e chocolate em uma só casquinha.', price: '4,50', ingredients: 'Leite, açúcar, aroma de baunilha, cacau em pó.' }
  ],
  bebidas: [
    { name: 'Coca-Cola', img: 'image 15.png', description: 'Refrigerante gelado e refrescante.', price: '7,00', ingredients: 'Água gaseificada, açúcar, corante caramelo IV, acidulante ácido fosfórico, cafeína, aromatizantes.' },
    { name: 'Fanta', img: 'image 16.png', description: 'Refrigerante sabor laranja.', price: '6,50', ingredients: 'Água gaseificada, açúcar, suco de laranja, acidulantes, corantes naturais, conservantes.' },
    { name: 'Água', img: 'image 17.png', description: 'Água mineral.', price: '3,00', ingredients: 'Água mineral natural.' }
  ]
};

function showProducts(category) {
  productsDiv.innerHTML = '';

  products[category].forEach(prod => {
    const item = document.createElement('div');
    item.classList.add('product-card');

    item.innerHTML = `
      <a href="./produto.html?name=${encodeURIComponent(prod.name)}&description=${encodeURIComponent(prod.description)}&price=${encodeURIComponent(prod.price)}&img=${encodeURIComponent(prod.img)}&ingredients=${encodeURIComponent(prod.ingredients)}" class="product-info">
        <h3>${prod.name}</h3>
        <p class="description">${prod.description}</p>
        <p class="price">R$ ${prod.price}</p>
      </a>
      <img src="./assets/img/${prod.img}" alt="${prod.name}" class="product-img">
    `;

    productsDiv.appendChild(item);
  });
}

categories.forEach(cat => {
  cat.addEventListener('click', function () {
    categories.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    showProducts(this.dataset.category);
  });
});

if (productsDiv) {
  // Página de restaurante
  showProducts('lanches');
} else {
  // Página de produto
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const desc = params.get('description');
  const price = params.get('price');
  const img = params.get('img');
  const ingredients = params.get('ingredients');

  if (name) {
    document.getElementById('product-name').textContent = name;
    document.getElementById('product-desc').textContent = desc;
    document.getElementById('product-price').textContent = `R$ ${price}`;
    document.getElementById('product-ingredients').textContent = ingredients;

    // Corrige o background com o caminho correto
    document.querySelector('header').style.backgroundImage = `url('./assets/img/${img}')`;
  }
}

const btnSacola = document.querySelector('.btn-orders'); // botão da sacola
const sacola = document.getElementById('sacola');

btnSacola.addEventListener('click', () => {
    sacola.classList.toggle('aberta');
});
const btnFecharSacola = document.getElementById('fechar-sacola');

btnFecharSacola.addEventListener('click', () => {
    sacola.classList.remove('aberta');
});

function salvarSacola(sacola) {
  localStorage.setItem('sacola', JSON.stringify(sacola));
}

function carregarSacola() {
  const sacola = localStorage.getItem('sacola');
  return sacola ? JSON.parse(sacola) : [];
}

function renderizarSacola() {
  const listaPedidos = document.getElementById('lista-pedidos');
  if (!listaPedidos) return;

  listaPedidos.innerHTML = '';
  const sacola = carregarSacola();

  sacola.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="produto-sacola">
        <img src="./assets/img/${item.img}" alt="${item.name}" class="product-img">
        <div class="text-sacola">
          <p>${item.name}</p>
          <h1>${item.price}</h1>
          <div class="number-display-container">
            <button class="next-button"> - </button>
            <span class="page-number">${item.quantity}</span>
            <button class="next-button-plus"> + </button>
          </div>
          <button class="delete-button">Excluir</button>
        </div>
      </div>
    `;

    // Botões quantidade
    const diminuir = li.querySelector('.next-button');
    const aumentar = li.querySelector('.next-button-plus');
    const displayNumberSpan = li.querySelector('.page-number');
    const deleteBtn = li.querySelector('.delete-button');

    let currentNumber = item.quantity;

    aumentar.addEventListener('click', () => {
      currentNumber++;
      displayNumberSpan.textContent = currentNumber;
      sacola[index].quantity = currentNumber;
      salvarSacola(sacola);
    });

    diminuir.addEventListener('click', () => {
      if (currentNumber > 1) {
        currentNumber--;
        displayNumberSpan.textContent = currentNumber;
        sacola[index].quantity = currentNumber;
        salvarSacola(sacola);
      }
    });

    deleteBtn.addEventListener('click', () => {
      sacola.splice(index, 1); // Remove do array
      salvarSacola(sacola);
      renderizarSacola(); // Atualiza a lista
    });

    listaPedidos.appendChild(li);
  });
}

renderizarSacola();

const addBtn = document.getElementById('add');
const listaPedidos = document.getElementById('lista-pedidos');

if (addBtn && listaPedidos) {
  addBtn.addEventListener('click', () => {
    const nome = document.getElementById('product-name').textContent;
    const preco = document.getElementById('product-price').textContent;

    const params = new URLSearchParams(window.location.search);
    const img = params.get('img');

    let sacola = carregarSacola();

    // Verifica se já existe o produto na sacola
    const index = sacola.findIndex(item => item.name === nome);
    if (index !== -1) {
      sacola[index].quantity += 1; // Aumenta a quantidade
    } else {
      sacola.push({ name: nome, price: preco, img: img, quantity: 1 });
    }
    
    salvarSacola(sacola);
    renderizarSacola();
    
  });
}



function atualizarResumo() {
  const sacola = carregarSacola();

  let subtotal = 0;
  sacola.forEach(item => {
    const precoNumerico = parseFloat(item.price.replace('R$', '').trim().replace(',', '.'));
    subtotal += precoNumerico * item.quantity;
  });

  const descontos = 0.00;

  document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('descontos').textContent = `R$ ${descontos.toFixed(2).replace('.', ',')}`;
  document.getElementById('total').textContent = `R$ ${(subtotal - descontos).toFixed(2).replace('.', ',')}`;
  salvarSacola(sacola);
}



atualizarResumo();
