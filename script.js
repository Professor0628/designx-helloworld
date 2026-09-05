document.addEventListener("DOMContentLoaded", () => {
    
    // Fetch and inject JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            
            // 1. Build the Archive Grid
            const projectContainer = document.getElementById('project-container');
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

            // 2. Build the Member Wall
            const memberContainer = document.getElementById('member-container');
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
        })
        .catch(error => console.error("Error loading JSON data:", error));
});