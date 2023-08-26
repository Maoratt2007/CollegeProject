const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const btn_login = document.querySelector('.btn');

const registerForm = document.querySelector("#register-form")
const loginForm = document.querySelector("#login-form")
const logoutBtn = document.querySelector(".logout")

let currentUser;
const forgotPasswordButton = document.querySelector(".forgot-password")


const saveToken = (token) => {
    localStorage.setItem("token", token)
}

const logout = (e) => {
    if(confirm("Are you sure you would like to log out?")) {
        localStorage.removeItem('token')
        alert("Logged out successfully")
        window.location.reload()
    }
}


logoutBtn.addEventListener('click',logout)

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const user = {name,email,password,manager:false}

    try {
        // send the user details to the register route and get a response (May be error)
        const response = await fetch("/api/user/register", { method:"POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(user)})
        const { token } = await response.json()
        if (!response.ok) {
           alert(data.errors)
        }

        if(token ){ 
            saveToken(token)
            getUser()
        }

    } catch(error) {
        alert(error.message)
        console.log(error)
    }


})


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    let user = {email ,password}
    try {
            const response = await fetch("/api/user/login", { method:"POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(user)})
            const { token } = await response.json()
            console.log("Token", token)
            saveToken(token)
            user = await getUser()
            const { manager } = user
        if(manager === false)
            window.location.href= "homepage";
        else
            window.location.href="homepagemanager";
        } catch(e) {
            alert("could not login with these credentials.")
            console.log(e)
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


const onForgotPassword = async (e) => {

    if(confirm("Are you certain you would like to change your password?")) {

        const email = prompt("Enter email address")
        try {

            const response = await fetch("/api/user/reset-pass-request", { method:"POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({email})})
            if(!response.ok) {
                alert("This email address is not a registered address!")
                return
            }
            await window.sendEmail(email) // reset password email
            alert("Email address has been sent to your email for activation")

        } catch(error) {
            alert("This email address is not a registered address!")
            console.error(error)
        } 

    }
 }

forgotPasswordButton.addEventListener('click', onForgotPassword)



const greet = (theUser) => {
    const parent = btnPopup.parentNode
    const nameTag = document.createElement('p')
    nameTag.classList.add("nameTag")
    nameTag.innerText = theUser.name
    parent.appendChild(nameTag)
}


const showLogout = () => {
    logoutBtn.style.display = 'flex'
    logoutBtn.style.alignItems = 'center'
    logoutBtn.style.justifyContent = 'center'
    btnPopup.style.display = 'none'
}


const showLogin = () => {
    logoutBtn.style.display = 'none'
    btnPopup.style.display = 'flex'
    btnPopup.style.alignItems = 'center'
    btnPopup.style.justifyContent = 'center'
}

const getUser = async () => {
    let  token = localStorage.getItem('token')

    if(token) {
       return await fetch("/api/user/", {method:"GET", headers: { "Content-Type" : "application/json", "Authorization": `Bearer ${token}` }} )
        .then(res => { 
            return res.json()
        }).then(theUser => {
            currentUser = theUser;
            greet(currentUser)
            showLogout()
            return currentUser
        }).catch(e => {
            currentUser = null
            showLogin()
            localStorage.removeItem('token')
        })
    }
}

window.onload = getUser