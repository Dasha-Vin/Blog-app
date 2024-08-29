const posts = [];

const TITLE_CHARACTER_LIMIT = 50;
const TEXT_CHARACTER_LIMIT = 100;

const titleInputNode = document.querySelector('.js-title-input');
const textInputNode = document.querySelector('.js-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts')
const validationMessage = document.getElementById('validationMessage')
const deletePosts = document.querySelector('.js-delete-post-btn');
const addLimit = document.querySelector('.js-validationMessage');
let charCountTitle = document.querySelector('.charCountTitle');
let charCountText = document.querySelector('.charCountText');

newPostBtnNode.addEventListener('click', function() {
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
})

titleInputNode.addEventListener('input', validation);
textInputNode.addEventListener('input', validation);

function validation() {
    const titleLen = titleInputNode.value.length;
    const textLen = textInputNode.value.length;

    if (titleLen >= TITLE_CHARACTER_LIMIT) {
        addLimit.innerText = `Заголовок не должен превышать ${TITLE_CHARACTER_LIMIT} символов`;
        addLimit.classList.remove('validationMessage-hidden');
    return;
} 
    if (textLen >= TEXT_CHARACTER_LIMIT ) {
        addLimit.innerText = `Пост не должен превышать ${TEXT_CHARACTER_LIMIT} символов`; 
        addLimit.classList.remove('validationMessage-hidden');
    return;
}
addLimit.classList.add('validationMessage-hidden'); //если вышестоящие условия удовлетворены то запускаем скрыть
}

titleInputNode.addEventListener('input', countTitle);
textInputNode.addEventListener('input', countText);

function countTitle() {
    const titleLen = titleInputNode.value.length;
    charCountTitle.textContent = titleLen + "/50";
    
    if (titleLen>20) {
        titleLen.value = titleLen.value.slice(0, 50);
    }
};

function countText() {
    const textLen = textInputNode.value.length;
    charCountText.textContent = textLen + "/100";

    if (textLen>40) {
        textLen.value = textLen.value.slice(0, 100);  
    }
};

function getPostFromUser() {
    const title = titleInputNode.value; // получить данные из поля ввода
    const text = textInputNode.value;

    if (!titleInputNode.value & !textInputNode.value) {
        return;
    } 

    titleInputNode.value = "";
    textInputNode.value = "";

    return {
        title:title,
        text:text
    };
}

function addPost({title, text}) {
    const dateFix = Date.now();
    const date = new Date(dateFix);
    const formattedDate = `${date.toLocaleDateString()}  ${date.toLocaleTimeString().slice(0,-3)}`;

    posts.push({
        formattedDate: formattedDate,
        title,
        text
});  //сохранить пост
}

function getPost(){
    return posts;/*добавляю внутрь html*/ 
}

function renderPosts() {
    const posts = getPost();
    let postsHTML = '';
    posts.forEach(post => {
        postsHTML  +=  `
    <div class='post'>
        <p class='post-date-input'>${post.formattedDate}</p>
        <p class='post-title-input'>${post.title}</p>
        <p class='post-text-input'>${post.text}</p>
    </div>   
    `;                   
});

    postsNode.innerHTML = postsHTML;
}

deletePosts.addEventListener('click',function() {
    if (posts.length > 0) {
    posts.pop() /* метод удаляет последний элемент массива */
    postsNode.removeChild(postsNode.lastElementChild); /*удаление из контейнера благодаря которому отображается на странице*/
    }
})
