document.getElementById('pdfBtn').onclick = async () => {
    const { jsPDF } = window.jspdf;
    const content = document.createElement('div');
    content.style = 'padding:40px; background:white; color:black; font-family:Arial; width:800px;';
    
    const data = getFormData();
    content.innerHTML = `
        <h1 style="text-align:center;">${data.fullName || 'Name'}</h1>
        <p style="text-align:center;">${data.contact}</p>
        ${data.photo ? `<img src="${data.photo}" style="width:120px;height:120px;border-radius:50%;display:block;margin:0 auto 20px;">` : ''}
        <h3>About</h3><p>${(data.bio || '').replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <p><b>Soft:</b> ${data.softSkills}</p>
        <p><b>Tech:</b> ${data.technicalSkills}</p>
        ${data.institute ? `<h3>Education</h3><p><b>${data.degree}</b> - ${data.institute} (${data.year})<br>Grade: ${data.grade}</p>` : ''}
        <h3>Experience</h3><p><b>${data.company}</b> - ${data.duration}<br>${(data.responsibilities || '').replace(/\n/g, '<br>')}</p>
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
    alert('PDF Saved!');
};
