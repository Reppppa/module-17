const GITHUB_API_BASE = 'https://api.github.com';

async function getGitHubRepos(username) {
  try {
    const url = `${GITHUB_API_BASE}/users/${username}/repos`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3+json"
      }
    });

    if (!res.ok) {
      throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    throw new Error(`Не удалось получить репозитории: ${err.message}`);
  }
}

export async function renderGitHubRepos() {
  return `
    <div class="github">
      <h2 class="github__title">Task-2-2: Поиск репозиториев GitHub</h2>
      <p>Введите имя пользователя GitHub, чтобы получить список его репозиториев</p>
      
      <div class="github__inputs">
        <input 
          type="text" 
          id="github-username-input" 
          class="github__input" 
          placeholder="Введите логин пользователя GitHub"
        >
        <button id="github-fetch-button" class="github__button">Получить</button>
      </div>
      
      <div id="github-results-container" class="github__results">
        <div class="github__empty">Здесь будут отображены результаты поиска</div>
      </div>
    </div>
  `;
}

export function initGitHubHandlers() {
  const fetchButton = document.getElementById('github-fetch-button');
  const usernameInput = document.getElementById('github-username-input');
  const resultsContainer = document.getElementById('github-results-container');

  let isLoading = false;

  fetchButton.addEventListener('click', handleSearch);

  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  async function handleSearch() {
    if (isLoading) return;

    const username = usernameInput.value.trim();

    if (!username) {
      resultsContainer.innerHTML = '<div class="github-error">Пожалуйста, введите имя пользователя GitHub</div>';
      return;
    }

    isLoading = true;
    fetchButton.disabled = true;
    fetchButton.textContent = 'Загрузка...';

    resultsContainer.innerHTML = '<div class="github-loading">Загрузка репозиториев...</div>';

    try {
      const repos = await getGitHubRepos(username);
      displayRepos(repos);
    } catch (error) {
      resultsContainer.innerHTML = `<div class="github-error">${error.message}</div>`;
    } finally {
      isLoading = false;
      fetchButton.disabled = false;
      fetchButton.textContent = 'Получить';
    }
  }

  function displayRepos(repos) {
    if (!repos || repos.length === 0) {
      resultsContainer.innerHTML = '<div class="github-empty">У пользователя нет публичных репозиториев</div>';
      return;
    }

    resultsContainer.innerHTML = `
      <ul class="github__list">
        ${repos.map(repo => `
          <li class="github__item">
            <a 
              href="${repo.html_url}"
              target="_blank" 
              rel="noopener noreferrer" 
              class="github__link"
            >
              ${repo.full_name}
            </a>
          </li>
        `).join('')}
      </ul>
    `;
  }
}