import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Document, Page, pdfjs } from 'react-pdf';
import { ResumeParse } from '../Services/api';
import { Proficiency } from '../Domain/ResumeType';
import { useResume } from '../Services/ResumeContext';
import { capitalizeFirstLetter } from '../Services/capitalizeFirstLetter';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

const ResumeForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [documentLoadSuccess, setDocumentLoadSuccess] = useState<boolean>(false);
  const { resume, setResume } = useResume();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setFileDataURL(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append('linkedinPdf', file);
    }

    try {
      setLoading(true);
      const externalId = "65816480556240422";
      const response = await ResumeParse(formData, externalId);
      console.log(response);
      
      setResume(response);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao criar currículo", error);
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setDocumentLoadSuccess(true);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          {fileDataURL ? (
            <div className="pdf-preview">
              <Document
                file={fileDataURL}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          ) : (
            isDragActive ? (
              <div className="drop-files">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height="50"
                  width="50"
                  fill="currentColor"
                >
                  <path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
                </svg>
              </div>
            ) : (
              <div className="drag-files">
                Arraste e solte o arquivo aqui, ou clique para selecionar o arquivo
              </div>
            )
          )}
        </div>
        {
          documentLoadSuccess ? (
            <div className="navigation">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
              >
                Anterior
              </button>
              <span>
                Página {pageNumber} de {numPages}
              </span>
              <button
                type="button"
                disabled={pageNumber >= (numPages || 0)}
                onClick={nextPage}
              >
                Próxima
              </button>
            </div>
          ) : <></>
        }

        <button type="submit" disabled={!file}>Extrair Currículo</button>
      </form>

      {loading && <p className="loading">Carregando...</p>}

      {resume && !loading && (
        <div className="resume-container">
          <h2>Currículo Extraído</h2>
          <h3><strong>{resume.headLine?.slice(-1)}</strong></h3>
          <p><strong>Nome:</strong> {resume.name}</p>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>LinkedIn:</strong> {resume.linkedinUrl}</p>
          <p><strong>Site Pessoal:</strong> {resume.personalSite}</p>
          <h3>Sobre Mim</h3>
          {resume.aboutMe?.map((about, index) => (
            <p key={index}>{about.fullDescription}</p>
          ))}
          <h3>Localização</h3>
          <p>{resume.location?.locationName}</p>
          <h3>Principais Tecnologias</h3>
          <ul>
            {resume.resumeTechnology?.map((tech, index) => (
              <li key={index}>{tech.technology.name}</li>
            ))}
          </ul>
          <h3>Experiências</h3>
          {resume.experiences?.map((exp, index) => (
            <div key={index}>
              <p><strong>Título:</strong> {exp.title}</p>
              <p><strong>Empresa:</strong> {exp.companyName}</p>
              <p><strong>Localização:</strong> {exp.location?.locationName}</p>
              <p><strong>Descrição:</strong> {exp.description}</p>
              <p><strong>Conquistas:</strong></p>
              <ul>
                {exp.achievements?.map((ach, index) => (
                  <li key={index}>{ach.fullDescription}</li>
                ))}
              </ul>
              <p><strong>Tecnologias:</strong> {exp.experienceTechnology?.map((tech) => (`${capitalizeFirstLetter(tech.technology.name)}, `).replace("undefined, ", ""))}</p>
              <div className="divisionBar"></div>
            </div>
          ))}
          <h3>Educação</h3>
          {resume.education?.map((edu, index) => (
            <div key={index}>
              <p><strong>Escola:</strong> {edu.school}</p>
              <p><strong>Grau:</strong> {edu.degree}</p>
              <p><strong>Área de Estudo:</strong> {edu.fieldOfStudy}</p>
            </div>
          ))}
          <h3>Idiomas</h3>
          {resume.languages?.map((lan, index) => (
            <div key={index}>
              <p><strong>Lingua:</strong> {lan.languageName}</p>
              <p><strong>Proficiência:</strong> {Proficiency[lan.proeficiency]}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeForm;
