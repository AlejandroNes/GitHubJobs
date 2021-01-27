//variables
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

//aventos
document.addEventListener('DOMContentLoaded', ()=> {
    formulario.addEventListener('submit', validarFormulario);
})



//funciones
function validarFormulario(e){
e.preventDefault();
//llamando a el valor del input
const busqueda = document.querySelector('#busqueda').value;
if( busqueda.length < 2 ){
    mensajeAlerta('Búsqueda muy corta!.. Añade más informacíon')
    return
}
mostrarAPI(busqueda);
}

//adquiriendo la API de githubJobs
function mostrarAPI(busqueda){
    const githuburl = `https://jobs.github.com/positions.json?search=${busqueda}`
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(githuburl) }`
    axios.get(url)
    .then( respuesta => mostrarVacantes(JSON.parse(respuesta.data.contents), busqueda))
}

//mostrar los vacantes seleccionados
 function mostrarVacantes(vacantes,busqueda){
    //limpiar el HTML
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
    if( vacantes.length > 0 ){
        resultado.classList.add('grid');

        vacantes.forEach(item => {
            const {company, title, type, url} = item
            resultado.innerHTML += /*html*/`
            <div class="shadow bg-white p-6 rounded">
            <h2 class="text-2xl font-light mb-4">${title}</h2>
            <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
            <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
            <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}" target="_blank">Ver Vacante</a>
            </div> 
            `   
        });
    }else{
        mensajeAlerta(`No hay resultados de la busqueda: ${busqueda}`)
    }
} 

// funcion para mostrar el mensaje de alerta
function mensajeAlerta(sms){
    const validarAlerta = document.querySelector('.alerta')
    if( !validarAlerta ){
        const alerta = document.createElement('div')
        alerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta')
        alerta.textContent = sms
        formulario.appendChild(alerta)
        setTimeout( ()=> {
            alerta.remove();
        },2000 )
    }

}