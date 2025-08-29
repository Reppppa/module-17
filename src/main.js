import './style.css'
import { ShowcaseService } from "./scripts/task-2-1.js";

async function init() {
  const app = document.getElementById('app');
  const showcase = new ShowcaseService()

  app.innerHTML = await showcase.render()
}

init();