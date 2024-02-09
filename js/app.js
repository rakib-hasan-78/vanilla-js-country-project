
// ** modal 
const modal = document.getElementById(`modal`);
const iconBox = document.getElementById('icon-box');
const modalContent =  document.getElementById('modal-content');
const modalFlag = document.getElementById('modal-flag');
const countryCard = document.querySelectorAll('.country-card');
const close = document.getElementById('close');
const cancelButton = document.getElementById('btn-cancel');
const cancelSection = document.getElementById('confirm-cancelation');
// ** data load....

const loadCountries = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(response=>response.json())
        .then(data=> displayCountries(data))
};

const displayCountries = (countries) => {
    const allCountriesHTML = countries.map((country, index)=>getCountryHTML(country, index));
    const countrie = document.getElementById(`countries`);
    countrie.innerHTML = allCountriesHTML.join(' ');

    const btn = document.createElement('button');
    btn.classList=  'btn-btn';
    btn.textContent= 'Expand Details';

    const cardInfo = document.querySelectorAll('.card-information');
    cardInfo.forEach((info) => {

        const btnClone = btn.cloneNode(true);
        info.appendChild(btnClone);
    });

    const btnAction = document.querySelectorAll('.btn-btn');
    btnAction.forEach((btn, index) => {
        btn.addEventListener(`click`, (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            const countryDetails = countries[index];
            countryModal(countryDetails);
        });
    });
};


const getCountryHTML= (country, index) => {

    return `
        <div class="country-card">
            <div class="card-title">
                <h3 class="country-count">#${index+1}</h3>
            </div>
            <div class="card-flag">
            <img src="${country.flags.png}"/>
            </div>
            <div class="card-information">
                <h2>${country.name.common}</h2>
            </div> 
        </div>
    `

};



loadCountries();




const countryModal= (country) => {

    let languageNames = country.languages? Object.values(country.languages): [];

    modalContent.innerHTML = '';
    modalContent.innerHTML = `
        <h4>${country.name.common}</h4>
        <p>Official Name: ${country.name.official}</p>
        <p>Capital City: ${country.capital}</p>
        <p>Region: ${country.region}</p>
        <p>Subregion: ${country.subregion}</p>
        <p>Area : ${country.area} sq. km</p>
        <p>Population : ${country.population}</p>
        <p>Language : ${languageNames.length>0 ? languageNames.join(', '):'N/A'}</p>
    `
    modalFlag.innerHTML = `
        <div = "flag-modal">
            <img class="modal-image" src="${country.flags.png}">
        </div>
    `
};
// ** close modal
const closeModal = () => {
    close.addEventListener('click', (e) => {
        e.preventDefault()
        modal.style.display = 'none';
        modalContent.innerHTML = '';
        cancelSection.style.display = 'none';
    });
};
closeModal();
// ** cancel button
cancelButton.innerHTML = 'cancel';
cancelButton.addEventListener('click', (e) => {
    cancelSection.style.cssText=`
        display:flex;
        transition: all 140ms ease-in-out;
    `
})

let cancelElement = (element,className, idName, text ) => {
    let createElement = document.createElement(element);
    createElement.setAttribute('class' ,className);
    createElement.id = idName;
    createElement.innerHTML = text;
    return createElement;
}

let text = cancelElement('h3', 'confirm-text', 'confirm-text', 'are you sure to Quit?');
let btnContainer = cancelElement('div','btn-container','btn-container','') ;
let okButton = cancelElement('button', 'btn', 'confirm-button','Ok');
let discardButton = cancelElement('button', 'btn', 'discard','Discard');

let buttons = [okButton,discardButton]
;[...buttons].forEach(button=>btnContainer.appendChild(button));

function appending(appendator, ...items) {
    let item = [...items];
    [...items].forEach(item=>appendator.appendChild(item));
}
appending(cancelSection, text,btnContainer);

// ** discard button
document.getElementById(`discard`).addEventListener('click',(e) => {
    e.preventDefault();
    document.getElementById('confirm-cancelation').style.display= 'none';
});
// ** ok button 
document.getElementById(`confirm-button`).addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.cssText=`
        display:none;
        transition: all 150ms ease-in-out;
    `
    cancelSection.style.display = 'none';
})



// *** time

let hr = document.getElementById('hr');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let mili = document.getElementById('mili')


setInterval(() => {

    let currentTime = new Date();
    hr.innerText = (currentTime.getHours()<10?"0":"")+currentTime.getHours();
    min.innerText =( currentTime.getMinutes()<10?"0":" ")+currentTime.getMinutes();
    sec.innerText = (currentTime.getSeconds()<10?"0":" ")+currentTime.getSeconds();
    
},1000)