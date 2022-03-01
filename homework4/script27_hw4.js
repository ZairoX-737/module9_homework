const sendBtnNode = document.querySelector('#sendBtn'); 
const resultNode = document.querySelector('#result');

sendBtnNode.addEventListener('click', function(){
    const value1 = Number(document.querySelector('#input1').value);
    const value2 = Number(document.querySelector('#input2').value);
    console.log(value1, typeof(value1), isNaN(value1))
    console.log(value2, typeof(value1), isNaN(value1))

    if(value1 >= 100 & value1 <=300 & typeof(value1)=='number' & isNaN(value1)==false){
       if(value2 >= 100 & value2 <=300 & typeof(value2)=='number' & isNaN(value2)==false){
           console.log('Fetching..');
           fetch(`https://picsum.photos/${value1}/${value2}`)
                .then( (response) => {
                    resultNode.innerHTML= `<img src="${response.url}" ></img>`;
                }) 
                .catch( () => { console.log('error') });
       }
       else{
           resultNode.innerHTML = '<span class="text1">одно из чисел вне диапазона от 100 до 300</span>';
       } 
    }
    else{
        resultNode.innerHTML = '<span class="text1">одно из чисел вне диапазона от 100 до 300</span>';
    }
})