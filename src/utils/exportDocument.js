import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPdf = async (content, title) => {
  try {
    const element = document.createElement('div');
    element.innerHTML = content;
    document.body.appendChild(element);
    
    const canvas = await html2canvas(element);
    document.body.removeChild(element);
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${title || 'document'}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

export const exportToDocx = (content, title) => {
  // Implement DOCX export using a library like docx-js
  console.log('DOCX export not implemented yet');
};

export const exportToTxt = (content, title) => {
  try {
    const element = document.createElement('a');
    const file = new Blob([content.replace(/<[^>]+>/g, '')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title || 'document'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (error) {
    console.error('Error exporting to TXT:', error);
    throw error;
  }
}; 