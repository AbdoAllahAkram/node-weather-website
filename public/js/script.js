const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTow = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour= document.querySelector('#message-4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loding...';
    messageTow.textContent = '';
    messageThree.textContent =''
    messageFour.textContent =''

    const location = search.value;
    
    fetch('http://localhost:3000/weather?address=' + location).then( (response) => {

    response.json().then( (data) => {

        if(data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent =data.Temperature;
            messageTow.textContent = data.summary;
            messageThree.textContent =data.humidity;
            messageFour.textContent =data.Location;
            
        }

    } )
} )
})