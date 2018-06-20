let openFile = (event) => {
  let input = event.target;

  let reader = new FileReader();
  reader.readAsText(input.files[0]);
  reader.onload = () => {
    let data = JSON.parse(reader.result);
    const {photoUrl, name, surname, profile, contact, skills, experience, educationAndCourses, computer, languages, personalInterests} = data;

    setPhoto(photoUrl);
    setName(name, surname);
    setProfileInfo(profile);
    setContcts(contact);
    setSkills(skills);
    setExperience(experience);
    setEducationAndCourses(educationAndCourses);
    setComputer(computer);
    setLanguage(languages);
    setPersonalInterests(personalInterests);
  };

}

function setPhoto(url) {
  let photo = document.querySelector('#user-pic');
  photo.src = url;
}

function setName(name, surname) {
  let firstNameLine = document.querySelector('#firstname');
  let surNameLine = document.querySelector('#surname');

  firstNameLine.innerHTML = name;
  surNameLine.innerHTML = surname;
}

function setProfileInfo(profile) {
  let profileInfoBar = document.querySelector('#profile-info');
  profileInfoBar.innerHTML = profile;
}

function setContcts(contact) {
  let addressLine = document.querySelector('#address');
  let telephoneLine = document.querySelector('#telephone');
  let emailLine = document.querySelector('#email');
  let birthLine = document.querySelector('#birth');

  const {address, telephone, email, birthDate} = contact;

  addressLine.innerHTML = ('address' in contact) ? `A: ${address}` : null;
  telephoneLine.innerHTML = ('telephone' in contact) ? `T: ${telephone}` : null;
  emailLine.innerHTML = ('email' in contact) ? `E: ${email}` : null;
  birthLine.innerHTML = ('birthDate' in contact) ? `B: ${birthDate}` : null;
}

function setSkills(skills) {
  let skillsBar = document.querySelector('.skills-bar');

  for (let {skill, value} of skills) {
    let skillItem = document.createElement('div');
    skillItem.classList.add('skill-item');

    let progressName = document.createElement('span');
    progressName.innerHTML = skill;

    let progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');

    let progressLine = document.createElement('span');
    progressLine.classList.add('progress-line');
    progressLine.style.width = `${(parseInt(value) > 100) ? 100 : parseInt(value)}%`;

    progressBar.appendChild(progressLine);

    skillItem.appendChild(progressName);
    skillItem.appendChild(progressBar);

    skillsBar.appendChild(skillItem);
  }
}

function setExperience(experience) {
  let experienceBar = document.querySelector('.experience-bar');
  for (let {jobTitle, yearsOfWork, description} of experience) {
    let jobItem = document.createElement('div');
    jobItem.classList.add('job-item');
    jobItem.classList.add('list');

    let headName = document.createElement('h4');
    headName.innerHTML = jobTitle;

    let yearsOfWorkLine = document.createElement('p');
    yearsOfWorkLine.innerHTML = yearsOfWork;

    let descriptionLine = document.createElement('p');
    descriptionLine.innerHTML = description;

    jobItem.appendChild(headName);
    jobItem.appendChild(yearsOfWorkLine);
    jobItem.appendChild(descriptionLine);

    experienceBar.appendChild(jobItem);
  }
}

function setEducationAndCourses(data) {
  for (let i of Object.keys(data)) {
    let nameBar = (i === 'education') ? '.education' : '.courses';
    let infoBar = document.querySelector(nameBar);

    for (let elem of data[i]) {
      const name = (i === 'education') ? elem.educatonName : elem.courseName;
      const {location, duration, description} = elem;

      let item = document.createElement('div');
      // item.classList.add('education-item');
      item.classList.add('item');

      let headName = document.createElement('h4');
      headName.innerHTML = location;

      let info = document.createElement('p');
      info.innerHTML = `${name} | ${duration}`;

      let descriptionLine = document.createElement('p');
      descriptionLine.innerHTML = description;

      item.appendChild(headName);
      item.appendChild(info);
      item.appendChild(descriptionLine);

      infoBar.appendChild(item);
    }
  }
}

function setComputer(data) {
  let computerBar = document.querySelector('.computer-list');
  for (let {programm, level} of data) {
    let item = document.createElement('p');
    item.innerHTML = `${programm}<span style="font-style: italic; font-weight: 400;"> | ${level}</span>`

    computerBar.appendChild(item);
  }
}

function setLanguage(data) {
  let computerBar = document.querySelector('.languages-list');
  for (let {name, level} of data) {
    let item = document.createElement('p');
    item.innerHTML = `${name}<span style="font-style: italic; font-weight: 400;"> | ${level}</span>`

    computerBar.appendChild(item);
  }
}

function setPersonalInterests(data) {
  let interestsBar = document.querySelector('.interests-bar');
  interestsBar.innerHTML = data.toString().replace(/,/g, ' | ');
}
