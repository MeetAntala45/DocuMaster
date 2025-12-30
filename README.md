# 📄 DocuMaster – Web-Based Document Processing System

DocuMaster is a web-based application that provides users with a simple and reliable platform to perform various document processing operations. The system focuses on improving document handling efficiency by enabling users to compress, convert, and manage commonly used document formats such as PDF, images, and Word files.

DocuMaster is designed with a user-friendly interface that allows users to upload files, process them securely on the server, and download the results instantly. The project simulates the workflow of real-world document processing platforms and emphasizes practical implementation, reliability, and usability.

---

## 🔹 Core Features

- File compression for PDF and image files with size comparison  
- PDF to image conversion with ZIP download support for multi-page PDFs  
- Image to PDF conversion by merging multiple images into a single PDF  
- Word to PDF conversion for compatibility and easy sharing  
- PDF to Word conversion using text extraction (layout may vary)  
- PDF merge functionality to combine multiple PDF files  
- PDF watermarking to add text watermarks for document security  

---

## 🔧 Technology Stack Used

- **Frontend:** React.js, Bootstrap  
- **Backend:** Node.js, Express.js  

### Libraries & Tools
- **Multer** – file upload handling  
- **Sharp** – image compression and processing  
- **PDF-lib** – PDF creation, merging, and watermarking  
- **pdf-parse** – text extraction from PDF documents  
- **docx** – Word document generation  
- **Ghostscript** – real PDF compression  
