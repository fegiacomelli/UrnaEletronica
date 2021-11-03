let seuVotoPara = document.querySelector('.d-1 span');
let cargo = document.querySelector('.d-2 span');
let descricao = document.querySelector('.d-4');
let aviso = document.querySelector('.division--base');
let lateral = document.querySelector('.top--right');
let numeros = document.querySelector('.d-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa(){
    let etapa = stages[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i < etapa.number;i++){
        if(i === 0){
            numeroHtml += '<div class="number blink"></div>';
        } else {
            numeroHtml += '<div class="number"></div>';
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.title;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = stages[etapaAtual];
    let candidato = etapa.candidates.filter((item) =>{
        if(item.number === numero){
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.name}<br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for(let i in candidato.picture){
            if(candidato.picture[i].small){
                fotosHtml += `<div class="d-img small">
                <img src="pictures/${candidato.picture[i].url}" alt="">${candidato.picture[i].legenda}</div>`;
            } else {
            fotosHtml += `<div class="d-img">
            <img src="pictures/${candidato.picture[i].url}" alt="">${candidato.picture[i].legenda}</div>`;
        }

    }

        lateral.innerHTML = fotosHtml;

    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande blink">VOTO NULO</div>';
    }

    console.log("Candidato",candidato);
}

function clicou(n){
    let elNumero = document.querySelector('.number.blink');
    if(elNumero !== null){
         elNumero.innerHTML = n;
         numero = `${numero}${n}`;

         elNumero.classList.remove('blink');
         if(elNumero.nextElementSibling !== null){
             elNumero.nextElementSibling.classList.add('blink');
         } else {
           atualizaInterface();
           
         }
         
    }
}
function branco(){
    numero = '';
    votoBranco = true;
    lateral.innerHTML = '';
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande blink">VOTO EM BRANCO</div>';
}
function corrige(){
    comecarEtapa();
}
function confirma(){
    let etapa = stages[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: stages[etapaAtual].title,
            voto: 'branco'
        });
    } else if (numero.length === etapa.number){
        votoConfirmado = true;
        votos.push({
            etapa: stages[etapaAtual].title,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(stages[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.screen').innerHTML = '<div class="aviso--gigante blink">FIM</div>';
            console.log(votos);  
        }
    }

}


comecarEtapa();