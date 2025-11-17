function getFormData() {
    return {
        fullName: document.getElementById('fullName')?.value || '',
        contact: document.getElementById('contact')?.value || '',
        photo: document.getElementById('photoPreview')?.src || '',
        bio: document.getElementById('bio')?.value || '',
        softSkills: document.getElementById('softSkills')?.value || '',
        technicalSkills: document.getElementById('technicalSkills')?.value || '',
        institute: document.getElementById('institute')?.value || '',
        degree: document.getElementById('degree')?.value || '',
        year: document.getElementById('year')?.value || '',
        grade: document.getElementById('grade')?.value || '',
        company: document.getElementById('company')?.value || '',
        duration: document.getElementById('duration')?.value || '',
        responsibilities: document.getElementById('responsibilities')?.value || '',
        projects: document.getElementById('projects')?.value || ''
    };
}

document.getElementById('pdfBtn').onclick = async () => {
    const { jsPDF } = window.jspdf;
    const content = document.createElement('div');
    content.style = 'padding:40px; background:white; color:black; font-family:Arial; width:800px;';
    
    const data = getFormData();
    content.innerHTML = `
        <h1 style="text-align:center;">${data.fullName || 'Portfolio'}</h1>
        <p style="text-align:center;">${data.contact}</p>
        ${data.photo ? `<img src="${data.photo}" style="width:120px;height:120px;border-radius:50%;display:block;margin:20px auto;">` : ''}
        <h3>About Me</h3><p>${data.bio.replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <p><strong>Soft:</strong> ${data.softSkills}</p>
        <p><strong>Technical:</strong> ${data.technicalSkills}</p>
        ${data.institute ? `<h3>Education</h3><p><strong>${data.degree}</strong> - ${data.institute} (${data.year})<br>Grade: ${data.grade}</p>` : ''}
        <h3>Experience</h3>
        <p><strong>${data.company}</strong> - ${data.duration}<br>${data.responsibilities.replace(/\n/g, '<br>')}</p>
        ${data.projects ? `<h3>Projects</h3><p>${data.projects.replace(/\n/g, '<br>')}</p>` : ''}
    `;
    
    document.body.appendChild(content);
    const canvas = await html2canvas(content);
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, 'PNG', 0, 0, w, h);
    pdf.save('portfolio.pdf');
    document.body.removeChild(content);
    alert('PDF Generated!');
};