import './style.css'
import { renderProducts } from "./scripts/task-2-1.js";
import { initGitHubHandlers, renderGitHubRepos } from "./scripts/task-2-2.js";

async function init() {
  const app = document.getElementById('app');

  // task-2-2
  app.innerHTML += await renderGitHubRepos();

  // task-2-1
  app.innerHTML += await renderProducts()

  initGitHubHandlers();
}

init();