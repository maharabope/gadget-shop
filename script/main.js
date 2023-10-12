const mainFunction= async (searchText='a', isShowAll)=>{
    const api= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const allData= await api.json()
    const data= allData.data
   phoneData(data, isShowAll);
}

const phoneData=(phones , isShowAll)=>{
    const findParents= document.getElementById('phone-container')
    findParents.textContent='';
    

    const showAllBtn= document.getElementById('show-all-btn')
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');

    }
    else{
        showAllBtn.classList.add('hidden')
    }

    if(!isShowAll){
        phones=phones.slice(0,12);

    }
    
    // console.log(isShowAll)

   phones.forEach(phone => {
    
    // console.log(phone);


    const phoneCard= document.createElement('div');
    phoneCard.classList= `card card-compact p-4 bg-base-100 shadow-xl`;
    phoneCard.innerHTML=`
            
                <figure><img src="${phone.image}"></figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                    <button onclick="ShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
                    
                </div>
            
    `
    findParents.appendChild(phoneCard)
    toggleLoading(false)
    // console.log(phone)
    
   });

}

const btnHandler=(isShowAll)=>{
    const findInput= document.getElementById('input');
    const inputValue= findInput.value;
    
    mainFunction(inputValue, isShowAll);

    toggleLoading(true);
    // console.log(inputValue)
    
}

const toggleLoading=(isLoading)=>{
    const findElement= document.getElementById('loading');
    if(isLoading){
        findElement.classList.remove('hidden')
    }
    else{
        findElement.classList.add('hidden')
    }
}

const showMoreData=()=>{
    btnHandler(true);
}

const ShowDetails=async(id)=>{
    const detailsApi= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const res= await detailsApi.json();
    const detailsData= res.data;
    // console.log(detailsData.name);
    
    details(detailsData);
    

}

const details= (data)=>{

    // console.log(data);
    // console.log(data.image);

    const imgElement= document.getElementById('image');
    imgElement.src= data.image;
    const phoneName= document.getElementById('phone_name')
    phoneName.innerText=data.name
    const phoneStorage= document.getElementById('phone_storage')
    phoneStorage.innerText=data.mainFeatures.storage;
    const disPlaySize= document.getElementById('display_size');
    disPlaySize.innerText= data.mainFeatures?.displaySize;
    const chipset= document.getElementById('chipset');
    chipset.innerText= data.mainFeatures?.chipSet;
    const memory= document.getElementById('memory');
    memory.innerText=data.mainFeatures.memory;
    const slug= document.getElementById('slug');
    slug.innerText=data.slug;
    const releaseDate= document.getElementById('release_date');
    releaseDate.innerText=data.releaseDate;
    const brand= document.getElementById('brand');
    brand.innerText=data.brand;
    const gps= document.getElementById('gps');
    // gps.innerText= data?.others?.GPS;
    if(data?.others?.GPS){
        gps.innerText= data?.others?.GPS;
    }
    else{
       gps.innerText=''
    }
    // console.log(data.others.GPS)
    

    my_modal.showModal();
}




mainFunction();
// mainFunction("oppo");
// mainFunction("iphone");

