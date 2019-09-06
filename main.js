const mainContent = document.querySelector(".main-content");
const inputField = document.querySelector(".input-field");
const addBtn = document.querySelector(".add-btn");
const todosContainer = document.querySelector(".todos-containers");
const articles = localStorage.articles ? JSON.parse(localStorage.articles) : [];

const popUpMessage = msg => {
  const div = document.createElement("div");
  const text = document.createTextNode(msg);

  div.setAttribute("class", "invalid");
  div.appendChild(text);
  mainContent.prepend(div);
};

const avoidEmptyTodo = () => {
  if (document.querySelector(".invalid")) {
    return;
  } else {
    popUpMessage("Please add content");
  }
};

const createTodo = text => {
  // Creting a todo
  const article = document.createElement("article");
  const p = document.createElement("p");
  const span = document.createElement("span");

  //   Text nodes
  const cancel = document.createTextNode("x");
  const content = document.createTextNode(text);

  // Setting attributes
  article.setAttribute("class", "todo");
  span.setAttribute("class", "delete");

  // Appending children
  p.appendChild(content);
  span.appendChild(cancel);
  span.addEventListener("click", removeTodo);

  article.appendChild(p);
  article.appendChild(span);

  return article;
};

const addTodo = e => {
  e.preventDefault();
  const text = inputField.value;

  if (!text || text.trim().lenght === 0) {
    avoidEmptyTodo();
    return;
  }
  if (document.querySelector(".invalid")) {
    document.querySelector(".invalid").remove();
  }

  const article = createTodo(text);

  todosContainer.appendChild(article);

  articles.push(text);

  localStorage.articles = JSON.stringify(articles);

  inputField.value = "";
};

addBtn.addEventListener("click", addTodo);

function removeTodo() {
  const remainingArticles = JSON.parse(localStorage.articles).filter(
    article => article !== this.parentNode.firstElementChild.textContent
  );
  localStorage.articles = JSON.stringify(remainingArticles);
  this.parentNode.remove();
}

window.addEventListener("DOMContentLoaded", event => {
  if (localStorage.articles) {
    JSON.parse(localStorage.articles).forEach(articleText => {
      const article = createTodo(articleText);
      todosContainer.appendChild(article);
    });
  }
});
