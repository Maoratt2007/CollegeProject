const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const btn_login= document.querySelector('.btn');
const email = $('#email').val();
const password = $('#password').val();
const name = $('#name').val();
const userData={
    name:name,
    email:email,
    password:password
}


const registerForm = document.querySelector("#register-form")

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const user = {name,email,password}


    try {
        // send the user details to the register route and get a response (May be error)
        const response = await fetch("/api/user/register", {method:"POST", headers: {"Content-Type" : "application/json"}, body: JSON.stringify(user)})
        const { token } = await response.json()

        if(token ){ 
            localStorage.setItem("token", token)
            console.log(token)
            alert("Registered successfully")
        }


    } catch(e) {
        alert(e.message)
        console.log(e)
    }
    

})


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});


// Additional code for handling user authentication and showing/hiding content
// window.addEventListener('DOMContentLoaded', () => {
//     const isLoggedIn = checkUserLoggedIn(); // Replace this with actual logic

//     const $loginContainer = document.querySelector('.form-box.login');
//     const $contentContainer = document.querySelector('.content-container');

//     if (isLoggedIn) {
//         $loginContainer.style.display = 'none';
//         $contentContainer.style.display = 'block';
//     } else {
//         $loginContainer.style.display = 'block';
//         $contentContainer.style.display = 'none';
//     }
// });
$('.btn').click(function () {
    localStorage.setItem('userData', JSON.stringify(userData));
});


