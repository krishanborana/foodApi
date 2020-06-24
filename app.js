window.onload = function()
{
    const API_KEY = "9c4f2fa9";
    const APPLICATION_KEY = "3849c53a852b2d986271c8aed2dc32c1";
    const submit = this.document.querySelector('.containerForm>form');
    submit.addEventListener('submit',(e)=>{
        e.preventDefault();
        let keyword = this.document.querySelector('.containerForm>form>input[type="search"]').value;
        var URL = `https://api.edamam.com/search?q=${keyword}&app_id=${API_KEY}&app_key=${APPLICATION_KEY}`;
        if(keyword.length<3 || !keyword.replace(/\s/g, '').length){
        	document.querySelector('.responseDiv').innerHTML = '<h3>Atleast Enter 3 non-space Characters</h3>';
        }
        else{
	        http = new XMLHttpRequest();
				http.onreadystatechange = function(){
          		if(http.readyState == 4 && http.status == 200){
	                if(http.responseText!==null){
	                    if(JSON.parse(http.responseText).hits.length ===0)
	                        document.querySelector('.responseDiv').innerHTML = '<h3>No Search Results</h3>';
	                    else
	                        document.querySelector('.responseDiv').innerHTML = createTemplate(http.responseText);
	            	}
    			}
    		}
    		http.open('GET', URL);
       		http.send();
        }
    });

    function createTemplate(json){
        json = JSON.parse(http.responseText);
        let newDiv = document.createElement('div');

        for(let i=0;i<json.hits.length;i++){
            let newDiv1 = document.createElement('div');
            newDiv1.classList.add('responseSpan');
            newDiv1.innerHTML+=`<h3>${json.hits[i].recipe.label}</h3><img src=${json.hits[i].recipe.image}></img>`;
            newDiv1.innerHTML+= `<p><b>Diet Label : </b>${json.hits[i].recipe.dietLabels}</p><p><b>Energy : </b>${json.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity} KCAL</p>`;
            newDiv1.innerHTML+=`<p><b>Fats : </b>${json.hits[i].recipe.totalNutrients.FAT.quantity} grams</p>`;
            newDiv1.innerHTML+=`<p><b>Sugar : </b>${json.hits[i].recipe.totalNutrients.SUGAR.quantity} grams</p>`;
            newDiv1.innerHTML+=`<p><b>Cholestrol : </b>${json.hits[i].recipe.totalNutrients.CHOLE.quantity} miligrams</p>`;
            newDiv1.innerHTML+=`<p><b>Protein : </b>${json.hits[i].recipe.totalNutrients.PROCNT.quantity} grams</p>`;
            let ingredients='';

            for(let j=0;j<json.hits[i].recipe.ingredientLines.length;j++){
                ingredients+=`<li>${json.hits[i].recipe.ingredientLines[j]}</li>`;
            }
            newDiv1.innerHTML+=`<p><b>Ingredients : </b><ul>${ingredients}</ul></p>`;
            newDiv1.innerHTML+=`<a href="${json.hits[i].recipe.url}" target="_blank"><button><i class="fa fa-external-link" aria-hidden="true"></i>  Read Full Article</button></a>`;
            newDiv.append(newDiv1);
        }
        return newDiv.outerHTML;
    }
}