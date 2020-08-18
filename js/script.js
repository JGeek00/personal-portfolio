const data = {
    "name": "", //Personal name
    "photoLink": "",    //Personal picture
    "description": "",  //Short description
    "aboutTextHtml": "", //Big description. Use HTML code.
    "aboutPictureUrl": "",  //Picture for the "about" page
    "technologies": [
        //Columns -- DO NOT USE MORE THAN 4
        {
            "name": "", //Section name
            "elements": [
                //Elements per column
                {
                    "name": "", //Technology name (ex: HTML)
                    "icon": "", //Technology icon
                    "rating": 0  //Knowdelge of this technology
                },
            ]
        },
    ],
    "experience": [
        {
            "position": "", //Name of the position at the company
            "company": "",  //Company name
            "location": "", //Location of the office
            "beginning": "",    //Beggining date
            "end": "",  //End date
            "description": ""   //Description of the work at that company. Use HTML code
        },
    ],
    "training": [
        {
            "name": "", //Name of the degree
            "college": "", //Name of the college/university
            "location": "", //Location of the college/university
            "beginning": "",    //Beginning date
            "end": "",  //End date
            "description": ""   //Description of the degree
        },
    ],
    "projects": [
        {
            "name": "", //Project name
            "year": "", //Ending year
            "technologies": "", //Technologies used on the project
            "repositoryLink": "", //Project repository link. Leave empty if no repository
            "textRepository": "", //Project repository text (for display on the field). Leave empty if no repository
            "deployedLink": "", //Leave empty if it isn't deployed
            "textDeployed": "", //Leave empty if it isn't deployed
            "login": {  //Leave empty (with '') if no login
                "username": "",
                "password": ""
            },
            "description": "" //Project description
        },
    ],
    "email": "", //Contact email
    "phoneText": "",    //Contact phone (for d∫isplay on the field)
    "phoneNumber": "",  //Contact phone 
    "cv": ""    //CV path
}

var thisPage = 1;
var menuStatus = 'closed';

document.addEventListener('DOMContentLoaded', function () {
    setData(data);
    arrowsListeners();
    buttonsListeners();
    hambMenu();

    document.getElementById('projectRepository').addEventListener('click', () => window.open('https://github.com/JGeek00', '_blank'));
    document.getElementById('githubButton').addEventListener('click', () => window.open('https://github.com/JGeek00', '_blank'));
});

function hambMenu() {
    document.getElementById("hambButton").addEventListener("click", function() {
        if (menuStatus == 'closed') {
            document.getElementById("hambMenu").style.setProperty("top", "0px");
            document.getElementById("hambButtonIcon").setAttribute('class', 'fa fa-times');
            menuStatus = 'open';
        }
        else if (menuStatus == 'open') {
            closeHambMenu();
        }
    });

    window.addEventListener('resize', function(event) {
        if (event.currentTarget.innerWidth > 1200 && menuStatus == 'open') {
            closeHambMenu();
        }
    });

    document.addEventListener('click', function(event) {
        if (event.screenY > 893 && menuStatus == 'open') {
            closeHambMenu();
        }
    });
}

function closeHambMenu() {
    document.getElementById("hambMenu").style.setProperty("top", "-480px");
    document.getElementById("hambButtonIcon").setAttribute('class', 'fa fa-bars');
    menuStatus = 'closed';
}

function setData(data) {
    document.title = data.name;

    document.getElementById('topBarNameField').appendChild(
        document.createTextNode(data.name)
    );
    document.getElementById('topBarPhoto').style.setProperty('background-image', "url("+data.photoLink+")");

    document.getElementById('mainPhoto').setAttribute('src', data.photoLink);
    document.getElementById('mainName').appendChild(
        document.createTextNode(data.name)
    );
    document.getElementById('mainDescription').appendChild(
        document.createTextNode(data.description)
    );

    document.getElementById('aboutText').innerHTML = data.aboutTextHtml;
    document.getElementById('aboutPicture').setAttribute('src', data.aboutPictureUrl);

    insertTechnologies(data.technologies);

    insertExperience(data.experience);

    insertTraining(data.training);

    insertProjects(data.projects);

    document.getElementById("email").appendChild(
        document.createTextNode(data.email)
    );
    document.getElementById("email").setAttribute('href', 'mailto:'+data.email);
    document.getElementById("phone").appendChild(
        document.createTextNode(data.phoneText)
    );
    document.getElementById("phone").setAttribute('href', 'tel:'+data.phoneNumber);
    document.getElementById("downloadCV").setAttribute('href', data.cv);
}

function insertTechnologies(data) {
    const columnWidth = 100/data.length;
    document.getElementById("technologiesBox").style.setProperty("grid-template-columns", columnWidth+"%")

    for (let i = 0; i < data.length; i++) {
        _createColumn(data[i], i+1);
    }

    function _createColumn(data, position) {
        const mainDiv = document.createElement("div");
        mainDiv.setAttribute('class', 'column');
        mainDiv.style.setProperty("grid-column", position+"/"+(position+1));

        const title = document.createElement("div");
        title.setAttribute("class", "columnTitle");
        title.appendChild(
            document.createTextNode(data.name)
        );
        mainDiv.appendChild(title);

        const elementsDiv = document.createElement("div");
        elementsDiv.setAttribute("class", "elementsDiv");
        
        for (let i = 0; i < data.elements.length; i++) {
            elementsDiv.appendChild(_createElement(data.elements[i]));
        }
        mainDiv.appendChild(elementsDiv);

        document.getElementById("technologiesBox").appendChild(mainDiv);
    }

    function _createElement(data) {
        const mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "elementDiv");

        const picture = document.createElement("div");
        picture.setAttribute("class", "elementIconContainer");
        const icon = document.createElement("img");
        icon.setAttribute("class", "elementIcon")
        icon.setAttribute("src", data.icon)
        picture.appendChild(icon);

        const title = document.createElement("div");
        title.setAttribute("class", "elementTitle")
        const text = document.createElement("span").appendChild(
            document.createTextNode(data.name)
        );
        title.appendChild(text);

        const starsContainer = _createStars(data.rating);
        title.appendChild(starsContainer);

        mainDiv.appendChild(picture);
        mainDiv.appendChild(title);

        return mainDiv;
    }

    function _createStars(quantity) {
        const container = document.createElement("div");
        container.setAttribute("class", "starsContainer");

        for (let i = 0; i < quantity; i++) {
            const star = document.createElement("img");
            star.setAttribute("src", "../../assets/star.png");
            star.setAttribute("class", "star");
            container.appendChild(star);
        }

        return container;
    }
}

function insertExperience(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("experienceBox").appendChild(_createItem(data[i]));
    }

    function _createItem(data) {
        const container = document.createElement("div");
        container.setAttribute("class", "item");

        const top = document.createElement("div");
        top.setAttribute("class", "top");
        container.appendChild(top);

        const leading = document.createElement("div");
        leading.setAttribute("class", "data");
        top.appendChild(leading);

        const arrow = document.createElement("div");
        arrow.setAttribute("class", "arrowContainer");
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-angle-down");
        arrow.appendChild(icon);
        top.appendChild(arrow);

        arrow.addEventListener('click', (e) => {
            var first = true;
            const element = e.target;
            var description = element.parentNode.parentNode.parentNode.lastChild;
            if (description.getAttribute('class') != 'description') {
                description = element.parentNode.parentNode.lastChild;
                $(description).toggle(250);
            }
            else {
                $(description).toggle(250);
            }
            setInterval(() => {
                if (first == true) {
                    if (description.style.display == 'none') {
                        arrow.style.setProperty('transform', 'rotate(0deg)');
                    }
                    else if (description.style.display == 'block') {
                        arrow.style.setProperty('transform', 'rotate(180deg)');
                    }
                    first = false;
                }
            }, 300);
        });

        const title = document.createElement("div");
        title.setAttribute("class", "itemTitle");
        title.appendChild(
            document.createTextNode(data.position)
        );
        leading.appendChild(title);

        const info = document.createElement("div");
        info.setAttribute("class", "info");
        const company = document.createElement("div");
        const companyIcon = document.createElement("img");
        companyIcon.setAttribute("src", "../../assets/building-icon.png");
        companyIcon.setAttribute("class", "itemIcon");
        company.appendChild(companyIcon);
        const textCompany = document.createElement("div");
        textCompany.setAttribute("class", "textInfo");
        textCompany.appendChild(
            document.createTextNode(data.company)
        );
        company.appendChild(textCompany); 
        info.appendChild(company);

        const location = document.createElement("div");
        const locationIcon = document.createElement("img");
        locationIcon.setAttribute("src", "../../assets/location-icon.png");
        locationIcon.setAttribute("class", "itemIcon");
        location.appendChild(locationIcon);
        const textLocation = document.createElement("div");
        textLocation.setAttribute("class", "textInfo");
        textLocation.appendChild(
            document.createTextNode(data.location)
        );
        location.appendChild(textLocation); 
        info.appendChild(location);

        const date = document.createElement("div");
        const dateIcon = document.createElement("img");
        dateIcon.setAttribute("src", "../../assets/date-icon.png");
        dateIcon.setAttribute("class", "itemIcon");
        date.appendChild(dateIcon);
        const textDate = document.createElement("div");
        textDate.setAttribute("class", "textInfo");
        textDate.appendChild(
            document.createTextNode(data.beginning + " - " + data.end)
        );
        date.appendChild(textDate); 
        info.appendChild(date);
        
        leading.appendChild(info);

        const description = document.createElement("div");
        description.setAttribute("class", "description");
        description.innerHTML = data.description;
        container.appendChild(description);

        return container;
    }   
}

function insertTraining(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("trainingBox").appendChild(_createItem(data[i]));
    }

    function _createItem(data) {
        const container = document.createElement("div");
        container.setAttribute("class", "item");

        const top = document.createElement("div");
        top.setAttribute("class", "top");
        container.appendChild(top);

        const leading = document.createElement("div");
        leading.setAttribute("class", "data");
        top.appendChild(leading);

        const arrow = document.createElement("div");
        arrow.setAttribute("class", "arrowContainer");
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-angle-down");
        arrow.appendChild(icon);
        top.appendChild(arrow);

        arrow.addEventListener('click', (e) => {
            var first = true;
            const element = e.target;
            var description = element.parentNode.parentNode.parentNode.lastChild;
            if (description.getAttribute('class') != 'description') {
                description = element.parentNode.parentNode.lastChild;
                $(description).toggle(250);
            }
            else {
                $(description).toggle(250);
            }
            setInterval(() => {
                if (first == true) {
                    if (description.style.display == 'none') {
                        arrow.style.setProperty('transform', 'rotate(0deg)');
                    }
                    else if (description.style.display == 'block') {
                        arrow.style.setProperty('transform', 'rotate(180deg)');
                    }
                    first = false;
                }
            }, 300);
        });

        const title = document.createElement("div");
        title.setAttribute("class", "itemTitle");
        title.appendChild(
            document.createTextNode(data.name)
        );
        leading.appendChild(title);

        const info = document.createElement("div");
        info.setAttribute("class", "info");
        const company = document.createElement("div");
        const companyIcon = document.createElement("img");
        companyIcon.setAttribute("src", "../../assets/building-icon.png");
        companyIcon.setAttribute("class", "itemIcon");
        company.appendChild(companyIcon);
        company.appendChild(
            document.createTextNode(data.college)
        );
        info.appendChild(company);

        const location = document.createElement("div");
        const locationIcon = document.createElement("img");
        locationIcon.setAttribute("src", "../../assets/location-icon.png");
        locationIcon.setAttribute("class", "itemIcon");
        location.appendChild(locationIcon);
        location.appendChild(
            document.createTextNode(data.location)
        );
        info.appendChild(location);

        const date = document.createElement("div");
        const dateIcon = document.createElement("img");
        dateIcon.setAttribute("src", "../../assets/date-icon.png");
        dateIcon.setAttribute("class", "itemIcon");
        date.appendChild(dateIcon);
        date.appendChild(
            document.createTextNode(data.beginning + " - " + data.end)
        ); 
        info.appendChild(date);
        
        leading.appendChild(info);

        const description = document.createElement("div");
        description.setAttribute("class", "description");
        description.innerHTML = data.description;
        container.appendChild(description);

        return container;
    }   
}

function insertProjects(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("projectsBox").appendChild(_createItem(data[i]));
    }

    function _createItem(data) {
        const container = document.createElement("div");
        container.setAttribute("class", "item");

        const top = document.createElement("div");
        top.setAttribute("class", "top");
        container.appendChild(top);

        const leading = document.createElement("div");
        leading.setAttribute("class", "data");
        top.appendChild(leading);

        const title = document.createElement("div");
        title.setAttribute("class", "itemTitle");
        title.appendChild(
            document.createTextNode(data.name)
        );
        leading.appendChild(title);


        const arrow = document.createElement("div");
        arrow.setAttribute("class", "arrowContainer");
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-angle-down");
        arrow.appendChild(icon);
        title.appendChild(arrow);

        arrow.addEventListener('click', (e) => {
            var first = true;
            const element = e.target;
            var description = element.parentNode.parentNode.parentNode.lastChild;
            if (description.getAttribute('class') != 'info') {
                description = element.parentNode.parentNode.lastChild;
                $(description).toggle(250);
                description.style.display = 'flex';
            }
            else {
                $(description).toggle(250);
                description.style.display = 'flex';
            }
            setInterval(() => {
                if (first == true) {
                    if (description.style.display == 'none') {
                        arrow.style.setProperty('transform', 'rotate(0deg)');
                    }
                    else if (description.style.display == 'flex') {
                        arrow.style.setProperty('transform', 'rotate(180deg)');
                    }
                    first = false;
                }
            }, 300);
        });

        const info = document.createElement("div");
        info.setAttribute("class", "info");

        const year = document.createElement("div");
        const yearIcon = document.createElement("img");
        yearIcon.setAttribute("src", "../../assets/date-icon.png");
        yearIcon.setAttribute("class", "itemIcon");
        year.appendChild(yearIcon);
        year.appendChild(
            document.createTextNode(data.year)
        );
        info.appendChild(year);

        const technologies = document.createElement("div");
        const technologiesIcon = document.createElement("img");
        technologiesIcon.setAttribute("src", "../../assets/code-icon.png");
        technologiesIcon.setAttribute("class", "itemIcon");
        technologies.appendChild(technologiesIcon);
        technologies.appendChild(
            document.createTextNode(data.technologies)
        );
        info.appendChild(technologies);

        if (data.repositoryLink != '') {
            const divider = document.createElement("div");
            divider.setAttribute("class", "divider");
            info.appendChild(divider);
            const repository = document.createElement("div");
            const repositoryIcon = document.createElement("img");
            repositoryIcon.setAttribute("src", "../../assets/git-white.png");
            repositoryIcon.setAttribute("class", "itemIcon");
            repository.appendChild(repositoryIcon);
            const repositoryLink = document.createElement("a");
            repositoryLink.setAttribute("href", data.repositoryLink);
            repositoryLink.setAttribute("target", "_blank");
            repositoryLink.appendChild(
                document.createTextNode(data.textRepository)
            );
            repository.appendChild(repositoryLink);
            info.appendChild(repository);
        }
        
        if (data.deployedLink != '') {
            const divider = document.createElement("div");
            divider.setAttribute("class", "divider");
            info.appendChild(divider);
            const deployed = document.createElement("div");
            const deployedIcon = document.createElement("img");
            deployedIcon.setAttribute("src", "../../assets/web-icon.png");
            deployedIcon.setAttribute("class", "itemIcon");
            deployed.appendChild(deployedIcon);
            const deployedLink = document.createElement("a");
            deployedLink.setAttribute("href", data.deployedLink);
            deployedLink.setAttribute("target", "_blank");
            deployedLink.appendChild(
                document.createTextNode(data.textDeployed)
            );
            deployed.appendChild(deployedLink);
            info.appendChild(deployed);
        }

        if (data.login != '') {
            const login = document.createElement("div");
            const loginIcon = document.createElement("img");
            loginIcon.setAttribute("src", "../../assets/keys-icon.png");
            loginIcon.setAttribute("class", "itemIcon");
            login.appendChild(loginIcon);
            login.appendChild(
                document.createTextNode("Usuario: " + data.login.username + ", Contraseña: " + data.login.password)
            );
            info.appendChild(login);
        }

        const description = document.createElement("div");
        description.setAttribute("class", "description");
        description.innerHTML = data.description;
        info.appendChild(description);

        leading.appendChild(info);

        return container;
    }   
}

function arrowsListeners() {
    document.getElementById('down1').addEventListener('click', nextPage);
    document.getElementById('up2').addEventListener('click', previousPage);
    document.getElementById('down2').addEventListener('click', nextPage);
    document.getElementById('up3').addEventListener('click', previousPage);
    document.getElementById('down3').addEventListener('click', nextPage);
    document.getElementById('up4').addEventListener('click', previousPage);
    document.getElementById('down4').addEventListener('click', nextPage);
    document.getElementById('up5').addEventListener('click', previousPage);
    document.getElementById('down5').addEventListener('click', nextPage);
    document.getElementById('up6').addEventListener('click', previousPage);
    document.getElementById('down6').addEventListener('click', nextPage);
    document.getElementById('up7').addEventListener('click', previousPage);
}

function buttonsListeners() {
    document.getElementById('title').addEventListener('click', function () {
        if (menuStatus == 'open') {
            closeHambMenu();
        }

        var time;
        switch (thisPage) {
            case 2:
                time = hideAbout('down');
                displayMain(time);
                thisPage = 1;
                break;
    
            case 3:
                time = hideTechnologies('down');
                displayMain(time);
                thisPage = 1;
                break;
    
            case 4:
                time = hideExperience('down');
                displayMain(time);
                thisPage = 1;
                break;

            case 5:
                time = hideTraining('down');
                displayMain(time);
                thisPage = 1;
                break;
                
            case 6:
                time = hideProjects('down');
                displayMain(time);
                thisPage = 1;
                break;

            case 7:
                time = hideContact('down');
                displayMain(time);
                thisPage = 1;
                break;
        }
    });

    document.getElementById('aboutMeButton').addEventListener('click', function () {
        if (thisPage < 2) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayAbout(time,'up');
                    thisPage = 2;
                    break;
            }
        }
        else if (thisPage > 2) {
            var time;
            switch (thisPage) {
                case 3:
                    time = hideTechnologies('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;
        
                case 4:
                    time = hideExperience('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;

                case 5:
                    time = hideTraining('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;

                case 6:
                    time = hideProjects('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;

                case 7:
                    time = hideContact('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;
            }
        }
    });
    document.getElementById('aboutMeMenuButton').addEventListener('click', function () {
        closeHambMenu();

        if (thisPage < 2) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayAbout(time,'up');
                    thisPage = 2;
                    break;
            }
        }
        else if (thisPage > 2) {
            var time;
            switch (thisPage) {
                case 3:
                    time = hideTechnologies('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;
        
                case 4:
                    time = hideExperience('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;

                case 5:
                    time = hideTraining('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;

                case 6:
                    time = hideProjects('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;

                case 7:
                    time = hideContact('down');
                    displayAbout(time, 'down');
                    thisPage = 2;
                    break;
            }
        }
    });

    document.getElementById('technologiesButton').addEventListener('click', function () {
        if (thisPage < 3) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayTechnologies(time, 'up');
                    thisPage = 3;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayTechnologies(time, 'up');
                    thisPage = 3;
                    break;
            }
        }
        else if (thisPage > 3) {
            var time;
            switch (thisPage) {
                case 4:
                    time = hideExperience('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;

                case 5:
                    time = hideTraining('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;

                case 6:
                    time = hideProjects('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;

                case 7:
                    time = hideContact('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;
            }
        }
    });
    document.getElementById('technologiesMenuButton').addEventListener('click', function () {
        closeHambMenu();

        if (thisPage < 3) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayTechnologies(time, 'up');
                    thisPage = 3;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayTechnologies(time, 'up');
                    thisPage = 3;
                    break;
            }
        }
        else if (thisPage > 3) {
            var time;
            switch (thisPage) {
                case 4:
                    time = hideExperience('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;

                case 5:
                    time = hideTraining('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;

                case 6:
                    time = hideProjects('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;

                case 7:
                    time = hideContact('down');
                    displayTechnologies(time, 'down');
                    thisPage = 3;
                    break;
            }
        }
    });

    document.getElementById('experienceButton').addEventListener('click', function () {
        if (thisPage < 4) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayExperience(time, 'up');
                    thisPage = 4;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayExperience(time, 'up');
                    thisPage = 4;
                    break;
        
                case 3:
                    time = hideTechnologies('up');
                    displayExperience(time, 'up');
                    thisPage = 4;
                    break;
            }
        }
        else if (thisPage > 4) {
            var time;
            switch (thisPage) {
                case 5:
                    time = hideTraining('down');
                    displayExperience(time, 'down');
                    thisPage = 4;
                    break;

                case 6:
                    time = hideProjects('down');
                    displayExperience(time, 'down');
                    thisPage = 4;
                    break;

                case 7:
                    time = hideContact('down');
                    displayExperience(time, 'down');
                    thisPage = 4;
                    break;
            }
        }
    });
    document.getElementById('experienceMenuButton').addEventListener('click', function () {
        closeHambMenu();

        if (thisPage < 4) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayExperience(time, 'up');
                    thisPage = 4;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayExperience(time, 'up');
                    thisPage = 4;
                    break;
        
                case 3:
                    time = hideTechnologies('up');
                    displayExperience(time, 'up');
                    thisPage = 4;
                    break;
            }
        }
        else if (thisPage > 4) {
            var time;
            switch (thisPage) {
                case 5:
                    time = hideTraining('down');
                    displayExperience(time, 'down');
                    thisPage = 4;
                    break;

                case 6:
                    time = hideProjects('down');
                    displayExperience(time, 'down');
                    thisPage = 4;
                    break;

                case 7:
                    time = hideContact('down');
                    displayExperience(time, 'down');
                    thisPage = 4;
                    break;
            }
        }
    });

    document.getElementById('trainingButton').addEventListener('click', function () {
        if (thisPage < 5) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;
        
                case 3:
                    time = hideTechnologies('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;

                case 4:
                    time = hideExperience('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;
            }
        }
        else if (thisPage > 5) {
            var time;
            switch (thisPage) {
                case 6:
                    time = hideProjects('down');
                    displayTraining(time, 'down');
                    thisPage = 5;
                    break;

                case 7:
                    time = hideContact('down');
                    displayTraining(time, 'down');
                    thisPage = 5;
                    break;
            }
        }
    });
    document.getElementById('trainingMenuButton').addEventListener('click', function () {
        closeHambMenu();

        if (thisPage < 5) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;
        
                case 3:
                    time = hideTechnologies('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;

                case 4:
                    time = hideExperience('up');
                    displayTraining(time, 'up');
                    thisPage = 5;
                    break;
            }
        }
        else if (thisPage > 5) {
            var time;
            switch (thisPage) {
                case 6:
                    time = hideProjects('down');
                    displayTraining(time, 'down');
                    thisPage = 5;
                    break;

                case 7:
                    time = hideContact('down');
                    displayTraining(time, 'down');
                    thisPage = 5;
                    break;
            }
        }
    });

    document.getElementById('projectsButton').addEventListener('click', function () {
        if (thisPage < 6) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;
        
                case 3:
                    time = hideTechnologies('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;

                case 4:
                    time = hideExperience('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;

                case 5:
                    time = hideTraining('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;
            }
        }
        else if (thisPage > 6) {
            var time;
            switch (thisPage) {
                case 7:
                    time = hideContact('down');
                    displayProjects(time, 'down');
                    thisPage = 6;
                    break;
            }
        }
    });
    document.getElementById('projectsMenuButton').addEventListener('click', function () {
        closeHambMenu();

        if (thisPage < 6) {
            var time;
            switch (thisPage) {
                case 1:
                    time = hideMain('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;
        
                case 2:
                    time = hideAbout('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;
        
                case 3:
                    time = hideTechnologies('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;

                case 4:
                    time = hideExperience('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;

                case 5:
                    time = hideTraining('up');
                    displayProjects(time, 'up');
                    thisPage = 6;
                    break;
            }
        }
        else if (thisPage > 6) {
            var time;
            switch (thisPage) {
                case 7:
                    time = hideContact('down');
                    displayProjects(time, 'down');
                    thisPage = 6;
                    break;
            }
        }
    });

    document.getElementById('contactButton').addEventListener('click', function () {
        var time;
        switch (thisPage) {
            case 1:
                time = hideMain('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;
    
            case 2:
                time = hideAbout('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;
    
            case 3:
                time = hideTechnologies('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;

            case 4:
                time = hideExperience('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;

            case 5:
                time = hideTraining('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;

            case 6:
                time = hideProjects('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;
        }
    });
    document.getElementById('contactMenuButton').addEventListener('click', function () {
        closeHambMenu();

        var time;
        switch (thisPage) {
            case 1:
                time = hideMain('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;
    
            case 2:
                time = hideAbout('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;
    
            case 3:
                time = hideTechnologies('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;

            case 4:
                time = hideExperience('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;

            case 5:
                time = hideTraining('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;

            case 6:
                time = hideProjects('up');
                displayContact(time, 'up');
                thisPage = 7;
                break;
        }
    });
}

function previousPage() {
    var time;
    switch (thisPage) {
        case 2:
            hideAbout('down');
            displayMain();
            thisPage--;
            break;

        case 3:
            time = hideTechnologies('down');
            displayAbout(time, 'down');
            thisPage--;
            break;

        case 4:
            time = hideExperience('down');
            displayTechnologies(time, 'down');
            thisPage--;
            break;

        case 5:
            time = hideTraining('down');
            displayExperience(time, 'down');
            thisPage--;
            break;

        case 6:
            time = hideProjects('down');
            displayTraining(time, 'down');
            thisPage--;
            break;

        case 7:
            time = hideContact();
            displayProjects(time, 'down');
            thisPage--;
            break;
    }
}

function nextPage() {
    var time;
    switch (thisPage) {
        case 1:
            time = hideMain('up');
            displayAbout(time, 'up');
            thisPage++;
            break;
        
        case 2:
            time = hideAbout('up');
            displayTechnologies(time, 'up');
            thisPage++;
            break;

        case 3:
            time = hideTechnologies('up');
            displayExperience(time, 'up');
            thisPage++;
            break;

        case 4:
            time = hideExperience('up');
            displayTraining(time, 'up');
            thisPage++;
            break;

        case 5:
            time = hideTraining('up');
            displayProjects(time, 'up');
            thisPage++;
            break;

        case 6:
            time = hideProjects('up');
            displayContact(time);
            thisPage++;
            break;
    }
}



//Main

function hideMain(direction) {
    document.getElementById('mainPhotoContainer').style.position = 'relative';
    document.getElementById('mainName').style.position = 'relative';
    document.getElementById('mainDescription').style.position = 'relative';
    document.getElementById('down1').style.position = 'relative';

    var first = true;

    var time = 0;

    if (direction == 'up') {
        $('#mainPhotoContainer').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#mainName').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#mainDescription').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#down1').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
    
        setInterval(() => {
            if (first == true) {
                document.getElementById('first').style.display = 'none';
                first = false;
            }
        }, time);
    
        return time;
    }
    else if (direction == 'down') {
        $('#down1').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#mainDescription').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#mainName').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#mainPhotoContainer').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('first').style.display = 'none';
                first = false;
            }
        }, time);

        return time;
    }
}

function displayMain() {
    var first = true;

    $('#title').delay(1250).animate({
        opacity: "0%"
    }, 500);
    setInterval(() => {
        if (first == true) {
            document.getElementById('title').style.display = 'none';
        }
    }, 1750);

    setInterval(() => {
        if (first == true) {
            document.getElementById('first').style.display = 'block';
            first = false;
        }
    }, 1750);

    $('#down1').delay(1750).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    $('#mainDescription').delay(2000).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    $('#mainName').delay(2250).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    $('#mainPhotoContainer').delay(2500).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
}



//About

function hideAbout(direction) {
    var first = true;

    var time = 0;
    
    if (direction == 'up') {
        $('#up2').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title2').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#aboutText').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#aboutPicture').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#down2').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('about').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("aboutMeButton").style.setProperty("background-color", "initial");
        document.getElementById("aboutMeButton").style.setProperty("color", "white");

        document.getElementById("aboutMeMenuButton").style.setProperty("color", "white");

        return time;
    }
    else if (direction == 'down') {
        $('#down2').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#aboutPicture').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);

        time = time + 250;
        $('#aboutText').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title2').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#up2').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('about').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("aboutMeButton").style.setProperty("background-color", "initial");
        document.getElementById("aboutMeButton").style.setProperty("color", "white");

        document.getElementById("aboutMeMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
}

function displayAbout(oldTime, direction) {
    if (direction == 'up') {
        $('#up2').css('top', '20vh');
        $('#title2').css('top', '20vh');
        $('#aboutText').css('top', '20vh');
        $('#aboutPicture').css('top', '20vh');
        $('#down2').css('top', '20vh');
    }
    else if (direction == 'down') {
        $('#up2').css('top', '-20vh');
        $('#title2').css('top', '-20vh');
        $('#aboutText').css('top', '-20vh');
        $('#aboutPicture').css('top', '-20vh');
        $('#down2').css('top', '-20vh');
    }

    var first = true;

    var time = oldTime;

    setInterval(() => {
        if (first == true) {
            document.getElementById('about').style.display = 'block';
        }
    }, time);

    setInterval(() => {
        if (first == true) {
            document.getElementById('title').style.display = 'flex';
            first = false;
        }
    }, time);
    $('#title').delay(time).animate({
        opacity: "100%"
    }, 500);

    $('#up2').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#title2').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#aboutText').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#aboutPicture').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#down2').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);

    document.getElementById("aboutMeButton").style.setProperty("background-color", "white");
    document.getElementById("aboutMeButton").style.setProperty("color", "black");

    document.getElementById("aboutMeMenuButton").style.setProperty("background-color", "rgba(255, 255, 255, 0.1)");
}



//Technologies

function hideTechnologies(direction) {
    var first = true;

    var time = 0;
    
    if (direction == 'up') {
        $('#up3').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title3').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#technologiesBox').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#down3').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;
    
        setInterval(() => {
            if (first == true) {
                document.getElementById('technologies').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("technologiesButton").style.setProperty("background-color", "initial");
        document.getElementById("technologiesButton").style.setProperty("color", "white");

        document.getElementById("technologiesMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
    else if (direction == 'down') {
        $('#down3').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#technologiesBox').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title3').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#up3').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;
    
        setInterval(() => {
            if (first == true) {
                document.getElementById('technologies').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("technologiesButton").style.setProperty("background-color", "initial");
        document.getElementById("technologiesButton").style.setProperty("color", "white");

        document.getElementById("technologiesMenuButton").style.setProperty("background-color", "initial");


        return time;
    }
}

function displayTechnologies(oldTime, direction) {
    if (direction == 'up') {
        $('#up3').css('top', '20vh');
        $('#title3').css('top', '20vh');
        $('#technologiesBox').css('top', '20vh');
        $('#down3').css('top', '20vh');
    }
    else if (direction == 'down') {
        $('#up3').css('top', '-20vh');
        $('#title3').css('top', '-20vh');
        $('#technologiesBox').css('top', '-20vh');
        $('#down3').css('top', '-20vh');
    }

    var first = true;

    var time = oldTime;

    setInterval(() => {
        if (first == true) {
            document.getElementById('technologies').style.display = 'block';
        }
    }, time);

    setInterval(() => {
        if (first == true) {
            document.getElementById('title').style.display = 'flex';
            first = false;
        }
    }, time);
    $('#title').delay(time).animate({
        opacity: "100%"
    }, 500);

    $('#up3').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#title3').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#technologiesBox').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#down3').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);

    document.getElementById("technologiesButton").style.setProperty("background-color", "white");
    document.getElementById("technologiesButton").style.setProperty("color", "black");

    document.getElementById("technologiesMenuButton").style.setProperty("background-color", "rgba(255, 255, 255, 0.1)");
}



// Experience

function hideExperience(direction) {
    var first = true;

    var time = 0;
    
    if (direction == 'up') {
        $('#up4').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title4').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#experienceBox').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#down4').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('experience').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("experienceButton").style.setProperty("color", "white");
        document.getElementById("experienceButton").style.setProperty("background-color", "initial");

        document.getElementById("experienceMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
    else if (direction == 'down') {
        $('#down4').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#experienceBox').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title4').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#up4').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('experience').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("experienceButton").style.setProperty("color", "white");
        document.getElementById("experienceButton").style.setProperty("background-color", "initial");

        document.getElementById("experienceMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
}

function displayExperience(oldTime, direction) {
    if (direction == 'up') {
        $('#up4').css('top', '20vh');
        $('#title4').css('top', '20vh');
        $('#experienceBox').css('top', '20vh');
        $('#down4').css('top', '20vh');
    }
    else if (direction == 'down') {
        $('#up4').css('top', '-20vh');
        $('#title4').css('top', '-20vh');
        $('#experienceBox').css('top', '-20vh');
        $('#down4').css('top', '-20vh');
    }

    var first = true;

    var time = oldTime;

    setInterval(() => {
        if (first == true) {
            document.getElementById('experience').style.display = 'block';
        }
    }, time);

    setInterval(() => {
        if (first == true) {
            document.getElementById('title').style.display = 'flex';
            first = false;
        }
    }, time);
    $('#title').delay(time).animate({
        opacity: "100%"
    }, 500);

    $('#up4').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#title4').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#experienceBox').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#down4').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);

    document.getElementById("experienceButton").style.setProperty("color", "black");
    document.getElementById("experienceButton").style.setProperty("background-color", "white");

    document.getElementById("experienceMenuButton").style.setProperty("background-color", "rgba(255, 255, 255, 0.1)");
}



// Training

function hideTraining(direction) {
    var first = true;

    var time = 0;
    
    if (direction == 'up') {
        $('#up5').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title5').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#trainingBox').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#down5').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('training').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("trainingButton").style.setProperty("color", "white");
        document.getElementById("trainingButton").style.setProperty("background-color", "initial");

        document.getElementById("trainingMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
    else if (direction == 'down') {
        $('#down5').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#trainingBox').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title5').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#up5').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('training').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("trainingButton").style.setProperty("color", "white");
        document.getElementById("trainingButton").style.setProperty("background-color", "initial");

        document.getElementById("trainingMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
}

function displayTraining(oldTime, direction) {
    if (direction == 'up') {
        $('#up5').css('top', '20vh');
        $('#title5').css('top', '20vh');
        $('#trainingBox').css('top', '20vh');
        $('#down5').css('top', '20vh');
    }
    else if (direction == 'down') {
        $('#up5').css('top', '-20vh');
        $('#title5').css('top', '-20vh');
        $('#trainingBox').css('top', '-20vh');
        $('#down5').css('top', '-20vh');
    }

    var first = true;

    var time = oldTime;

    setInterval(() => {
        if (first == true) {
            document.getElementById('training').style.display = 'block';
        }
    }, time);

    setInterval(() => {
        if (first == true) {
            document.getElementById('title').style.display = 'flex';
            first = false;
        }
    }, time);
    $('#title').delay(time).animate({
        opacity: "100%"
    }, 500);

    $('#up5').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#title5').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#trainingBox').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#down5').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);

    document.getElementById("trainingButton").style.setProperty("color", "black");
    document.getElementById("trainingButton").style.setProperty("background-color", "white");

    document.getElementById("trainingMenuButton").style.setProperty("background-color", "rgba(255, 255, 255, 0.1)");
}



// Projects

function hideProjects(direction) {
    var first = true;

    var time = 0;
    
    if (direction == 'up') {
        $('#up6').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title6').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#projectsBox').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#down6').delay(time).animate({
            top: "-20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('projects').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("projectsButton").style.setProperty("color", "white");
        document.getElementById("projectsButton").style.setProperty("background-color", "initial");

        document.getElementById("projectsMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
    else if (direction == 'down') {
        $('#down6').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#projectsBox').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#title6').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 250;
        $('#up6').delay(time).animate({
            top: "20vh",
            opacity: "0%"
        }, 500);
        time = time + 500;

        setInterval(() => {
            if (first == true) {
                document.getElementById('projects').style.display = 'none';
                first = false;
            }
        }, time);

        document.getElementById("projectsButton").style.setProperty("color", "white");
        document.getElementById("projectsButton").style.setProperty("background-color", "initial");

        document.getElementById("projectsMenuButton").style.setProperty("background-color", "initial");

        return time;
    }
}

function displayProjects(oldTime, direction) {
    if (direction == 'up') {
        $('#up6').css('top', '20vh');
        $('#title6').css('top', '20vh');
        $('#projectsBox').css('top', '20vh');
        $('#down6').css('top', '20vh');
    }
    else if (direction == 'down') {
        $('#up6').css('top', '-20vh');
        $('#title6').css('top', '-20vh');
        $('#projectsBox').css('top', '-20vh');
        $('#down6').css('top', '-20vh');
    }

    var first = true;

    var time = oldTime;

    setInterval(() => {
        if (first == true) {
            document.getElementById('projects').style.display = 'block';
        }
    }, time);

    setInterval(() => {
        if (first == true) {
            document.getElementById('title').style.display = 'flex';
            first = false;
        }
    }, time);
    $('#title').delay(time).animate({
        opacity: "100%"
    }, 500);

    $('#up6').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#title6').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#projectsBox').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#down6').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);

    document.getElementById("projectsButton").style.setProperty("color", "black");
    document.getElementById("projectsButton").style.setProperty("background-color", "white");

    document.getElementById("projectsMenuButton").style.setProperty("background-color", "rgba(255, 255, 255, 0.1)");
}



// Contact

function hideContact() {
    var first = true;

    var time = 0;
    
    $('#contactBox').delay(time).animate({
        top: "20vh",
        opacity: "0%"
    }, 500);
    time = time + 250;
    $('#title7').delay(time).animate({
        top: "20vh",
        opacity: "0%"
    }, 500);
    time = time + 250;
    $('#up7').delay(time).animate({
        top: "20vh",
        opacity: "0%"
    }, 500);
    time = time + 500;

    setInterval(() => {
        if (first == true) {
            document.getElementById('contact').style.display = 'none';
            first = false;
        }
    }, time);

    document.getElementById("contactButton").style.setProperty("color", "white");
    document.getElementById("contactButton").style.setProperty("background-color", "initial");

    document.getElementById("contactMenuButton").style.setProperty("background-color", "initial");

    return time;
}

function displayContact(oldTime) {
    $('#up7').css('top', '20vh');
    $('#title7').css('top', '20vh');
    $('#contactBox').css('top', '20vh');
    $('#down7').css('top', '20vh');

    var first = true;

    var time = oldTime;

    setInterval(() => {
        if (first == true) {
            document.getElementById('contact').style.display = 'block';
        }
    }, time);

    setInterval(() => {
        if (first == true) {
            document.getElementById('title').style.display = 'flex';
            first = false;
        }
    }, time);
    $('#title').delay(time).animate({
        opacity: "100%"
    }, 500);

    $('#up7').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#title7').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);
    time = time + 250;
    $('#contactBox').delay(time).animate({
        top: "0vh",
        opacity: "100%"
    }, 500);

    document.getElementById("contactButton").style.setProperty("color", "black");
    document.getElementById("contactButton").style.setProperty("background-color", "white");

    document.getElementById("contactMenuButton").style.setProperty("background-color", "rgba(255, 255, 255, 0.1)");
}