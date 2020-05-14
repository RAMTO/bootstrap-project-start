// Variables
var $form1 = $('#form1');

// Functions
function handleFormSubmit(e) {
  e.preventDefault();

  var $this = $(this);
  console.log('Form submitted');
}

// Bind events & init plugins
$(document).ready(function () {
  $form1.on('submit', handleFormSubmit);
});
