
const rgItem = Array.from(document.querySelectorAll('.rg .rg-item'))

/**
 * 
 * @param {HTMLElement} element 
 * @param {number} n 
 */
function rgCount(element,n) {
    const span = document.createElement('span')
    span.setAttribute('class','rg-count')
    span.innerHTML = 'rg : <span>'+n+'</span>'
    element.insertAdjacentElement('afterbegin',span)
}

rgItem.forEach(element => {
    rgCount(element,rgItem.indexOf(element)+1)
});
delete rgItem

// rempli le dictionnaire de données auto

// table dd
const ddCode = document.querySelector('.dd .dd-table .dd-code .property')
const ddNum = document.querySelector('.dd .dd-table .dd-num .property')
const ddSg = document.querySelector('.dd .dd-table .dd-sg .property')
const ddType = document.querySelector('.dd .dd-table .dd-type .property')
const ddTaille = document.querySelector('.dd .dd-table .dd-taille .property')
const ddNt = document.querySelector('.dd .dd-table .dd-nt .property')
const ddOb = document.querySelector('.dd .dd-table .dd-ob .property')

/**
 * 
 * @param {Array} sig 
 * @param {string} param 
 * @param {string} parent
 */
function parSig(sig,param,parent,element,op=false) {
    if (!op){
        sig = sig.slice(0,sig.length-1)
    }
    sig = sig.join(' ') + param+ parent
    itemContent(element,sig)
}

/**
 * @param {HTMLElement} element
 * @param {string} param 
 */
function itemContent(element,params,tr=false) {
    if (tr)
    element.innerHTML += '<div class="item transparent">'+params+'</div>'
    else element.innerHTML += '<div class="item">'+params+'</div>'
}

/**
 * 
 * @param {HTMLElement} element 
 * @param {HTMLElement} code
 */
function insertLineDd(elements,code) {

    let i
    const firtelement = elements.firstElementChild.innerHTML
    try {i = ddNum.lastElementChild.innerHTML*1} catch (error) {i=0}
    const parent = elements.previousElementSibling.innerHTML
    Array.from(elements.children).forEach(element => {
        // numero
        i +=1
        itemContent(ddNum,i)

        // code
        itemContent(code,element.innerHTML)

        // signification
        let sig = element.innerHTML.split('_')
        if (['e','o','u','i','a'].includes(parent[0])) {
            if (sig[sig.length-1].startsWith(parent[0]))
                parSig(sig," de l'",parent,ddSg)
            else    parSig(sig," de l'",parent,ddSg,true)
        }
        else if (['commande','direction'].includes(parent)){
            if (sig[sig.length-1].startsWith(parent[0]))
                parSig(sig," de la ",parent,ddSg)
            else parSig(sig," de la",parent,ddSg,true)
        }
        else{
            if (sig[sig.length-1].startsWith(parent.slice(0,2)))
                parSig(sig," du ",parent,ddSg)
            else parSig(sig," du ",parent,ddSg,true)
        }

        // type
        // if ([
        //     'matricule',
        //     'email',
        //     'caracteristique',
        //     'code',
        //     'libelle'
        // ].includes(sig[0])) itemContent(ddType,'an')
       
        // else if ([
        //     'numero',
        //     'telephone',
        //     'num',
        //     "annee_mise_service"
        // ].includes(sig[0])) itemContent(ddType,'n')
        // else itemContent(ddType,'a')

        // taille
        // if ([
        //     'matricule',
        //     'code',
        //     'telephone',
        //     "date"
        // ].includes(sig[0])) itemContent(ddTaille,'10')
        
        // else if ([
        //     'num'
        // ].includes(sig[0])) itemContent(ddTaille,'3')
       
        // else if ([
        //     'nom',
        // ].includes(sig[0])) itemContent(ddTaille,'20')
       
        // else if ([
        //     'prenom',
        //     'poste',
        //     'license',
        //     'service',
        //     'email'
        // ].includes(sig[0])) itemContent(ddTaille,'30')

        // else if ([
        //     'libelle'
        // ].includes(sig[0])) itemContent(ddTaille,'200')
        // else itemContent(ddTaille,'25')
        
        // nature
        itemContent(ddNt,'<span>el</span> , <span>sig</span>')
        
        // observation
        if(firtelement == element.innerHTML)
            itemContent(ddOb,'identifiant')
        else itemContent(ddOb,'identifiant',true)

    });

}
const entite = document.querySelector('.entite-df')
const entiteChild = Array.from(entite.children)
const mcd = document.querySelector('.mcd .entite-df')
entiteChild.forEach(
    element => insertLineDd(element.querySelector('.property'),ddCode)
)

// mode jour | nuit
const body = document.querySelector('body')
const butMode = body.querySelector('header button')
const sat = body.querySelector('.sat')
const mode = butMode.querySelector('input')
// let mode = true
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    butMode.dataset.m = 'jour'
    mode.checked = !mode.checked
    satImg()
}
else{
    body.setAttribute('class','j')
}

function satImg() {
    const imgSat = sat.querySelector('.img img')
    imgSat.src = 'img/sat-'+butMode.dataset.m[0]+'.jpeg'
}

butMode.firstElementChild.onclick = ()=>{
    if (mode.checked) {
        body.setAttribute('class','nuit')
        butMode.dataset.m = 'jour'
    }
    else{
        body.setAttribute('class','j')
        butMode.dataset.m = 'nuit'
    }
    // mode = !mode
    // console.log(mode)
    satImg()
}

// mcd
// reproduit le meme schema de l'entite

// entiteChild.forEach()