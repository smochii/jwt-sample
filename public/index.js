window.onload = () => {
  let signButton = document.sign.signButton;
  signButton.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.readyState == 4) {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status == 200) {
          document.verify.token.value = response.data.token;
        } else if (xhr.status == 400) {
          document.verify.token.value = response.message;
        }
      }else{
        document.verify.token.value = "waiting...";
      }
    }
    let username = document.sign.username.value;
    let params = JSON.stringify({ username: username });
    xhr.open('POST', 'http://localhost:3000/sign');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(params);
  });

  let verifyButton = document.verify.verifyButton;
  verifyButton.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.readyState == 4) {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status == 200) {
          document.decorded.decordedToken.value = JSON.stringify(response.data);
        } else if (xhr.status == 400) {
          document.decorded.decordedToken.value = response.message;
        } else if (xhr.status == 401) {
          document.decorded.decordedToken.value = response.message;
        }
      }else{
        document.decorded.decordedToken.value = "waiting...";
      }
    }
    let token = document.verify.token.value;
    let params = JSON.stringify({ token: token });
    xhr.open('POST', 'http://localhost:3000/verify');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(params);
  });
}