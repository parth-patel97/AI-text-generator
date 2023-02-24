import React, { useState } from 'react';
import { Circles } from  'react-loader-spinner';
import axios from 'axios';
import './Form.css';

function Form() {
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [numResponse, setNumResponse] = useState(0);
  const [tone, setTone] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      content_type: contentType,
      topic,
      audience,
      num_responses: parseInt(numResponse),
      tone,
    };
    
    console.log(data);
    console.log(typeof data.num_responses);
    setLoading(true);
    axios.post(`https://tmv96hl3i4.execute-api.us-east-1.amazonaws.com/dev/api/v1/content`,data, {
      headers: { }
    })
      .then((response) => {
        setResponseData(response.data);
        setLoading(false);
        setShowResults(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); 
      });
  };


  if (showResults) {
    return (
      <div className='generated-text'>
        <h2>Generated Text:</h2>
        {responseData &&
          responseData.data.map((result, index) => (
            <p className="generated-text" key={index}>
              {result.text}
            </p>
          ))}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="form-header">AI Text Generator</div>
        <label htmlFor="content-type">Content Type:</label>
        <select id="content-type" name="content-type" value={contentType} onChange={(e) => setContentType(e.target.value)}>
          <option value="">Select an option</option>
          <option value="blog">Blog</option>
          <option value="article">Article</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="topic">Topic:</label>
        <input type="text" id="topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="audience">Audience:</label>
        <input type="text" id="audience" name="audience" value={audience} onChange={(e) => setAudience(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="num-responses">Number of Responses:</label>
        <input type="number" id="num-responses" name="num-responses" value={numResponse} onChange={(e) => setNumResponse(e.target.value)} max="3" min="0" required />
      </div>

      <div className="form-group">
        <label htmlFor="tone">Tone:</label>
        <input type="text" id="tone" name="tone" value={tone} onChange={(e) => setTone(e.target.value)} required />
      </div>

      <button type="submit">Submit</button>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '30px' }}>
          <Circles
            height="70"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : responseData && (
        <div>
          <p>Generated Text:</p>
          <div>{responseData.data.map((result, index) => (
            <p key={index}>{result.text}</p>
          ))}</div>
        </div>
      )}
    </form>
  );
          }

export default Form;
