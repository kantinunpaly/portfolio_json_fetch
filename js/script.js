$(document).ready(function(){
    // Function to toggle navbar visibility
    function toggleNavbar() {
        let navbarCollapse = $('#navbarNav');
        navbarCollapse.toggleClass('show');
    }

    // Attach the toggle function to the navbar-toggler button
    $('.navbar-toggler').on('click', function() {
        toggleNavbar();
    });

    // Additional code for skillbar animation and other functionalities
    jQuery(document).ready(function() {
        function animateSkillBars() {
            jQuery('.skillbar').each(function() {
                var elementPos = jQuery(this).offset().top;
                var topOfWindow = jQuery(window).scrollTop();
                var windowHeight = jQuery(window).height();

                if (elementPos < topOfWindow + windowHeight - 100) {
                    jQuery(this).find('.skillbar-bar').animate({
                        width: jQuery(this).attr('data-percent')
                    }, 2000);
                }
            });
        }

        jQuery(window).on('scroll', animateSkillBars);
        animateSkillBars(); // Call once to animate skill bars that are already in view
    });

    // Handle navigation link clicks
    document.querySelectorAll('.nav').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent immediate navigation

            // Remove 'active' class from all links
            document.querySelectorAll('.nav').forEach(function(nav) {
                nav.classList.remove('active');
            });

            // Add 'active' class to the clicked link
            element.classList.add('active');

            // Scroll to the target section with an offset
            let targetId = element.getAttribute('href').substring(1);
            let targetSection = document.getElementById(targetId);
            let offsetTop = targetSection.offsetTop - 100;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close the navbar in responsive mode
            if (window.innerWidth <= 576) {
                let navbarCollapse = document.querySelector('#navbarNav');

                if (navbarCollapse.classList.contains('show')) {
                    toggleNavbar();
                }
            }
        });
    });

    // Handle scroll events
    document.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const backToTopButton = document.getElementById("back-to-top");

        // Change navbar background color on scroll
        if (window.scrollY > 0) {
            navbar.style.backgroundColor = '#191919';
        } else {
            navbar.style.backgroundColor = 'transparent';
     
            
        }

        // Show or hide back to top button
        if (window.scrollY > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }

        // Highlight the active section in the navbar
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('.navbar-nav .nav');

        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 100;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');
            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('.navbar-nav .nav[href*=' + id + ']').classList.add('active');
                });
            }
        });
    });

    // Scroll to top functionality
    document.getElementById("back-to-top").addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Change navbar-nav background color on click
    let navbarToggler = document.querySelector('.navbar-toggler');
    navbarToggler.addEventListener('click', function() {
        document.querySelector('.navbar-nav').classList.toggle('toggled');
    });

    // Close navbar when nav item is clicked in responsive mode
    document.querySelectorAll('.nav-item .nav').forEach(function(element) {
        element.addEventListener('click', function() {
            if (window.innerWidth <= 576) {
                let navbarCollapse = document.querySelector('#navbarNav');

                if (navbarCollapse.classList.contains('show')) {
                    toggleNavbar();
                }
            }
        });
    });
});
document.getElementById('download-cv').addEventListener('click', function(event) {
    event.preventDefault(); // ป้องกันการดำเนินการเริ่มต้นของลิงก์
    var url = this.href;
    // เปิดแท็บใหม่


    // สร้างลิงก์ใหม่เพื่อดาวน์โหลดไฟล์
    var a = document.createElement('a');
    a.href = url;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
// ''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
function appendData(data) {
    document.querySelector('.title1').innerText = data.title1;
    document.querySelector('.header').innerText = data.header;
    document.querySelector('.title2').innerText = data.title2;
}

// Function to append social links
function appendSocialLinks(socialData) {
    const socialContainer = document.querySelector('.social');
    socialData.social_links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.alt = link.platform;
        a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="${link.icon}"/></svg>`;
        socialContainer.appendChild(a);
    });
}

// Fetch and display data
fetch('assets/section1/info.json')
    .then(response => response.json())
    .then(data => appendData(data))
    .catch(err => console.error('Error loading info:', err));

fetch('assets/section1/icon.json')
    .then(response => response.json())
    .then(data => appendSocialLinks(data))
    .catch(err => console.error('Error loading social links:', err));
    
    document.addEventListener("DOMContentLoaded", function() {
        fetch('assets/section2/info.json')
            .then(response => response.json())
            .then(data => {
                document.querySelector('.topic').innerText = data.topic;
                document.querySelector('.subtitle').innerText = data.subtitle;
                document.querySelector('.text').innerText = data.text;
                document.querySelector('.name').innerText = data.personal_details.name;
                document.querySelector('.age').innerText = data.personal_details.age;
                document.querySelector('.address').innerText = data.personal_details.address;
                document.querySelector('.phone').innerText = data.personal_details.phone;
                document.querySelector('.email').innerText = data.personal_details.email;
                document.getElementById('download-cv').href = 'assets/section2/img/' + data.cv_link;
                document.getElementById('profileImage').src = 'assets/section2/img/' + data.profile_image;
            })
            .catch(err => console.error('Error loading info:', err));
    });
    document.addEventListener("DOMContentLoaded", function() {
        fetch('assets/section3/info.json')
          .then(response => response.json())
          .then(data => {
            const programmingContainer = document.querySelector('.Programing');
            const toolContainer = document.querySelector('.tool');
            
            
            data.skilltitle.forEach((skill, index) => {
              const skillElement = document.createElement('div');
              skillElement.classList.add('row', 'align-items-center', 'chart');
      
              skillElement.innerHTML = `
                <div class="col-2 text-center">
                  <img src="assets/section3/img/${skill.icon}" platform="${skill.platform}" class="icon-skill">
                </div>
                <div class="col-10 skill-bar">
                  <div class="skillbar clearfix" data-percent="${skill[' data-percent']}">
                    <div class="skillbar-title"><span>${skill['skillbar-title']}</span></div>
                    <div class="skillbar-bar" style="background-image: linear-gradient(to right, #ff4c4c, #ffca28);"></div>
                    <div class="skill-bar-percent">${skill[' data-percent']}</div>
                  </div>
                </div>
              `;
      
              if (index < 6) {
                programmingContainer.appendChild(skillElement);
              } else {
                toolContainer.appendChild(skillElement);
              }
            });
          })
          .catch(err => console.error('Error loading info:', err));
      });
      async function fetchJson(url) {
        try {
            let response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        fetchJson('assets/section4/info.json').then(data => {
            const portfolio = data.portfolio;
            
            // Set the portfolio title and description
            document.getElementById('portfolio-title').textContent = portfolio.title;
            document.getElementById('portfolio-description').textContent = portfolio.description;
            document.getElementById('github-link').setAttribute('href', portfolio.githubLink);
    
            // Populate portfolio items
            const portfolioContainer = document.getElementById('portfolio-items');
            portfolio.wrappers.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('col-6', 'col-md-6', 'col-lg-4');
                itemElement.innerHTML = `
                    <div class="wrapper">
                        <div class="portfolio-box" data-bs-toggle="modal" data-bs-target="#staticBackdrop${item.id}">
                            <a class="portfolio-thumb">
                                <img src="assets/section4/img/${item.image}" alt="img" class="img-responsive">
                                <div class="content-port">
                                    <p class="text-subtitle-port">${item.title}</p>
                                    <p class="detail-port">${item.description}</p>
                                    <p class="readmore">read more..</p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
                portfolioContainer.appendChild(itemElement);
            });
        }).catch(err => console.error('Error loading portfolio info:', err));
    
        fetchJson('assets/section4/modal.json').then(modalData => {
            const modalContainer = document.getElementById('modal-container');
            
            modalData.modals.forEach(modal => {
                const modalElement = document.createElement('div');
                modalElement.classList.add('modal', 'fade', 'modal-full');
                modalElement.id = `staticBackdrop${modal.id}`;
                modalElement.setAttribute('data-bs-backdrop', 'static');
                modalElement.setAttribute('data-bs-keyboard', 'false');
                modalElement.setAttribute('tabindex', '-1');
                modalElement.setAttribute('aria-labelledby', `staticBackdropLabel${modal.id}`);
                modalElement.setAttribute('aria-hidden', 'true');
                modalElement.innerHTML = `
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title" id="staticBackdropLabel${modal.id}">${modal.title}</h1>
                                <button type="button" class="btn-close me-2" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${modal.contentTitle ? `<h2 class="title">${modal.contentTitle}</h2>` : ''}
                                ${modal.contentDescription ? `<p class="text-detail">${modal.contentDescription}</p>` : ''}
                                ${modal.link ? `<div class="button-container" id="newtab-port"><a href="${modal.link}" class="btn-port">Example Content</a></div>` : ''}
                                <div class="row g-0">
                                    ${modal.images.map(image => `
                                        <div class="col-12 col-md-4">
                                            <div class="portfolio-clone">
                                                <a class="portfolio-clone">
                                                    <img src="assets/section4/gallery/${image}" alt="img-clone" class="img-responsive">
                                                </a>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                `;
                modalContainer.appendChild(modalElement);
            });
        }).catch(err => console.error('Error loading modal data:', err));
    });
    
    async function fetchJson(url) {
        try {
            let response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }







    document.addEventListener("DOMContentLoaded", function() {
        // Fetch and populate Education data
        fetch('assets/section5/info.json')
            .then(response => response.json())
            .then(data => {
                document.querySelector('.education-title').innerText = data.Education.title;
    
                const timelineItemsEd = data.Education['timeline-items-ed'];
                const timelineItemsEdContainer = document.querySelector('.timeline-items-ed');
    
                timelineItemsEd.forEach(item => {
                    const timelineItem = document.createElement('div');
                    timelineItem.classList.add('timeline-item-ed');
    
                    timelineItem.innerHTML = `
                        <div class="timeline-dot-ed"></div>
                        <div class="timeline-date-ed">${item['timeline-date-ed']}</div>
                        <div class="aos" data-aos="fade-up-right">
                            <div class="timeline-content-ed">
                                <div class="text-align-right">
                                    <h4 class="education">${item.education}</h4>
                                    <h5 class="education-name">${item['education-name']}</h5>
                                    <h6 class="education-major">${item['education-major']}</h6>
                                    <p class="education-grade">${item['education-grade']}</p>
                                </div>
                            </div>
                        </div>
                    `;
    
                    timelineItemsEdContainer.appendChild(timelineItem);
                });
            })
            .catch(err => console.error('Error loading education info:', err));
    
        // Fetch and populate Experience data
        fetch('assets/section5/infoex.json')
            .then(response => response.json())
            .then(data => {
                document.querySelector('.experience-title').innerText = data.Experience.title;
    
                const timelineItemsEx = data.Experience['timeline-items-ed'];
                const timelineItemsExContainer = document.querySelector('.timeline-items');
    
                timelineItemsEx.forEach(item => {
                    const timelineItem = document.createElement('div');
                    timelineItem.classList.add('timeline-item');
    
                    timelineItem.innerHTML = `
                        <div class="timeline-dot"></div>
                        <div class="timeline-date">${item['timeline-date-ed']}</div>
                        <div class="aos" data-aos="fade-up-left">
                            <div class="timeline-content">
                                <div class="text-align-right">
                                    <h4 class="experience">${item['experience-topic']}</h4>
                                    <p>${item['experience-detail']}</p>
                                </div>
                            </div>
                        </div>
                    `;
    
                    timelineItemsExContainer.appendChild(timelineItem);
                });
            })
            .catch(err => console.error('Error loading experience info:', err));
    });
    
    




