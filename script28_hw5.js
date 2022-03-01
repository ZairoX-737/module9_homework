const title1 = document.querySelector("#inputNumTitle");
const title2 = document.querySelector("#inputLimTitle");

const inputNum = document.querySelector("#inputNum");
const inputLim = document.querySelector("#inputLim");

const sendBtnNode = document.querySelector('#sendBtn'); 
const resultNode = document.querySelector('#result');
const btnClearNode = document.querySelector('#clearLSBtn');

title1.addEventListener('mouseover', function(){
    inputNum.setAttribute('style', 'transform: scale(1.1);')
})
title1.addEventListener('mouseout', function(){
    inputNum.removeAttribute('style')
})

title2.addEventListener('mouseover', function(){
    inputLim.setAttribute('style', 'transform: scale(1.1);')
})
title2.addEventListener('mouseout', function(){
    inputLim.removeAttribute('style')
})

const jsonStorage = localStorage.getItem('json1');
console.log('JS Storage: ', jsonStorage);
if (jsonStorage){
    resultNode.innerHTML = jsonStorage;
}

const useRequest = (value1, value2) => {
    return fetch(`https://picsum.photos/v2/list?page=${value1}&limit=${value2}`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            return json;
        })
        .catch(() => {console.log('error')})
}

function displayResult(apidata){
    let cards = '';

    apidata.forEach( item => { 
        const cardBlock = `
            <a href="${item.download_url}" class="originImage">
                <div class="card">
                   <img src="${item.download_url}" class="card-image"/>
                   <p>${item.author}</p> 
                </div>
            </a>
        `;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}

function resultToStorage(requestResult){
    let cards = '';
    requestResult.forEach( item => { 
        const cardBlock = `
            <a href="${item.download_url}" class="originImage">
                <div class="card">
                   <img src="${item.download_url}" class="card-image"/>
                   <p>${item.author}</p> 
                </div>
            </a>
        `;
        cards = cards + cardBlock;
    });
    return cards
}

sendBtnNode.addEventListener('click', async() => {
    const value1 = Number(document.querySelector('#inputNum').value);
    const value2 = Number(document.querySelector('#inputLim').value);  
    if(value1 >= 1 & value1 <=10 & typeof(value1)=='number' & isNaN(value1)==false){
        if(value2 >= 1 & value2 <=10 & typeof(value2)=='number' & isNaN(value2)==false){
            const requestResult = await useRequest(value1, value2);
            displayResult(requestResult);
            localStorage.setItem('json1', resultToStorage(requestResult));
        }
        else{
            resultNode.innerHTML= '<span class="text1">Лимит вне диапазона от 1 до 10</span>';
        }
    }
    else if(value2 >= 1 & value2 <=10 & typeof(value2)=='number' & isNaN(value2)==false){
        resultNode.innerHTML = '<span class="text1">Номер страницы вне диапазона от 1 до 10</span>';
    }
    else{
        resultNode.innerHTML = '<span class="text1">Номер страницы и лимит вне диапазона от 1 до 10</span>';
    }
})

btnClearNode.addEventListener('click', () => {
    localStorage.clear();
    console.log('Данные из localStorage удалены');
});

