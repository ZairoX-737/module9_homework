const sendBtnNode = document.querySelector('#sendBtn');
const resultNode = document.querySelector('#result');

function useRequest(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);

    xhr.onload = function(){
        if(xhr.status != 200){
            console.log('Статус ответа: ', xhr.status);
        }
        else{
            const result = JSON.parse(xhr.response);
            if(callback){
                callback(result);
            }
        } 
    }
    xhr.onerror = function(){
        console.log('Ошибка запроса, стасут ответа: ', xhr.status);
    }

    xhr.send();
}

function displayResult(apidata){
    let cards = '';

    apidata.forEach( item => { 
        const cardBlock = `
            <div class ="card">
               <img src="${item.download_url} " class="card-image"/>
               <p>${item.author}</p> 
            </div>
        `;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}

sendBtnNode.addEventListener('click', function(){
    const value = document.querySelector('input').value;
    if(value >= 1 & value <=10){
        useRequest(`https://picsum.photos/v2/list?limit=${Number(value)}`, displayResult);
    }
    else{
        alert('Введённое число вне диапазона от 1 до 10');
    }
})