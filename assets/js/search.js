window.addEventListener('DOMContentLoaded', () => {

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

const btnSacola = document.getElementById('btn-orders'); // botão da sacola
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
function esvaziarSacola() {
  localStorage.removeItem('sacola'); // Remove o item 'sacola' do localStorage
  renderizarSacola(); // Renderiza a sacola novamente (que estará vazia)
  console.log('Sacola esvaziada!');
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

function atualizarResumoSacolaFlutuante() {
  const itensSacola = carregarSacola();
  let total = 0;
  let quantidadeTotal = 0;

  itensSacola.forEach(item => {
    const precoNumerico = parseFloat(item.price.toString().replace('R$', '').trim().replace(',', '.'));
    total += precoNumerico * item.quantity;
    quantidadeTotal += item.quantity;
  });

  const resumoTotal = document.getElementById('resumo-total');
  const resumoItens = document.getElementById('resumo-itens');
  const resumo = document.getElementById('resumo-sacola-pop');

  if (resumoTotal && resumoItens && resumo) {
    resumoTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    resumoItens.textContent = quantidadeTotal;

    if (quantidadeTotal > 0) {
      resumo.classList.add('ativa');
    } else {
      resumo.classList.remove('ativa');
    }
  }
}
    const finalizarBtn = document.getElementById('finalizar-btn'); // Botão inicial "Finalizar pedido"
    const popupOverlay = document.getElementById('popup-overlay'); // O primeiro pop-up
    const cancelarBtn = document.getElementById('cancelar-btn'); // Botão "Cancelar" do primeiro pop-up
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido-btn'); // Botão "Finalizar" do primeiro pop-up

    // Seletores para o pop-up de sucesso
    const successPopupOverlay = document.getElementById('success-popup-overlay'); // O pop-up de sucesso
    const continueBtn = document.getElementById('continue-btn'); // Botão "Continuar" do pop-up de sucesso
    const viewOrdersBtn = document.querySelector('.view-orders-btn'); // Botão "Ver pedidos" do pop-up de sucesso


    // --- Verifica se os elementos foram encontrados (para depuração) ---
    if (finalizarBtn) console.log('Botão .finalizar-btn encontrado.'); else console.error('ERRO: Botão .finalizar-btn NÃO encontrado!');
    if (popupOverlay) console.log('Overlay #popup-overlay encontrado.'); else console.error('ERRO: Overlay #popup-overlay NÃO encontrado!');
    if (cancelarBtn) console.log('Botão #cancelar-btn encontrado.'); else console.error('ERRO: Botão #cancelar-btn NÃO encontrado!');
    if (finalizarPedidoBtn) console.log('Botão #finalizar-pedido-btn encontrado.'); else console.error('ERRO: Botão #finalizar-pedido-btn NÃO encontrado!');
    if (successPopupOverlay) console.log('Overlay #success-popup-overlay encontrado.'); else console.error('ERRO: Overlay #success-popup-overlay NÃO encontrado!');
    if (continueBtn) console.log('Botão #continue-btn encontrado.'); else console.error('ERRO: Botão #continue-btn NÃO encontrado!');
    if (viewOrdersBtn) console.log('Botão .view-orders-btn encontrado.'); else console.error('ERRO: Botão .view-orders-btn NÃO encontrado!');
    // --- Fim da verificação de elementos ---


    // 1. Abre o pop-up de dados ao clicar no botão inicial "Finalizar pedido"
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', function() {
            console.log('Botão "Finalizar pedido" (inicial) clicado. Abrindo pop-up de dados.');
            popupOverlay.style.display = 'flex'; // Torna o overlay visível
        });
    }

    // 2. Fecha o pop-up de dados ao clicar em "Cancelar"
    if (cancelarBtn) {
        cancelarBtn.addEventListener('click', function() {
            console.log('Botão "Cancelar" clicado no pop-up de dados. Fechando pop-up de dados.');
            popupOverlay.style.display = 'none';
        });
    }

    // 3. Fecha o pop-up de dados ao clicar fora do conteúdo (no overlay)
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(event) {
            if (event.target === popupOverlay) {
                console.log('Clicou fora do pop-up de dados. Fechando pop-up de dados.');
                popupOverlay.style.display = 'none';
            }
        });
    }

    // 4. Lógica principal: Ao clicar em "Finalizar" no pop-up de dados
    if (finalizarPedidoBtn) {
        finalizarPedidoBtn.addEventListener('click', function() {
            console.log('Botão "Finalizar" (dentro do pop-up de dados) clicado.');
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;

            if (nome.trim() === '' || cpf.trim() === '') {
                // Se os campos estiverem vazios, exibe um alerta (você pode substituir por uma mensagem mais amigável no pop-up)
                alert('Por favor, preencha todos os campos!');
                console.log('Campos vazios. Exibindo alerta.');
            } else {
                // Se os campos estiverem preenchidos:
                console.log('Campos preenchidos. Fechando pop-up de dados e abrindo pop-up de sucesso.');
                // 4.1. Esconde o pop-up de dados
                popupOverlay.style.display = 'none';

                // 4.2. Mostra o pop-up de sucesso
                successPopupOverlay.style.display = 'flex';

                // *** Aqui você enviaria os dados para o servidor, faria requisições, etc. ***
                console.log(`Dados para envio: Nome: ${nome}, CPF: ${cpf}`);

                // Opcional: Limpar os campos após o envio
                document.getElementById('nome').value = '';
                document.getElementById('cpf').value = '';
            }
        });
    }

    // 5. Fecha o pop-up de sucesso ao clicar em "Continuar"
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            console.log('Botão "Continuar" clicado no pop-up de sucesso. Fechando pop-up de sucesso.');
            successPopupOverlay.style.display = 'none';
            // Opcional: Redirecionar para a página inicial ou outra página
            // window.location.href = '/';
            esvaziarSacola();
        });
    }

    // 6. Fecha o pop-up de sucesso ao clicar fora do conteúdo (no overlay)
    if (successPopupOverlay) {
        successPopupOverlay.addEventListener('click', function(event) {
            if (event.target === successPopupOverlay) {
                console.log('Clicou fora do pop-up de sucesso. Fechando pop-up de sucesso.');
                successPopupOverlay.style.display = 'none';
            }
        });
    }

    // 7. Lógica para o botão "Ver pedidos" no pop-up de sucesso (opcional)
    if (viewOrdersBtn) {
        viewOrdersBtn.addEventListener('click', function() {
            successPopupOverlay.style.display = 'none';
            popupOverlay.style.display = 'flex';
            // Opcional: Redirecionar para a página de pedidos
            // window.location.href = '/meus-pedidos';
        });
    }

atualizarResumo();
atualizarResumoSacolaFlutuante();

});