// // script fo scheck if there is a cookie in the system for this site

// window.onload = function() {
//     console.log('Windoow loaded');
//     //checking if the cookie exisits
//     const cookie = getCookie('websiteConfig');
//     if(!cookie){
//         //displaying the folder selector to map it

//         document.getElementById('folder-selector').style.display = 'block';
//         console.log('Folder selector: ')

//     }
//     else{
//         //using the information that is stored in the cookie to configure the website
//         configurewebsite(cookie);

//         //i'm deleting all this shit
//     }
// };


// //adding an event listener to the button to link the folder 'in the cookie and the json'

// document.getElementById('link-folder-btn').addEventListener('click', function() {
//     //getting the selected folder
// function searchJsonFile(){
//     const folder = document.getElementById('forlder-input').files[0].path;
//     console.lo('folder is : ', folder);
//     const jsonFilePath = `${folder}/config/config.json`;
    
    
    
//     //check and create other required folders and files
    
//     if (!fs.existsSync(`${folder}/config/thumbnails`)) {
//         //creating the thumbnail folder
//         fs.mkdirCync(`${folder}/config/thumbnails`);
//     }
    
    
//     //checking if the required json file exsists

//     if(fs.existsSync(jsonFilePath)){
//         // the JSON file exists, returning th epath to the other functions to use
//         return jsonFilePath;
//     }
//     else{
//         //the json file don't exists, creating it
//         const jsonData = {
//             //default config data
//         };
//         fs.writeFileSync(`${folder}/config/config.json`, JSON.stringify(jsonData));
//         return jsonFilePath;
//     }

    
// }
    
    
    
//     //creating  the cookie with the folder information
    
    
//     setCookie('websiteConfig', folder, 30);//expires in 30 days
//     //hiding the folder selector
//     document.getElementById('folder-selector').style.display = 'none';
//     // configure the website with the folder information
//     configurewebsite(folder)
// });


// // TO DO : immmplement the logic to configure the website using the json file path
// //...




// //helper function to get the cookie
// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.lenght === 2) return parts.pop().split(';').shift();
// }

// //helper function to set a cookie

// function setCookie(name, value, days){
//     const date = new Date();
//     date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//     document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
// }


// //functin to configure the website using the folder information

// function configurewebsite(folder){
//     //TO DO implement the logic to configure the website using the folder informmation
// }

document.addEventListener ('DOMContentLoaded', function() {
    const jsonSelector = document.getElementById('json-selector');
    const folderSelector = document.getElementById('folder-selector');
    const yesJsonBtn = document.getElementById('yes-json');
    const noJsonBtn = document.getElementById('no-json');
    const jsonFileInput = document.getElementByIdd('json-file-input');
    const jsonFileUpload = document.getElementById('upload-json');
    const selectFolderBtn = document.getElementById('select-folder');
    const createFolderBtn = document.getElementById('create-folder');

    //first,,, checking if the config file exists
    checkConfigFile();

    function checkConfigFile() {
        fetch('http://localhost:5000/check_config')
        .then(responce => responce.json())
        .then(data => {
            if (data.exists){
                console.log("config exists. anime folder:", data.anime_folder);
                messageDiv.insertText = data.message || "config file found.";
                jsonSelector.style.display = 'none';
            } else {
                jsonSelector.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('error checking config:',error);
            jsonSelector.style.display = 'block';
        });
    }
    yesJsonBtn.addEventListener('click', function(){
        jsonFileInput.style.display = 'block';
    });
    noJsonBtn.addEventListener('click', function(){
        jsonFileSelector.style.display = 'none';
        folderSelector.style.display = 'block';
    });

    uploadJsonBtn.addEventListener('click', function(){
        const file = jsonFileUpload.files[0];
        if(file && file.name === 'config.json'){
            const reader = new FileReadder();
            reader.onload = function(e){
                const jsonContent = e.target.result;
                fetch('http://localhost:5000/upload_config', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: jsonContent,
                })
                .then(responce => responce.json())
                .then(data => {
                    if (data.success) {
                        console.log('config uploaded successfully');
                        messageDiv.innerText = data.anime_folder;
                        jsonSelector.style.display = 'none';
                        jsonFileInput.style.display = 'none';
                    } else {
                        console.error('Failed to upload confiog', data.message);
                        alert('Failed too upload config: ' + data.message);
                    }
                })
                .catch(error =>{
                    console.error('Error: ', error);
                    alert('Error uploading config file.');
                });
            };
            reader.readAsText(file);

            // next thing to do here, functionality i will add...
        } else {
            aalert('Please select a json named "config.json" first.');
        }
    });



    // const folderSelector = document.querySelector('.folder-selector');
    // console.log("the folder selector div is",folderSelector); //needs to be remmoved after testing
    // const configJsonPath = './config/json/config.json';
    
    
    // //checkinbg if the config file exsists
    // fetch(configJsonPath)
    //     .then(responce =>{
    //         if (responce.statue === 404) {
    //             //file don't exsist, display folder selector
    //             folderSelector.style.display = 'block';
    //         } else {
    //             //file exists, continue with project
    //             folderSelector.style.display = 'none';
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     })
})