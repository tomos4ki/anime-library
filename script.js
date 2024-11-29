// script fo scheck if there is a cookie in the system for this site

window.onload = function() {
    //checking if the cookie exisits
    const cookie = getCookie('websiteConfig');
    if(!cookie){
        //displaying the folder selector to map it

        document.getElementById('folder-selector').style.display = 'block';

    }
    else{
        //using the information that is stored in the cookie to configure the website
        configurewebsite(cookie);
    }
};


//adding an event listener to the button to link the folder 'in the cookie and the json'

document.getElementById('link-folder-btn').addEventListener('click', function() {
    //getting the selected folder

    const folder = document.getElementById('forlder-input').files[0].path;
    
    //checking if the required json file exsists
    //-------------------see you stopped here tomo-----------
    //------see the text file from where you stopped to continue----
    
    
    
    //creating  the cookie with the folder information
    
    
    setCookie('websiteConfig', folder, 30);//expires in 30 days
    //hiding the folder selector
    document.getElementById('folder-selector').style.display = 'none';
    // configure the website with the folder imputs
    configurewebsite(folder)
});

//helper function to get the cookie
function getCookie(name) {
    const value = `; ${dokument.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.lenght === 2) return parts.pop().split(';').shift();
}

//helper function to get the cookie

function setCookie(name, value, days){
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}


//functin to configure the website using the folder information

function configurewebsite(folder){
    //TO DO implement the logic to configure the website using the folder informmation
}