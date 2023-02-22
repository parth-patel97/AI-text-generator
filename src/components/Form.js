import React, { useState } from 'react';
import axios from 'axios';

function Form() {
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [numResponse, setNumResponse] = useState(0);
  const [tone, setTone] = useState('');
  const [responseData, setResponseData] = useState(null);

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
    axios.post(`https://tmv96hl3i4.execute-api.us-east-1.amazonaws.com/dev/api/v1/content`,data, {
      headers: { }
    })
      .then((response) => {
        console.log(response);
        setResponseData(response.data);
        console.log(response.data);
        console.log(setResponseData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div align="center" >
      <form onSubmit={handleSubmit}>
        <label>
          Content Type:
          <select value={contentType} onChange={(event) => setContentType(event.target.value)}>
            <option value="">Please select an option</option>
            <option value="blog">Blog</option>
            <option value="article">Article</option>
          </select>
        </label>
        <br />
        <label>
          Topic:
          <input type="text" value={topic} onChange={(event) => setTopic(event.target.value)} />
        </label>
        <br />
        <label>
          Audience: 
          <input type="text" value={audience} onChange={(event) => setAudience(event.target.value)} />
        </label>
        <br />
        <label>
          Number of Responses:
          <input type="number" min="0" max="3" value={numResponse} onChange={(event) => setNumResponse(event.target.value)} />
        </label>
        <br />
        <label>
          Tone:
          <input type="text" value={tone} onChange={(event) => setTone(event.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {responseData && ( // <-- only show the response data if it exists
        <div>
          <p>Response Data:</p>
          <div>{responseData.data.map((result, index) => (
            <p key={index}>{result.text}</p>
          ))}</div>
        </div>
      )}
    </div>
  );
}

export default Form;
