// script fo scheck if there is a cookie in the system for this site

window.onload = function() {
    console.log('Windoow loaded');
    //checking if the cookie exisits
    const cookie = getCookie('websiteConfig');
    if(!cookie){
        //displaying the folder selector to map it

        document.getElementById('folder-selector').style.display = 'block';
        console.log('Folder selector: ')

    }
    else{
        //using the information that is stored in the cookie to configure the website
        configurewebsite(cookie);
    }
};


//adding an event listener to the button to link the folder 'in the cookie and the json'

document.getElementById('link-folder-btn').addEventListener('click', function() {
    //getting the selected folder
function searchJsonFile(){
    const folder = document.getElementById('forlder-input').files[0].path;
    console.lo('folder is : ', folder);
    const jsonFilePath = `${folder}/config/config.json`;
    
    
    
    //check and create other required folders and files
    
    if (!fs.existsSync(`${folder}/config/thumbnails`)) {
        //creating the thumbnail folder
        fs.mkdirCync(`${folder}/config/thumbnails`);
    }
    
    
    //checking if the required json file exsists

    if(fs.existsSync(jsonFilePath)){
        // the JSON file exists, returning th epath to the other functions to use
        return jsonFilePath;
    }
    else{
        //the json file don't exists, creating it
        const jsonData = {
            //default config data
        };
        fs.writeFileSync(`${folder}/config/config.json`, JSON.stringify(jsonData));
        return jsonFilePath;
    }

    
}
    
    
    
    //creating  the cookie with the folder information
    
    
    setCookie('websiteConfig', folder, 30);//expires in 30 days
    //hiding the folder selector
    document.getElementById('folder-selector').style.display = 'none';
    // configure the website with the folder information
    configurewebsite(folder)
});


// TO DO : immmplement the logic to configure the website using the json file path
//...




//helper function to get the cookie
function getCookie(name) {
    const value = `; ${dokument.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.lenght === 2) return parts.pop().split(';').shift();
}

//helper function to set a cookie

function setCookie(name, value, days){
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}


//functin to configure the website using the folder information

function configurewebsite(folder){
    //TO DO implement the logic to configure the website using the folder informmation
}