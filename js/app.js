//Global variables
const navbarMenu = document.querySelector(".navbar__menu");
const navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("main section");
let numberOfSections = sections.length;
const sectionNames = [];

const fragement = document.createDocumentFragment();
//------------------------------------------------------------------
//Funnction that will populate the sections names array with names of the heading of each section
function sectionNaming(sections) {
  sections.forEach((item) => {
    const headingTwo = item.querySelector("h2");
    sectionNames.push(headingTwo.textContent);
  });
}

//adding the links dynamically based on the added sections to the page and the naming of them.
function addLinks() {
  for (let i = 0; i < numberOfSections; i++) {
    const item = document.createElement("li");
    item.id = sectionNames[i];
    item.innerHTML = `<a href="">${sectionNames[i]}</a>`;
    fragement.append(item);
  }

  navbarList.append(fragement);
}

sectionNaming(sections);
addLinks();
const linkItems = document.querySelectorAll("#navbar__list a");

scrollToSection(linkItems);

//scrolling to the needed section when clicking on a specific link in the navbar and applying smooth effect.
// and also adding the active--link to the related link.
function scrollToSection(linkItems) {
  linkItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      for (link of linkItems) {
        link.classList.remove("active--link");
      }
      const position = sections[index].getBoundingClientRect();
      item.classList.add("active--link");
      window.scrollTo({
        left: 0,
        top: position.top + window.pageYOffset,
        behavior: "smooth",
      });
    });
  });
}

// Intersectionobserver to observe the viewable section in order to add the .active class to the related section  Element
// and also adding the active--link to the related link.
const observerSection = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        linkItems.forEach((item) => {
          item.classList.remove("active--link");
        });
        const link = document.querySelector(
          `#navbar__list li[id=${entry.target.dataset.nav}] a`
        );
        // console.log(link);
        entry.target.classList.add("active");
        link.classList.add("active--link");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  {
    threshold: [0.6],
  }
);
sections.forEach((item) => {
  observerSection.observe(item);
});
