function addQA() {
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
  
    if (question && answer) {
      const qaObject = {
        question: question,
        answer: answer
      };
  
      let qaList = JSON.parse(localStorage.getItem('qaList')) || [];
      qaList.push(qaObject);
      localStorage.setItem('qaList', JSON.stringify(qaList));
      updateTable(qaObject);
  
      document.getElementById('question').value = '';
      document.getElementById('answer').value = '';
    } else {
      alert('Bitte füllen Sie sowohl die Frage- als auch die Antwortfelder aus.');
    }
  }
  
  // Function to update table with stored questions and answers
  function updateTable(qaObject) {
    const table = document.getElementById('qa-table').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
  
    const questionCell = newRow.insertCell(0);
    const answerCell = newRow.insertCell(1);
  
    questionCell.textContent = qaObject.question;
    answerCell.textContent = qaObject.answer;
  
    questionCell.classList.add('mdl-data-table__cell--non-numeric');
    answerCell.classList.add('mdl-data-table__cell--non-numeric');
  
    componentHandler.upgradeElement(table);
  }
  
  // Function to load stored questions and answers on page load
  window.onload = function() {
    let qaList = JSON.parse(localStorage.getItem('qaList')) || [];
    qaList.forEach(function(qaObject) {
      updateTable(qaObject);
    });
  
    loadSavedImage();
  };
  
  // Function to delete all stored questions and answers
  function deleteAllQA() {
    localStorage.removeItem('qaList');
    const table = document.getElementById('qa-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
  }
  
  // Function to upload an image
  // Event Listener für Klick auf "Bild hinzufügen" Button
  document.getElementById('add-image-button').addEventListener('click', function() {
    document.getElementById('image-upload').click();
    document.getElementById('image-upload').click(); // Klickt auf das versteckte Datei-Upload-Element
  });
  
  // Function to display uploaded image
  // Event Listener für Änderungen im Datei-Upload-Element
  document.getElementById('image-upload').addEventListener('change', function() {
    var file = this.files[0];
    var file = this.files[0]; // Die ausgewählte Datei aus dem Upload-Element
    if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('uploaded-image').src = e.target.result;
        document.getElementById('uploaded-image').style.display = 'block';
        saveImageToLocalStorage(e.target.result);
      }
      reader.readAsDataURL(file);
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('uploaded-image').src = e.target.result; // Zeigt das hochgeladene Bild an
            document.getElementById('uploaded-image').style.display = 'block'; // Macht das Bild sichtbar
        }
        reader.readAsDataURL(file); // Liest die Datei als Daten-URL
    }
  });
  
  // Function to change the uploaded image
  document.getElementById('change-image-button').addEventListener('click', function() {
    document.getElementById('image-upload').click();
  });
  
  // Function to delete the uploaded image
  document.getElementById('delete-image-button').addEventListener('click', function() {
    deleteImage();
  });
  
  function saveImageToLocalStorage(imageUrl) {
    localStorage.setItem('uploadedImage', imageUrl);
  }
  
  function loadSavedImage() {
    var imageUrl = localStorage.getItem('uploadedImage');
    if (imageUrl) {
      document.getElementById('uploaded-image').src = imageUrl;
      document.getElementById('uploaded-image').style.display = 'block';
    }
  }
  
  function deleteImage() {
    localStorage.removeItem('uploadedImage');
    document.getElementById('uploaded-image').src = '';
    document.getElementById('uploaded-image').style.display = 'none';
  }
  
  // Function to go to the next page
  function nextPage() {
    window.location.href = 'neue_seite.html';
  }
  
  // Function to navigate to the next page
  function nextPage() {
    // Replace 'nextPage.html' with the URL of your next page
    window.location.href = 'nextPage.html';
  }
  