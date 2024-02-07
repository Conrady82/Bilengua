import React, { useState, ChangeEvent } from 'react';

function App() {
  const [inputScript, setInputScript] = useState<string>('');
  const [outputResponse, setOutputResponse] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputScript(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script: inputScript })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log(data)
      setOutputResponse(data.message); // Assuming the response contains a "message" field
    } catch (error) {
      console.error('Error:', error);
      setOutputResponse('Failed to fetch response');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <div>
        <h2>Input Script</h2>
        <textarea value={inputScript} onChange={handleInputChange} style={{ width: '300px', height: '200px' }}></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <h2>Output Response</h2>
        <textarea value={outputResponse} style={{ width: '300px', height: '200px' }} readOnly></textarea>
      </div>
    </div>
  );
}

export default App;
