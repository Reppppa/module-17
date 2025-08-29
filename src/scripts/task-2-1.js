import settings from "../../data/settings.json";

async function getData() {
  try {
    const url = `${settings.apiSettings.fakeStore}products?limit=10`;

    const res = await fetch(url, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Ошибка ${err.status}: ${err.statusText}`);
  }
}


async function getAllProducts() {
  return await getData();
}

export async function renderProducts () {
  const products = await getAllProducts();

  return `
    <div class="showcase">
      <h2 class="showcase__title">Task-2-1: Каталог товаров</h2>
      <div class="showcase__list">
        ${products.map(p => `
          <div class="showcase__item">
            <img 
                src='${p.image}' 
                alt='${p.title}'
                class="showcase__item-img" 
            >
            <span class="showcase__item-title">${p.title}</span>
            <span class="showcase__item-price">Цена: ${p.price} $</span>
          </div>
        `).join('')}
      </div>
    </div>
  `
}
