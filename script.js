gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    
    //fetching json data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const projectContainer = document.getElementById('project-container');
            if (projectContainer) {
                data.projects.forEach(project => {
                    const card = document.createElement('div');
                    card.style.background = '#111';
                    card.style.padding = '2rem';
                    card.style.borderRadius = '8px';
                    card.style.border = '1px solid #222';
                    card.style.textAlign = 'left';
                    card.innerHTML = `
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #fff;">${project.title}</h3>
                        <p style="font-size: 1rem; color: #a0a0a0; line-height: 1.5;">${project.description}</p>
                    `;
                    projectContainer.appendChild(card);
                });
            }

            const memberContainer = document.getElementById('member-container');
            if (memberContainer) {
                data.members.forEach(member => {
                    const card = document.createElement('div');
                    card.style.background = '#111';
                    card.style.padding = '2rem';
                    card.style.borderRadius = '8px';
                    card.style.border = '1px solid #222';
                    card.innerHTML = `
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.2rem; color: #fff;">${member.name}</h3>
                        <p style="font-size: 0.9rem; color: #888; text-transform: uppercase; margin-bottom: 1rem;">${member.role}</p>
                        <p style="font-size: 1.1rem; color: #ccc; font-style: italic;">"${member.quote}"</p>
                    `;
                    memberContainer.appendChild(card);
                });
            }

            //initialising gsap after json fetching
            initGSAP();
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
            initGSAP();
        });

    //dimension shift logic
    function initGSAP() {
        const sections = gsap.utils.toArray('.scroll-section');

        sections.forEach((section, index)   => {
            section.style.zIndex = index;

            if (index !== sections.length - 1) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    pin: true,
                    pinSpacing: false,
                });
            }

            const content = section.querySelector('.content-block');
            if (content) {
                gsap.fromTo(content, 
                    { y: 50, opacity: 0 }, 
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 60%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            if (index !== sections.length - 1) {
                gsap.to(content, {
                    opacity: 0,
                    y: -50,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=300",
                        scrub: true
                    }
                });
            }   
        });

        ScrollTrigger.refresh();
    }
});