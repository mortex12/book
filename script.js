let resultat=[]
let data=[]

    //-----------------------------------création de card----------------------    
    function livres(){
        document.getElementById('card').innerHTML=""
        for (let e=0;e<resultat.length;e++){
            livre(resultat[e])
        }
    }

    function livre(book){

let div=document.createElement('div')
let espace=document.createElement('div')
let img=document.createElement('img')
let div1=document.createElement('div')
let h5=document.createElement('h5')
let p=document.createElement('p')
let ul=document.createElement('ul')
let li=document.createElement('li')    
let li1=document.createElement('li')
let li2=document.createElement('li')
let li3=document.createElement('li')
let li4=document.createElement('li')
let a=document.createElement('button')
let divlong=document.createElement('div')
let divlongs=document.createElement('div')

let titre=document.createTextNode(book.title)
let auteur=document.createTextNode('Auteur: '+book.authors)
let categorie=document.createTextNode('Catégorie:  '+book.categories)
let page=document.createTextNode('Nombre de page:  '+book.pageCount)

// let long=document.createTextNode('long description: '+book.longDescription)


if(book.isbn!=undefined){
    li2.innerHTML='ISBN:  '+book.isbn
}
if(book.shortDescription!=undefined){
    p.innerHTML='Short description: '+book.shortDescription
}

if(book.publishedDate!=undefined){
    li3.innerHTML='Date et heur:  '+moment(book.publishedDate.dt_txt).format("DD/MM/YYYY")
}
if(book.thumbnailUrl!=undefined){
    img.setAttribute('src',book.thumbnailUrl)
}
else{
    img.setAttribute('src','https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png')
}

if(book.shortDescription!=undefined){
    divlongs.innerHTML='Long description: '+book.longDescription
}
espace.setAttribute('class','col-lg-4 mt-5 del')
div.setAttribute('class','m-auto card bg-black text-white text-center bg-opacity-50')
div.setAttribute('style','width: 18rem')
img.setAttribute('class','card-img-top')
img.setAttribute('alt','Jaquette')
div1.setAttribute('card','card-body')
h5.setAttribute('calss','card-title')
p.setAttribute('class','card-text')
ul.setAttribute('class','list-group-flush')
li.setAttribute('class','list-group-item bg-black text-white text-center bg-opacity-50')
li1.setAttribute('class','list-group-item bg-black text-white text-center bg-opacity-50')
li2.setAttribute('class','list-group-item bg-black text-white text-center bg-opacity-50')
li3.setAttribute('class','list-group-item bg-black text-white text-center bg-opacity-50')
li4.setAttribute('class','list-group-item bg-black text-white text-center bg-opacity-50')

a.setAttribute('class','btn btn-dark')
a.setAttribute('type','button')
a.setAttribute('data-bs-toggle','collapse')
a.setAttribute('data-bs-target','#collapseExample')
a.setAttribute('aria-expanded','false')
a.setAttribute('aria-controls','collapseExample')
divlong.setAttribute('class','collapse')
divlong.setAttribute('id','collapseExample')
divlongs.setAttribute('class','card bg-black')


h5.appendChild(titre)
li.appendChild(auteur)
li1.appendChild(categorie)
li4.appendChild(page)
espace.appendChild(div)
div.appendChild(img)
div.appendChild(div1)
div.appendChild(ul)
div1.appendChild(h5)
div1.appendChild(p)
ul.appendChild(li)
ul.appendChild(li1)
ul.appendChild(li2)
ul.appendChild(li3)
ul.appendChild(li4)

div.appendChild(a)
a.appendChild(divlong)
divlong.appendChild(divlongs)

document.getElementById('card').appendChild(espace)
    


}

//-----------------------parti de recherche--------------

document.getElementById('searchBar').addEventListener('keydown',function(event) { if(event.key === 'Enter'){ btnSearch()}})

function btnSearch(){
    let input = document.getElementById('searchBar').value;
    input=input.toLowerCase();
    let x=document.getElementsByClassName('col-lg-4 mt-5 del');

    for (let i=0;i < x.length-1;i++){
        if(!x[i].innerHTML.toLowerCase().includes(input)){
            x[i].style.display = "none";
        }
        else{
            x[i].style.display = "";
        }
    }
}

function searchAuthors(){
resultat=[]
    let author=document.getElementById('auteur').value
    for( let x=0;x<data.length;x++){
    if(data[x].authors.includes(author)){
    resultat.push(data[x])
}}
    livres() 
}

function searchCategories(){
    resultat=[]
    let categorie=document.getElementById('categories').value
    for( let y=0;y<data.length;y++){
        if(data[y].categories.includes(categorie)){
            resultat.push(data[y])
        }
        }
    livres()
}


fetch('books.json')
.then(function(response) {
    return response.json();

})
.then(function(json) {
    let authors=[]
    let categories=[]
    data=json

    for(let i=0;i<json.length;i++){
        livre(json[i])
                
        
			for (let j=0;j<json[i].authors.length;j++) {
				if (!authors.includes(json[i].authors[j])) {
					authors.push(json[i].authors[j]);
				}
			}
			for (let j=0;j<json[i].categories.length;j++) {
				if (!categories.includes(json[i].categories[j])) {
					categories.push(json[i].categories[j]);
				}
			}
    }    
        authors.sort()
        categories.sort()

        authors.forEach(function (element,index,[]) {
            let opt=document.createElement('option')
            opt.setAttribute('value',element)
            opt.innerHTML=element
            document.getElementById('auteur').appendChild(opt)
            
        })

        categories.forEach(function (element,index,[]) {
            let opt=document.createElement('option')
            opt.setAttribute('value',element)
            opt.innerHTML=element
            document.getElementById('categories').appendChild(opt)
            
        })
        document.getElementById('auteur').addEventListener('change',searchAuthors)
        document.getElementById('categories').addEventListener('change',searchCategories)
})
