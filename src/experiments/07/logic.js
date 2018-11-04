$(document).ready(function() {
  var select = document.querySelectorAll("select");
  var i;
  [...select].forEach(array => {
    array.addEventListener('change', function() {
      var donor = document.getElementById("donor");
      var recipient = document.getElementById("recipient");
      var donorValue = donor.options[donor.selectedIndex].value;
      var recipientValue = recipient.options[recipient.selectedIndex].value;
      var combination = donorValue + " & " + recipientValue;
      function showResultPos() {document.getElementById("result").innerHTML = "Blood type IS compatible."}
      function showResultNeg() {document.getElementById("result").innerHTML = "Blood type IS NOT compatible."}
     switch (combination) {
       case "A & A":
       case "A & AB":
       case "B & B":
       case "B & AB":
       case "AB & AB":
       case "O & A":
       case "O & B":
       case "O & AB":
       case "O & O":
         showResultPos();
         break;
       default:
         showResultNeg();
         break;
      }
    });
  });
});