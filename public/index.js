const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
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

const servicesArea = document.querySelector(".services")


window.onload = function() {


    const serviceWrapper = document.createElement('div')

    serviceWrapper.classList.add('serviceWrapper')

    // add the cities that services are given at dynammically
    for(let service  of services) {
        let serviceList = document.createElement('div')
        serviceList.classList.add("serviceList")
        const serviceContinentLabel = document.createElement('h4')
        serviceContinentLabel.innerText = service.continent
        serviceContinentLabel.classList.add('serviceContinentLabel')
        serviceList.appendChild(serviceContinentLabel)
        // create a city label for each city
        for (let city of service.cities) {
            let cityLabel = document.createElement('p')
            cityLabel.innerText = city
            cityLabel.classList.add("cityLabel")
            serviceList.appendChild(cityLabel) 
            
            cityLabel.addEventListener('click', () =>  {
                window.location.href = `/services/${city}`
            })
        }


        // add the list to the services area
        serviceWrapper.appendChild(serviceList)
    }
      servicesArea.appendChild(serviceWrapper)
}

