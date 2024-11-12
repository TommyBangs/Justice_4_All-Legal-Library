import { legalDocs } from './legalDocsData.js';
document.addEventListener('DOMContentLoaded', () => {
    displayLegalDocs(legalDocs);
});
function displayLegalDocs(legalDocs) {
    const lawsContainer = document.getElementById('lawsContainer');
    lawsContainer.innerHTML = legalDocs.map(law => createLawCard(law)).join('');
}
// Function to create law cards
function createLawCard(law) {
    return `
        <div class="law-card" onclick="window.open('${law.link}', '_blank')" style="cursor: pointer;">
            <i class="${law.icon}"></i>
            <h3>${law.title}</h3>
            <p>${law.description}</p>
            <div class="law-meta">
                <span>${law.type}</span>
                <span>${law.year}</span>
            </div>
        </div>
    `;
}

// Function to filter and display laws
function filterAndDisplayLaws() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedType = document.getElementById('typeFilter').value;
    const selectedYear = document.getElementById('yearFilter').value;

    const filteredLaws = legalDocs.filter(law => {
        const matchesSearch = law.title.toLowerCase().includes(searchTerm) || 
                            law.description.toLowerCase().includes(searchTerm);
        const matchesType = !selectedType || law.type === selectedType;
        const matchesYear = !selectedYear || law.year === selectedYear;

        return matchesSearch && matchesType && matchesYear;
    });

    const lawsContainer = document.getElementById('lawsContainer');
    lawsContainer.innerHTML = filteredLaws.map(law => createLawCard(law)).join('');
}

// Add event listeners
document.getElementById('searchInput').addEventListener('input', filterAndDisplayLaws);
document.getElementById('typeFilter').addEventListener('change', filterAndDisplayLaws);
document.getElementById('yearFilter').addEventListener('change', filterAndDisplayLaws);

// Initial display
filterAndDisplayLaws();