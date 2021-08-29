const inputIds = ['#number-x', '#number-y'];
const $inputInitialX = $('#number-initial-x');
const $inputX = $('#number-x');
const $priceX = $('#price-x');
const $inputInitialY = $('#number-initial-y');
const $inputY = $('#number-y');
const $priceY = $('#price-y');
const $inputK = $('#number-k');

const ftNum = (inputValue) => {
  return parseInt(inputValue.trim(), 10);
};

const updateK = () => {
  const valueX = ftNum($inputInitialX.val());
  const valueY = ftNum($inputInitialY.val());

  $inputK.val(valueX * valueY);
  $inputX.val(valueX);
  $inputY.val(valueY);
  $priceX.html(valueY / valueX);
  $priceY.html(valueX / valueY);
};

const updateFormula = (e) => {
  // Get inputs ids
  const updatedInputId = `#${e.target.id}`;
  let otherInputId;
  inputIds.forEach((inputId) => {
    if (inputId !== updatedInputId) {
      otherInputId = inputId;
    }
  });

  // Get inputs value based on formula
  const updatedInputValue = ftNum($(updatedInputId).val());
  const otherInputValue = ftNum($inputK.val()) / updatedInputValue;

  // Get new prices
  const updatedInputPrice = otherInputValue / updatedInputValue;
  const otherInputPrice = updatedInputValue / otherInputValue;

  // Update input prices
  $(updatedInputId).parent().find('.price-tag').html(updatedInputPrice);
  $(otherInputId).parent().find('.price-tag').html(otherInputPrice);

  // Update other input value
  inputIds.forEach((inputId) => inputId !== updatedInputId && $(inputId).val(otherInputValue));
};

$(() => {
  updateK();
  $('.js-update-k').on('change', updateK);
  $('.js-update-formula').on('change', updateFormula);
});
