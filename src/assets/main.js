const content = null || document.getElementById('content');

const urlAPI ="https://local-business-data.p.rapidapi.com/business-reviews?business_id=ChIJj8wYM8srQY4Rriqhg_fuEyc&limit=5&sort_by=most_relevant&region=us&language=es";

const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "f71886bc5cmsh1a8966d7c611ce2p17e121jsnd6e1504bec74",
        "x-rapidapi-host": "local-business-data.p.rapidapi.com",
    },
}

async function getData(urlAPI){
    const response = await fetch(urlAPI, options);
    const data = await response.json()
    return data
}

// Esta función anónima se ejecuta cuando se carga el archivo
(async()=>{
    try{
        const data = await getData(urlAPI)
        const reviews = data.data
        let view = ''
        reviews.forEach(review => {
            view += `
                <a href="${review.review_link}" target=_blank >
                    <div class="group relative p-6 shadow-lg rounded-xl">
                        <div
                            class="w-full aspect-w-1 flex flex-row items-center aspect-h-1 rounded-mdoverflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${review.author_photo_url}" class="w-16" alt="foto de perfil" class="w-full">
                            <h3 class="text-lg ms-8 text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${review.author_name}
                            </h3>
                        </div>
                        <div class="mt-4 flex justify-between">
                            <p class="text-sm">${review.review_text}</p>
                        </div>
                    </div>
                </a>
            `;   
        });
        content.innerHTML = view;
    }catch(error){
        console.log(error)
    }
})();