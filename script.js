gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    const ambientBg = document.querySelector('.ambient-background');
    if (ambientBg) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
            
            gsap.to(ambientBg, {
                x: xAxis,
                y: yAxis,
                duration: 1.5,
                ease: "power2.out"
            });
        });
    }
    
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            
            const projectContainer = document.getElementById('project-container');
            if (projectContainer && data.gallery) {
                projectContainer.style.display = 'flex';
                projectContainer.style.flexWrap = 'nowrap';
                projectContainer.style.overflowX = 'auto';
                projectContainer.style.gap = '2rem';
                projectContainer.style.paddingBottom = '2rem';

                data.gallery.forEach(photo => {
                    const card = document.createElement('div');
                    card.className = 'gallery-photo-card';
                    
                    card.style.flex = '0 0 auto'; 
                    card.style.width = '350px';   
                    card.style.display = 'flex';
                    card.style.flexDirection = 'column';
                    card.style.gap = '1rem';
                    
                    card.innerHTML = `
                        <div style="width: 100%; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 2px; border: 1px solid rgba(255,255,255,0.05);">
                            <img class="raw-photo" src="${photo.image}" alt="Gallery Photo" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <p style="font-family: 'Space Mono', monospace; font-size: 0.85rem; color: #a0a0a0; line-height: 1.5; text-align: center;">${photo.alt}</p>
                    `;
                    projectContainer.appendChild(card);
                });
            }

            const memberContainer = document.getElementById('member-container');
            if (memberContainer && data.members) {
                data.members.forEach(member => {
                    const card = document.createElement('div');
                    card.className = 'members-card';
                    
                    if (member.role.toLowerCase() === 'coordinator') {
                        card.style.gridColumn = '1 / -1';
                        card.style.justifySelf = 'center';
                        card.style.width = '100%';
                        card.style.maxWidth = '500px';
                    }
                    
                    const safeImageName = member.name.toLowerCase().replace(/ /g, '%20') + '.jpg';
                    
                    card.innerHTML = `
                        <div style="width: 100%; height: 350px; overflow: hidden; border-radius: 2px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.05);">
                            <img class="member-portrait" src="${safeImageName}" alt="${member.name}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                            <h3 style="font-size: 2.2rem; font-weight: 700; color: #fff; letter-spacing: -1px; text-transform: uppercase; margin: 0;">${member.name}</h3>
                            <p style="font-family: 'Space Mono', monospace; font-size: 0.85rem; color: #dc143c; text-transform: uppercase; letter-spacing: 2px; margin: 0;">${member.role}</p>
                        </div>
                        
                        <div style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 1.2rem; padding-top: 1.2rem;">
                            <p style="font-size: 1.05rem; color: #888; line-height: 1.5;">"${member.quote}"</p>
                        </div>
                    `;
                    memberContainer.appendChild(card);
                });
            }

            initGSAP();
        })
        .catch(error => {
            console.error("Bruh, the JSON is dead:", error);
            initGSAP();
        });

    function initGSAP() {
        const sections = gsap.utils.toArray('.scroll-section');

        sections.forEach((section, index) => {
            section.style.zIndex = index;
            const content = section.querySelector('.content-block');
            const isLast = index === sections.length - 1;

            if (content) {
                gsap.set(content, { opacity: 0, y: 50 });
            }

            if (!isLast) {
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    pin: true,
                    pinSpacing: false, 
                });
            }

            if (content) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        end: isLast ? "top 20%" : "bottom top", 
                        scrub: 1,
                    }
                });

                tl.to(content, { opacity: 1, y: 0, duration: 2 });
                tl.to(content, { opacity: 1, duration: 2 });

                if (!isLast) {
                    tl.to(content, { opacity: 0, y: -30, duration: 2 });
                }
            }
        });

        ScrollTrigger.refresh();
    }

    const trollBtn = document.getElementById('troll-btn');
    if (trollBtn) {
        const jokes = ["Bro why", "Stop clicking", "You're breaking the CSS", "Fine, whatever"];
        let hoverCount = 0;
        
        trollBtn.addEventListener('mouseenter', () => {
            if (hoverCount < jokes.length) {
                trollBtn.innerText = jokes[hoverCount];
                hoverCount++;
            }
        });
    }

    const joinForm = document.querySelector('.join-form');
    const fbiOverlay = document.getElementById('fbi-overlay');
    const fbiSound = new Audio('fbi.mp3'); 

    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = joinForm.querySelector('button[type="submit"]');
            
            const originalText = "Submit Application";
            const originalBg = submitBtn.style.background;
            const originalColor = submitBtn.style.color;
            
            submitBtn.style.pointerEvents = 'none';
            
            submitBtn.innerText = "Accessing WebCam...";
            submitBtn.style.background = "#dc143c";
            submitBtn.style.color = "#fff";
            
            setTimeout(() => {
                submitBtn.innerText = "Scanning Browser History...";
            }, 2000);

            setTimeout(() => {
                submitBtn.innerText = "Wait... what is that search?!";
            }, 4500);
            
            setTimeout(() => {
                submitBtn.innerText = "TACTICAL TEAM DEPLOYED";
                
                fbiSound.currentTime = 0;
                console.log("Browser blocked the FBI audio, sad.", err);
                
                if(fbiOverlay) {
                    const gifImage = fbiOverlay.querySelector('img');
                    if(gifImage) gifImage.src = gifImage.src; 
                    
                    fbiOverlay.style.display = "flex";
                }
                
                gsap.to(submitBtn, {
                    y: "100vh",
                    rotationZ: 720,
                    rotationX: 180,
                    duration: 1.5,
                    ease: "power3.in"
                });
            }, 7000);

            setTimeout(() => {
                if(fbiOverlay) fbiOverlay.style.display = "none";
                
                gsap.set(submitBtn, { clearProps: "all" });
                
                submitBtn.innerText = originalText;
                submitBtn.style.background = originalBg;
                submitBtn.style.color = originalColor;
                submitBtn.style.pointerEvents = 'auto';
                
                joinForm.reset(); 
            }, 10500);
        });
    }
});