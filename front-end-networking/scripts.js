// Fetch JSON
function fetchJSON() {
  fetch("examples/non-existent.json")
    .then(validateResponse)
    .then(logResult)
    .catch(logError);
}

// Head Request
function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
  .then(validateResponse)
  .then(readResponseAsText)
  .then(logResult)
  .catch(logError);
}

// Post Form, No CORS
function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'));
  fetch('http://localhost:5001/', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
    .then(logResult)
    .catch(logError);
}