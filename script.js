let currentStep = 0;

        function showStep(step) {
            const steps = document.querySelectorAll('.step');
            steps.forEach((s, index) => {
                s.classList.toggle('hidden', index !== step);
                console.log("showstep work");
            });
        }

        function nextStep() {
            const steps = document.querySelectorAll('.step');
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
                console.log("nextstep work");
            }
        }

        function prevStep() {
            const steps = document.querySelectorAll('.step');
            if (currentStep > 0) {
                currentStep--; // Move to the previous step
                showStep(currentStep);    // Update the display
            }
        }

        function updateResume() {
            const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
            inputs.forEach(input => {
                const target = document.getElementById(input.dataset.target);
                if (target) {
                    target.innerHTML = input.value || input.placeholder;
                    console.log("getting input")
                }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            showStep(currentStep);
        });


        // skills container
        document.addEventListener('DOMContentLoaded', () => {
            const skillsList = document.getElementById('skillsList');
            const addSkillForm = document.getElementById('addSkillForm');
            const skillInput = document.getElementById('skillInput');
            const resumeSkillsLeft = document.getElementById('resumeSkillsLeft');
            const resumeSkillsRight = document.getElementById('resumeSkillsRight');
            const errorMessage = document.getElementById('errorMessage');

        
            function addSkill(skill) {
                const skillCount = skillsList.children.length;
                if (skillCount >= 8) {
                    errorMessage.style.display = 'block'; 
                    return;
                }
                errorMessage.style.display = 'none'; 
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-item';
                const skillText = document.createElement('span');
                skillText.className='skill-text';
                skillText.textContent = skill;

                const deleteBtn = document.createElement('span');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '❌';
                deleteBtn.addEventListener('click', () => {
                    skillsList.removeChild(skillItem);
                    updateSkill(); 
                });

                skillItem.appendChild(skillText);
                skillItem.appendChild(deleteBtn);
                skillsList.appendChild(skillItem);

                updateSkill();
            }

        function updateSkill() {
            resumeSkillsLeft.innerHTML = '';
            resumeSkillsRight.innerHTML = '';
            const allSkills = skillsList.querySelectorAll('.skill-item .skill-text');

            allSkills.forEach((skillElement, index) => {
                const skill = skillElement.textContent;

                const listItem = document.createElement('li');
                listItem.textContent = skill;

                if (index < 4) {
                    resumeSkillsLeft.appendChild(listItem);
                } else {
                    resumeSkillsRight.appendChild(listItem);
                }
            });
        }
        addSkillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const skill = skillInput.value.trim();
            if (skill) {
                addSkill(skill); 
                skillInput.value = ''; 
            } 
        });
        
    });




// awards section
document.getElementById("add-award-btn").addEventListener("click", function() {
    let awardCount = 2;
    awardCount++;
    const container = document.getElementById('extra-inputs-container');

    const resumeList = document.getElementById('resume-list');

    // Create a new label
    const label = document.createElement('label');
    label.textContent = `Award/Certification ${awardCount}:`;
    label.setAttribute('for', `award${awardCount}`);

    // Create a new input field
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `award${awardCount}`;
    input.name = 'award';
    input.placeholder = 'Enter award or certification';
    input.classList.add('form-group-input');

    const listItem = document.createElement('li');
    listItem.id = `resume-award${awardCount}`;
    listItem.textContent = `Award/Certification ${awardCount}`;
    resumeList.appendChild(listItem);

    // Add real-time reflection functionality
    input.addEventListener('input', () => {
    listItem.textContent = input.value;
    });


    // Wrap the label and input in a form group
    const inputGroup = document.createElement('div');
    inputGroup.classList.add('form-group', 'extra-input');
    inputGroup.appendChild(label);
    inputGroup.appendChild(input);

    // Append the new form group to the container
    container.appendChild(inputGroup);
});

//experience section
const experienceSections = document.getElementById('experience-sections');
const companyContent = document.getElementById('company-content');
const addSectionButton = document.getElementById('add-section');

let sectionCount = 0;

function createExperienceSection() {
    sectionCount++;
    const section = document.createElement('div');
    section.className = 'section';
    section.dataset.sectionId = sectionCount;

    section.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>Company Title:</label>
                        <input type="text" class="company-title" placeholder="Enter company name" data-field="companyTitle">
                    </div>
                    <div class="form-group">
                        <label>Your Job Role:</label>
                        <input type="text" class="job-role" placeholder="Enter job role" data-field="jobRole">
                    </div>
                </div>
                <div class="form-group">
                    <label>Company Location:</label>
                    <input type="text" class="company-location" placeholder="Enter company location" data-field="companyLocation">
                </div>
                <div class="form-group">
                    <label>Description:</label>
                    <textarea class="description" placeholder="Describe your responsibilities and achievements" data-field="description"></textarea>
                </div>
    `;

     // Add event listener to inputs for real-time updates
    section.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updateCompanyDetails);
        });

    experienceSections.appendChild(section);
}

function updateCompanyDetails() {
    const allSections = document.querySelectorAll('.section');
    companyContent.innerHTML = '';

    allSections.forEach(section => {
        const companyTitle = section.querySelector('.company-title').value;
        const jobRole = section.querySelector('.job-role').value;
        const companyLocation = section.querySelector('.company-location').value;
        const description = section.querySelector('.description').value;

        const sectionPreview = document.createElement('div');

        // sectionPreview.innerHTML = `
        //                 <div class="company-details">
        //                     <p class="company-name">${companyTitle || "Company Name"}</p>
        //                     <p class="company-location">${jobRole || "Job Title"}</p>
        //                     <p class="job-role">${companyLocation || "Location"}</p>
        //                 </div>
        //                 <p class="company-description">${description || "Lorem ipsum dolor sit..."}</p>
        //             `;
        sectionPreview.innerHTML = `
                        <div class="company-details">
                            <p class="company-name"><strong>${companyTitle},</strong></p>
                            <p class="job-role"><strong>${companyLocation}-</strong></p>
                            <p class="company-location"><strong>${jobRole}</strong></p>
                        </div>
                        <p class="company-description">${description}</p>
                    `;

            companyContent.appendChild(sectionPreview);
    });
}

addSectionButton.addEventListener('click', createExperienceSection);

        // Create the first section by default
createExperienceSection();


//education section
const educationSections = document.getElementById('education-sections');
        const schoolContent = document.getElementById('school-content');
        const addEducationSectionButton = document.getElementById('add-education-section');

        let educationCount = 0;

        // Function to Create a New Education Section
        function createEducationSection() {
            educationCount++;
            const section = document.createElement('div');
            section.className = 'section';
            section.dataset.educationId = educationCount;

            section.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label>School Name:</label>
                        <input type="text" class="school-name" placeholder="Enter school name" data-field="schoolName">
                    </div>
                    <div class="form-group">
                        <label>Location:</label>
                        <input type="text" class="school-location" placeholder="Enter location" data-field="schoolLocation">
                    </div>
                </div>
                <div class="form-group">
                    <label>Degree:</label>
                    <input type="text" class="school-degree" placeholder="Enter degree" data-field="schoolDegree">
                </div>
                <div class="form-group">
                    <label>Description:</label>
                    <textarea class="school-description" placeholder="Describe your experience" data-field="schoolDescription"></textarea>
                </div>
            `;

            // Add Input Listeners for Real-Time Updates
            section.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', updateEducationPreview);
            });

            educationSections.appendChild(section);
        }

        // Function to Update the Resume Preview
        function updateEducationPreview() {
            const allEducationSections = document.querySelectorAll('.section[data-education-id]');
            schoolContent.innerHTML = '';

            allEducationSections.forEach(section => {
                const schoolName = section.querySelector('.school-name').value;
                const schoolLocation = section.querySelector('.school-location').value;
                const schoolDegree = section.querySelector('.school-degree').value;
                const schoolDescription = section.querySelector('.school-description').value;

                const educationPreview = document.createElement('div');
                educationPreview.innerHTML = `
                    <div class="school-details">
                        <p id="school-name"><strong>${schoolName},</strong></p>
                        <p id="school-location"><strong>${schoolLocation}-</strong></p>
                        <p id="school-degree"><strong>${schoolDegree}</strong></p>
                    </div>
                    <p id="school-description">${schoolDescription}</p>
                `;

                schoolContent.appendChild(educationPreview);
            });
        }

        // Event Listener to Add New Education Section
        addEducationSectionButton.addEventListener('click', createEducationSection);

        // Create the First Section by Default
        createEducationSection();

        // max-width: 900px;

let submitBtn=document.querySelector('#submit-btn');
let displayContainer=document.querySelector('.form-container');
let resumeContainer=document.querySelector('.resume-container');
let downloadBtn=document.querySelector('.download-btn');
// margin: 20px auto;
submitBtn.addEventListener('click',()=>{
    displayContainer.classList.add('hidden');
    resumeContainer.style.maxWidth = "900px";
    resumeContainer.style.margin = "20px auto";
    downloadBtn.classList.remove('hidden');
    // element.style.margin = "20px";
    console.log("submit-btn clicked");
})

// let downloadBtn=document.querySelector('.download-btn');

downloadBtn.addEventListener('click',async function () {
    const resume = document.querySelector('.container');
    const canvas = await html2canvas(resume);
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const imgWidth = 190; 
    const pageHeight = 297; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    
    while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) {
            pdf.addPage();
        }
    }
    pdf.save('resume.pdf');
})