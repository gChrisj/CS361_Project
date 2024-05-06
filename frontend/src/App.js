import React, { useState } from 'react';
import './App.css';
import axios from 'axios'




function App() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcribed, setTranscribed] = useState(false);
  const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file_upload', file); // Make sure to use the same field name as in multer middleware
        const response = await axios.post('http://localhost:5001/upload', formData);
        console.log(response.data); // Handle response data
        setFileUploaded(true);
        setFileName(file.name);
        setSelectedFile(file);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      uploadFile(file);
  }
};
const transcribe = ()=>{
  console.log("Transcribed")
  setTranscribed(true);
};
const clearFile = () => {
  setFileUploaded(false);
  setFileName('');
  setSelectedFile(null);
  // Clear the input field
  const inputElement = document.querySelector('input[type="file"]');
  inputElement.value = '';
  setTranscribed(false);
};
const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
      uploadFile(file);
  }
};
  return (
    <div class="main" className="flex items-center flex-col justify-center">
      <div>
          <h1 className="text-3xl font-bold underline">
    Welcome!
    </h1>
      </div>
    
      <div className='flex items-center flex-col justify-center'>
          <h1 className="text-1xl font-bold underline">
          Quick Start Guide to begin transcribing:
          </h1>
          <ul className="flex flex-col flex-wrap w-96">
            <li>1. Drag and Drop or Click Browse to find an audio/video file.</li>
            <li>2. Click the transcribe button to begin the transcription.</li>
            <li>3. After your transcript has been completed there will be a summarization option for a more condensed transcript, and for convenience, you can save your transcript as a text file or copy as plain text!</li>
          </ul>
      </div>
  <div class="drag-drop" className="max-w-xl w-full" onDragOver={handleDragOver} onDrop={handleDrop}>
    <label
        class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
        <span class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span class="font-medium text-gray-600">
            {fileUploaded ? (
                                <>
                                    File Uploaded: {fileName} 
                                    <button onClick={clearFile} className="text-red-600 ml-2">Click to clear</button>
                                </>
                            ) : (
                                <>
                                    Drop files to Attach, or&nbsp;
                                    <span className="text-blue-600 underline">browse </span>
                                </>
                            )}
            </span>
        </span>
        <input type="file" name="file_upload" class="hidden" accept='audio/*,video/*' onChange={handleFileChange} />
    </label>

</div>

<div class="transcribe" className="max-w-xl w-full pt-4">
  <div className="flex w-full flex-row justify-between">
    <button className={`rounded-md p-2 ${fileUploaded ? 'bg-sky-500 hover:bg-sky-700' : 'bg-gray-400 cursor-not-allowed'}`} onClick={transcribe} disabled={!fileUploaded}>Transcribe</button>
    <div className="text-red-800">File limit: 25mb</div>
  </div>
</div>
<div class="summarize" className="max-w-xl w-full pt-1">
<div className="flex justify-between">
  <button className={`rounded-md p-2 ${transcribed ? 'bg-sky-500 hover:bg-sky-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!transcribed}>Summarize</button>
  <button className={`rounded-md p-2 ${transcribed ? 'bg-sky-500 hover:bg-sky-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!transcribed}>Undo Summarize</button>
</div>

</div>
<div class="display" className="max-w-xl w-full pt-1">
  <div className="flex justify-center bg-slate-400 w-full h-5 p-24">
  {transcribed && (
                    <div>
                        <h2>Here is the transcription of: {fileName}</h2>
                    </div>
                )}
    
  </div>
</div>
<div class="save" className="max-w-xl w-full pt-1">
  <div className="flex justify-between">
  <button className={`rounded-md p-2 ${transcribed ? 'bg-sky-500 hover:bg-sky-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!transcribed}>Save to Text file</button>
   
  <button className={`rounded-md p-2 ${transcribed ? 'bg-sky-500 hover:bg-sky-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled={!transcribed}>Copy Text</button>
   
  </div>

</div>

    </div>
    
  );
}


export default App;
