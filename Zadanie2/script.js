const date = document.getElementById('date');
const ageIn = document.getElementById('age');
const errorAge = document.getElementById('errorAge');

var validateWholeForm = false;

//validate and count functions
function countChars(text) {
    return text.value.length;
}

function validateInputs(text, error, chars) {
    console.log(validateWholeForm);
    if (text.value == null || text.value == '') {
        error.textContent = 'vyplňte prosím toto pole';
        validateWholeForm = false;
    } else {
        error.textContent = null;
        validateWholeForm = true;
    }
    chars.textContent = countChars(text) + "/20";
    console.log(validateWholeForm);
}

//validate firstName
const firstName = document.getElementById('firstName');
const errorName = document.getElementById('errorName');
const firstNameCount = document.getElementById("firstNameCount");

firstName.addEventListener('input', function () { validateInputs(firstName, errorName, firstNameCount); });

//validate surName
const surname = document.getElementById('surname');
const errorSurname = document.getElementById('errorSurname');
const surnameCount = document.getElementById("surnameCount");

surname.addEventListener('input', function () { validateInputs(surname, errorSurname, surnameCount); });

//validate country
const country = document.getElementById('country');
const errorCountry = document.getElementById('errorCountry');
const countryCount = document.getElementById("countryCount");

country.addEventListener('input', function () { validateInputs(country, errorCountry, countryCount); });

//validate address
const address = document.getElementById('address');
const errorAddress = document.getElementById('errorAddress');
const addressCount = document.getElementById("addressCount");

address.addEventListener('input', function () { validateInputs(address, errorAddress, addressCount); });

//validate postal code
const postalCode = document.getElementById('postalCode');
const errorPostalCode = document.getElementById('errorPostalCode');
const postalCodeCount = document.getElementById("postalCodeCount");

postalCode.addEventListener('input', function () { validateInputs(postalCode, errorPostalCode, postalCodeCount); });

//validate age
//get age
var dateError = document.getElementById("dateError");
var ageCalculated;

function ageCalculator() {
    dateError.textContent = null;
    var userinput = date.value;
    var dob = new Date(userinput);
    if (userinput == null || userinput == '') {
        return false;
    } else {

        //calculate month difference from current date in time
        var month_diff = Date.now() - dob.getTime();

        //convert the calculated difference in date format
        var age_dt = new Date(month_diff);

        //extract year from date    
        var year = age_dt.getUTCFullYear();

        //now calculate the age of the user
        ageCalculated = Math.abs(year - 1970);
        if (ageCalculated > 99 || ageCalculated < 1) {
            dateError.textContent = "zadajte reálny dátum narodenia";
            return false;
        }
        ageIn.value = ageCalculated;
        //display the calculated age
        return ageCalculated;
    }
}

function validateAge(e) {
    var enterAge = e.target.value;
    if (ageCalculated != enterAge) {
        errorAge.textContent = 'zadajte prosím Váš reálny vek';
        return false;
    } else {
        errorAge.textContent = null;
    }
}

date.addEventListener('input', ageCalculator);
ageIn.addEventListener('input', validateAge);

//validate Email
var email = document.getElementById("email");
var emailError = document.getElementById('emailError');

function validateEmail() {
    var emailValue = email.value;
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (emailValue.match(pattern)) {
        emailError.textContent = null;
        validateWholeForm = true;
    } else {
        emailError.textContent = null;
        emailError.textContent = "zadajte prosím existujúci email";
        validateWholeForm = false;
    }
}

email.addEventListener('input', validateEmail);

var phoneNum = document.getElementById("phoneNum");
//validate phoneNumber
function validatePhoneNumber() {
    var phoneNumValue = phoneNum.value;
    var phoneNumError = document.getElementById("phoneNumError");
    var phoneNumFormat = /^[\+]+421[- ]?(\d{3})[- ]?(\d{3})[- ]?(\d{3})$/;
    if (phoneNumValue.match(phoneNumFormat)) {
        phoneNumError.textContent = null;
        validateWholeForm = true;
    } else {
        phoneNumError.textContent = "zadajte prosím číslo v potrebnom formáte";
        validateWholeForm = false;
    }
}

phoneNum.addEventListener('input', validatePhoneNumber);

//select option
var subjectObject = {
    "sladkovodná": {
        "Klopavka pižmová": ["čierna", "šedá", "modrá"],
        "Korytnačka čínska": ["zelená", "tmavo zelená", "krémová", "modrá"],
        "Korytnačka mapová": ["zelená"]
    },
    "suchozemská": {
        "Korytnačka zelenkastá": ["žltá", "sivá", "čierna"],
        "Korytnačka stepná": ["zelená", "šedá"]
    }
};

var subjectSel = document.getElementById("turtle");
var topicSel = document.getElementById("kind");
var chapterSel = document.getElementById("color");

window.onload = function () {
    for (var x in subjectObject) {
        subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }
    subjectSel.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        chapterSel.length = 1;
        topicSel.length = 1;
        //display correct values
        for (var y in subjectObject[this.value]) {
            topicSel.options[topicSel.options.length] = new Option(y, y);
        }
    };
    topicSel.onchange = function () {
        //empty Chapters dropdown
        chapterSel.length = 1;
        //display correct values
        var z = subjectObject[subjectSel.value][this.value];
        for (var i = 0; i < z.length; i++) {
            chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
        }
    };
};

//button s podpisom
const klikninamna = document.getElementById("klikninamna");

klikninamna.onclick = function klik() {
    document.getElementById("menoPodpis").style.display = 'block';
};

//display text - chovatel
var skusenost = document.getElementById("skusenost");
var neskusenost = document.getElementById("neskusenost");

skusenost.onchange = function () {
    document.getElementById("licencia").style.display = 'block';
};

neskusenost.onchange = function () {
    document.getElementById("licencia").style.display = 'none';
};

//display text - prispevok
var prispevok = document.getElementById("prispevok");

prispevok.onchange = function () {
    document.getElementById("vlastnaSuma").style.display = 'block';
};

var euro1 = document.getElementById("1euro");
var euro2 = document.getElementById("2eura");
var euro5 = document.getElementById("5eura");

euro1.onchange = function () {
    document.getElementById("vlastnaSuma").style.display = 'none';
};

euro2.onchange = function () {
    document.getElementById("vlastnaSuma").style.display = 'none';
};

euro5.onchange = function () {
    document.getElementById("vlastnaSuma").style.display = 'none';
};

//odoslanie validacia
var submitError = document.getElementById("submitError");

//modal
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".send");
const closeButton = document.querySelector(".close-button");

var nameModal = document.getElementById("nameModal");
var vekModal = document.getElementById("vekModal");
var krajinaModal = document.getElementById("krajinaModal");
var adresaModal = document.getElementById("adresaModal");
var pscModal = document.getElementById("pscModal");
var emailModal = document.getElementById("emailModal");
var telNumModal = document.getElementById("telNumModal");
var turtleModal = document.getElementById("turtleModal");

const turtle = document.getElementById("turtle");
const kind = document.getElementById("kind");
console.log(kind.value);
const color = document.getElementById("color");

var prize = document.getElementById("prize");

function toggleModal() {

    //validacia
    if (firstName.value == '' || surname.value == '' || date == null || ageIn.value == '' || country.value == '' ||
        address.value == '' || postalCode.value == '' || email.value == '' || phoneNum.value == '' || subjectSel.value == '' ||
        topicSel.value == '' || chapterSel.value == '') {
        validateWholeForm = false;
    }

    //vypocet ceny
    if (kind.value == "Klopavka pižmová") {
        prize.textContent = 'Cena: 89€';
    }
    if (kind.value == "Korytnačka čínska") {
        prize.textContent = 'Cena: 67€';
    }
    if (kind.value == "Korytnačka mapová") {
        prize.textContent = 'Cena: 90€';
    }
    if (kind.value == "Korytnačka zelenkastá") {
        prize.textContent = 'Cena: 95€';
    }
    if (kind.value == "Korytnačka stepná") {
        prize.textContent = 'Cena: 120€';
    }

    if (validateWholeForm) {
        submitError.textContent = null;
        nameModal.textContent = "Meno: " + firstName.value + " " + surname.value;
        vekModal.textContent = "Vek: " + ageIn.value;
        krajinaModal.textContent = "Krajina: " + country.value;
        adresaModal.textContent = "Adresa: " + address.value;
        pscModal.textContent = "PSC: " + postalCode.value;
        emailModal.textContent = "Email: " + email.value;
        telNumModal.textContent = "Tel. číslo: " + phoneNum.value;
        turtleModal.textContent = "Zvolená korytnačka: " + turtle.value + " - " + kind.value + " - " + color.value;
        modal.classList.toggle("show-modal");
    } else {
        submitError.textContent = "vyplňte všetky potrebné polia";
    }
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);