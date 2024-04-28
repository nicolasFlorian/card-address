const modeBtn = document.querySelector('.card__mode__container');
const modeIcon = modeBtn.querySelector('.item');
const modeIconUse = modeIcon.querySelector('use');

modeBtn.addEventListener('click', () => {
    modeBtn.setAttribute('data-mode', modeBtn.getAttribute('data-mode') === 'dark' ? 'light' : 'dark');
    document.body.classList.toggle('dark-mode');

    if (modeBtn.getAttribute('data-mode') === 'dark') {
        modeIcon.classList.add('spinLeft');
        modeBtn.disabled = true;
        setTimeout(() => {
            modeIconUse.setAttribute('xlink:href', '/sprite.42afc416.svg#sun');
            modeIcon.classList.contains('moon') ? modeIcon.classList.replace('moon', 'sun') : modeIcon.classList.replace('sun', 'moon');
        }, 300);
        modeIcon.addEventListener('animationend', () => {
            modeIcon.classList.remove('spinLeft');
            modeBtn.removeAttribute('disabled');
        })
    }else{
        modeIcon.classList.add('spinRight');
        modeBtn.disabled = true;
        setTimeout(() => {
            modeIconUse.setAttribute('xlink:href', '/sprite.42afc416.svg#moon');
            modeIcon.classList.contains('moon') ? modeIcon.classList.replace('moon', 'sun') : modeIcon.classList.replace('sun', 'moon');
        }, 300);
        modeIcon.addEventListener('animationend', () => {
            modeIcon.classList.remove('spinRight');
            modeBtn.removeAttribute('disabled');
        })
    }
})

const form = document.querySelector('.card__form');
const inputs = {
    name: {
        input: form.querySelector('input#name'),
        error: createElements('<span class="error">Nome Inválido. </span>'),
        label: form.querySelector('label[for="name"]'),
        buttonSplit: createElements('<button class="split__btn">Separar?</button>')
    },
    lastName: {
        input: form.querySelector('input#last-name'),
        error: createElements('<span class="error">Sobrenome Inválido.</span>'),
        label: form.querySelector('label[for="last-name"]'),
    },
    email: {
        input: form.querySelector('input#email'),
        error: createElements('<span class="error">E-mail Inválido.</span>'),
        label: form.querySelector('label[for="email"]'),
    },
    cep: {
        input: form.querySelector('input#cep'),
        error: createElements('<span class="error">CEP Inválido.</span>'),
        label: form.querySelector('label[for="cep"]'),
    },
    address: {
        input: form.querySelector('input#address'),
        error: createElements('<span class="error">Endereço Inválido.</span>'),
        label: form.querySelector('label[for="address"]'),
    },
    number: {
        input: form.querySelector('input#number'),
        error: createElements('<span class="error">Número Inválido.</span>'),
        label: form.querySelector('label[for="number"]'),
    },
    complement: {
        input: form.querySelector('input#complement'),
        error: createElements('<span class="error">Complemento Inválido.</span>'),
        label: form.querySelector('label[for="complement"]'),
    },
}
const btnSearchCep = form.querySelector('button.search');
const btnSubmit = form.querySelector('button[type="submit"]');

function createElements(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
})

function validateForm() {
    // Empty inputs
    for (const key in inputs) {
        if (inputs[key].input.value === '') {
            inputs[key].input.classList.add('error');
            inputs[key].label.insertAdjacentElement('afterend', inputs[key].error);
        } 

        if (inputs[key].input === inputs.complement.input){
            inputs[key].input.classList.remove('error');
            inputs[key].error.remove();
        }
    }

    let hasError = Object.values(inputs).some(input => input.input.classList.contains('error'));
    if (hasError) {
        if (document.querySelector('.notification')) {
            return;
        }else{
            showNot();
        }
    } else {
        form.submit();
    }
}

validateInputs();

function validateInputs(){
    // Name
    inputs.name.input.addEventListener('input', () => {
        if (/[0-9]/.test(inputs.name.input.value)){
            inputs.name.input.value = inputs.name.input.value.replace(/[0-9]/g, '');
        }

        if (inputs.name.input.value !== '') {
            if (!inputs.name.input.value.match(/^[a-zA-Z\s]+$/)) {
                inputs.name.input.classList.add('error');
                inputs.name.label.insertAdjacentElement('afterend', inputs.name.error);
            }else{
                inputs.name.input.classList.remove('error');
                inputs.name.error.remove();
            }
        } 
    
        if(inputs.name.input.value[0] === ' '){
            inputs.name.input.value = inputs.name.input.value.trimStart();
        }
    
        if (/\s[a-zA-Z]/.test(inputs.name.input.value)) {
            inputs.name.input.classList.add('error');
            const error = inputs.name.error;
            error.appendChild(inputs.name.buttonSplit)
        
            inputs.name.label.insertAdjacentElement('afterend', error);
        }else{
            inputs.name.buttonSplit.remove();
        }

        if (inputs.name.input.value.length === 1) {
            inputs.name.input.value = inputs.name.input.value.toUpperCase();
        }
    })
    
    inputs.name.buttonSplit.addEventListener('click', (e) => {
        e.preventDefault();
        let name = inputs.name.input.value.split(' ');
        name = name.filter((item) => item !== '');
        for (let i = 0; i < name.length; i++) {
            name[i] = name[i].charAt(0).toUpperCase() + name[i].slice(1);
        }
        inputs.name.input.value = name[0];
        inputs.lastName.input.value = name[1];
        inputs.name.input.classList.remove('error');
        inputs.lastName.input.classList.remove('error');
        inputs.lastName.error.remove();
    })

    inputs.name.input.addEventListener('blur', () => {
        if (inputs.name.input.value.slice(-1) === ' ') {
            inputs.name.input.value = inputs.name.input.value.trimEnd();
        }
    })

    // Last Name
    inputs.lastName.input.addEventListener('input', () => {
        if (inputs.lastName.input.value !== '') {
            if (!inputs.lastName.input.value.match(/^[a-zA-Z\s]+$/)) {
                inputs.lastName.input.classList.add('error');
                inputs.lastName.label.insertAdjacentElement('afterend', inputs.lastName.error);
            }else{
                inputs.lastName.input.classList.remove('error');
                inputs.lastName.error.remove();
            }
        }
    
        if(inputs.lastName.input.value[0] === ' '){
            inputs.lastName.input.value = inputs.lastName.input.value.trimStart();
        }

        if (inputs.lastName.input.value.length === 1) {
            inputs.lastName.input.value = inputs.lastName.input.value.toUpperCase();
        }
    })

    inputs.lastName.input.addEventListener('blur', () => {
        if (inputs.lastName.input.value.slice(-1) === ' ') {
            inputs.lastName.input.value = inputs.lastName.input.value.trimEnd();
        }
    })

    // Email

    inputs.email.input.addEventListener('blur', () => {
        if (inputs.email.input.value !== '') {
            if (!inputs.email.input.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                inputs.email.input.classList.add('error');
                inputs.email.label.insertAdjacentElement('afterend', inputs.email.error);
            }else{
                inputs.email.input.classList.remove('error');
                inputs.email.error.remove();
            }
        }
    })

    // CEP

    inputs.cep.input.addEventListener('blur', () => {
        if (inputs.cep.input.value !== '') {
            if (!inputs.cep.input.value.match(/^\d{5}-\d{3}$/)) {
                inputs.cep.input.classList.add('error');
                inputs.cep.label.insertAdjacentElement('afterend', inputs.cep.error);
            }else{
                inputs.cep.input.classList.remove('error');
                inputs.cep.error.remove();

                if (inputs.address.input.classList.contains('error')) {
                    inputs.address.input.classList.remove('error');
                    inputs.address.error.remove();
                }
            }
        }
    })

    inputs.cep.input.addEventListener('input', () => {
        if (inputs.cep.input.value.length === 5 || (inputs.cep.input.value.length === 6 && !inputs.cep.input.value.includes('-'))) {
            inputs.cep.input.value = inputs.cep.input.value.slice(0, 5) + '-' + inputs.cep.input.value.slice(5);
        } else if (inputs.cep.input.value.length > 9) {
            inputs.cep.input.value = inputs.cep.input.value.slice(0, 9);
        } else if (inputs.cep.input.value.length === 6 && inputs.cep.input.value[5] === '-') {
            inputs.cep.input.value = inputs.cep.input.value.slice(0, 5);
        } else if (/[^0-9-]/.test(inputs.cep.input.value)) {
            inputs.cep.input.value = inputs.cep.input.value.replace(/[^0-9-]/g, '');
        } else if (inputs.cep.input.value.length === 9) {
            inputs.cep.input.blur();
            loadBtn();
        } else if (inputs.cep.input.value === '') {
            inputs.address.input.value = '';
        }
    })

    // Number

    inputs.number.input.addEventListener('input', () => {
        if (inputs.number.input.value !== '') {
            if (inputs.number.input.classList.contains('error')) {
                inputs.number.input.classList.remove('error');
                inputs.number.error.remove();
            }
        }
    })
}

btnSearchCep.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(btnSearchCep)
    if(inputs.cep.input.value === ''){
        inputs.cep.input.classList.add('error');
        inputs.cep.label.insertAdjacentElement('afterend', inputs.cep.error);
        return;
    } else if (inputs.cep.input.classList.contains('error')){
        return;
    } else{
        loadBtn();
    }
})

function cepRequest(){
    const cep = inputs.cep.input.value.replace('-', '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
        if (data.erro) {
            inputs.cep.input.classList.add('error');
            inputs.cep.label.insertAdjacentElement('afterend', inputs.cep.error);
            return;
        }
        inputs.address.input.value = `${data.logradouro}, ${data.bairro} - ${data.localidade} - ${data.uf}`;
    })
    .catch(err => {
        console.error(err);
    })
}

function showNot(){
    const notification = createElements(`
    <div class="notification">
        <svg><use xlink:href="/sprite.42afc416.svg#alert"></use></svg>
        <span>Preencha os campos corretamente.</span>
    </div>`
    )
    document.body.appendChild(notification);
    notification.classList.add('fadeIn');
    setTimeout(() => {
        notification.classList.add('fadeOut');
        notification.addEventListener('animationend', () => {
            notification.remove();
        })
    }, 4000);
}

function loadBtn(){
    const svgSearch = btnSearchCep.querySelector('use');
    svgSearch.setAttribute('xlink:href', '/sprite.42afc416.svg#load')
    svgSearch.parentElement.classList.add('spinInfinite');
    setTimeout(() => {
        cepRequest();
        svgSearch.parentElement.classList.remove('spinInfinite');
        svgSearch.setAttribute('xlink:href', '/sprite.42afc416.svg#search')
    }, 1500)
}



