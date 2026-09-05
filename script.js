document.addEventListener("DOMContentLoaded", () => {

    // Registering scroll-trigger plugin for GSAP
    gsap.registerPlugin(ScrollTrigger);

    document.addEventListener("DOMContentLoaded", () => {

        //scroll jacking effect
        const sections = gsap.utils.toArray('.scroll-section');
        sections.forEach((section, index) => {
            //Pinning effect
            ScrollTrigger.create({
                trigger: section,
                start: "top top", //Pins the section when it reaches the top of the viewport
                pin: true, //Enables pinning
                pinSpacing: false, //Makes next section slide over the current one
            });

            //Text fade in effect
            const content = section.querySelector('.content-block');
            if (content) {
                gsap.from(content, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top center",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });

        //JSON Data fetching
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
            })
            .catch(error => console.error("Error loading JSON data:", error));
    });
});