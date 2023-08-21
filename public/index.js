const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const btn_login = document.querySelector('.btn');

const registerForm = document.querySelector("#register-form")
const loginForm = document.querySelector("#login-form")

let token;
let currentUser;
const manager= false;


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const user = {name,email,password,manager}

    // send the user details to the register route and get a response (May be error)
    const response = await fetch("/api/user/register", {method:"POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(user)})
    const data = await response.json()
    if (!response.ok) {
        alert(data.errors)
    }



})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    const user = {email,password}

    // send the user details to the register route and get a response (May be error)
    const response = await fetch("/api/user/login", { method:"POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(user)})
    const data = await response.json()
    if (response.ok) {
        const { userId, manager } = data

        if( userId ){
            localStorage.setItem("userId", userId)
            alert("Logged in successfully")
        }
        if(manager === false)
        {
            window.location.href= "homepage";
        }
        else
        {
            window.location.href="homepagemanager";

        }
    } else {
        alert(data.errors)
    }
})



registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');//change to register-page
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');//change to login-page
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});
// btn_login.addEventListener('click', ()=> {
//     if(manager==false)
//     {
//         window.location.href="homapage";
//     }
//     else
//     {
//         window.location.href="homepagemanager";
//
//     }
// });





// // All the cities that the pizza place serve
// const services = [
//     { continent: "Sharon", cities : ["Tel Aviv", "Rannana", "Kfar Sabba", "Petach tikva"]  },
//     { continent: "Shfela", cities : ["Tel Aviv", "Rannana", "Kfar Sabba", "Petach tikva"]  },
//     { continent: "Gosh Dan", cities : ["Tel Aviv", "Rannana", "Kfar Sabba", "Petach tikva"]  },
//     { continent: "Zafon", cities : ["Tel Aviv", "Rannana", "Kfar Sabba", "Petach tikva"]  },
//     { continent: "Darom", cities : ["Tel Aviv", "Rannana", "Kfar Sabba", "Petach tikva"]  },

// ]

// const servicesArea = document.querySelector(".services")


// window.onload = function() {


//     const serviceWrapper = document.createElement('div')

//     serviceWrapper.classList.add('serviceWrapper')

//     // add the cities that services are given at dynammically
//     for(let service  of services) {
//         let serviceList = document.createElement('div')
//         serviceList.classList.add("serviceList")
//         const serviceContinentLabel = document.createElement('h4')
//         serviceContinentLabel.innerText = service.continent
//         serviceContinentLabel.classList.add('serviceContinentLabel')
//         serviceList.appendChild(serviceContinentLabel)
//         // create a city label for each city
//         for (let city of service.cities) {
//             let cityLabel = document.createElement('p')
//             cityLabel.innerText = city
//             cityLabel.classList.add("cityLabel")
//             serviceList.appendChild(cityLabel) 
            
//             cityLabel.addEventListener('click', () =>  {
//                 window.location.href = `/services/${city}`
//             })
//         }


//         // add the list to the services area
//         serviceWrapper.appendChild(serviceList)
//     }
//       servicesArea.appendChild(serviceWrapper)
// }



const getUser = () => {
    if((token = localStorage.getItem('token')) != null) {
        const parent = btnPopup.parentNode
        fetch("/api/user/", {method:"GET", headers: { "Content-Type" : "application/json", "Authorization": `Bearer ${token}` }} )
        .then(res => { 
            return res.json()
        }).then(theUser => {
            const nameTag = document.createElement('p')
            nameTag.classList.add("nameTag")
            nameTag.innerText = theUser.name
            parent.appendChild(nameTag)
            currentUser = theUser;
        }).catch(e => {
            currentUser = null
            localStorage.removeItem('token')
        })
    }
}


window.onload = getUser();
