
var Modal = (function(){
  var myModal = document.getElementById('my-modal'),
        myBtn = document.getElementById('my-btn'),
       myXbtn = document.getElementsByClassName('close')[0],
   sectionOne = document.getElementsByClassName('section-one')[0],
      nextBtn = document.getElementById('next'),
   sectionTwo = document.getElementsByClassName('section-two')[0],
       errors = document.getElementById('error-messages'),
    submitBtn = document.getElementById('submitBtn');
         form = document.getElementsByTagName('form')[0];

  var mileage = document.getElementById('mileage'),
        price = document.getElementById('price')
         year = document.getElementById('year'),
   colorInput = document.getElementById('color'),
        color = document.getElementById('car-color'),
  brandSelect = document.getElementById('brand'),
        brand = document.getElementById('car-brand'),
     currency = document.getElementById('currency'),
       inputs = document.querySelectorAll('input[type=text]'),
          dmg = document.getElementById('damaged'),
      related = document.getElementsByClassName('related')[0];

   var reqErr = document.getElementById('req-err'),
       milErr = document.getElementById('mil-err'),
      yearErr = document.getElementById('year-err');

  var openModal = function() {
    myModal.classList.add('active');
    myModal.style.display = 'block';
  };

  var closeModal = function() {
    myModal.style.display = 'none'
  };

  var toggleSections = function() {
    if ( sectionOne.style.display === 'block' || sectionOne.style.display === '') {
      for( var i = 0; i < inputs.length; i++ ) {
        if( inputs[i].name !== 'price' && inputs[i].name !== 'related'){
          if (( inputs[i].classList.contains('invalid') || !inputs[i].classList.contains('valid')) || brandSelect.options[brandSelect.selectedIndex].value === "err") return false;
        }
      }

      sectionOne.style.display = 'none';
      sectionTwo.style.display = 'block';
      document.getElementsByTagName('body')[0].classList.remove('view-one');
      document.getElementsByTagName('body')[0].classList.add('view-two');
      nextBtn.innerHTML = "Back"
    } else {
      sectionOne.style.display = 'block';
      sectionTwo.style.display = 'none';
      document.getElementsByTagName('body')[0].classList.remove('view-two');
      document.getElementsByTagName('body')[0].classList.add('view-one');
      nextBtn.innerHTML = "Next"
    }
  };

  var validateInputsLength = function() {
    for( var i = 0; i < inputs.length; i++ ) {
      if( inputs[i].name !== 'mileage' && inputs[i].name !== 'year' && inputs[i].name !== 'price'){
        inputs[i].addEventListener('keyup', function(){
          if( this.value.length === 0 ) {
            if( !this.classList.contains('invalid') ) {
              if( this.classList.contains('valid') ) this.classList.remove('valid');
              this.classList.add('invalid');
              reqErr.style.display = 'block';
           }
          } else {
            if( this.classList.contains('invalid') ) {
              this.classList.remove('invalid');
              this.classList.add('valid');
              if( !areErrors())reqErr.style.display = 'none';
            } else {
              this.classList.add('valid');
              if( !areErrors() )reqErr.style.display = 'none';
            }
          }
        });
      }
    }
  };

  var validateNumber = function( number ) {
      return function() {
        if( isNaN( number.value ) || number.value.length === 0 ) {
          if( !number.classList.contains('invalid') ) {
            if( number.classList.contains('valid') ) number.classList.remove('valid');
            number.classList.add('invalid');
            milErr.style.display = "block";
         };
        } else {
          if( number.classList.contains('invalid') ) {
            number.classList.remove('invalid');
            number.classList.add('valid');
            milErr.style.display = "none";
          } else {
            number.classList.add('valid');
            milErr.style.display = "none";
          }
        }
      }
    };

  var valideteYear = function() {
    var regex = /^(19[5-9]\d|200\d|201[0-7])$/;

    if( regex.test( year.value ) && year.value.length > 0 ) {
      if( year.classList.contains('invalid') ) {
        year.classList.remove('invalid');
        year.classList.add('valid');
        yearErr.style.display = 'none'
      } else {
        year.classList.add('valid');
        yearErr.style.display = 'none'
      }
    } else {
      if( !year.classList.contains('invalid') ) {
        if( year.classList.contains('valid') ) year.classList.remove('valid');
        year.classList.add('invalid');
        yearErr.style.display = 'block'
     };
    }
  };

  var addColor = function() {
    color.style.backgroundColor = colorInput.value;
  };

  var addBrand = function() {
    var selectedValue = brandSelect.options[brandSelect.selectedIndex].value;

    brand.childNodes[1].src = "img/"+ selectedValue +".png";
    brand.childNodes[1].style.display = "inline-block";

    brandSelect.classList.add('valid');
  };

  var validateCurrency = function() {
    var selectedCurrency = currency.options[currency.selectedIndex].value;

    if( selectedCurrency !== 'err' ) currency.classList.add('valid');
  };

  var checkDamage = function() {
    if( dmg.checked ) {
      related.style.display = 'block';
    } else {
      related.style.display = 'none';
      console.log(related.childNodes[3]);
      related.childNodes[3].value = '';
      related.childNodes[3].className = '';

    }
  };

  var areErrors = function() {
    var invalidInput = document.querySelectorAll('input[type=text].invalid:not(#mileage):not(#year)');
    if( invalidInput.length > 0 ) {
      return true
    } else {
      return false;
    }
  }

  var onSubmit = function(e) {
    e.preventDefault();
    valid = currency.classList.contains('valid') && price.classList.contains('valid')
    if( valid ) {
      form.submit();
    } else {
    }
  }


  return {
    initEvents: function() {
      myBtn.addEventListener('click', openModal);
      myXbtn.addEventListener('click', closeModal);
      colorInput.addEventListener('focusout', addColor);
      brandSelect.addEventListener( 'focusout' ,addBrand);
      next.addEventListener('click', toggleSections);
      dmg.addEventListener('change', checkDamage);
      submitBtn.addEventListener('click', onSubmit);
    },

    validationEvents: function() {
      mileage.addEventListener( 'keyup', validateNumber( mileage ));
      price.addEventListener('keyup', validateNumber( price ));
      year.addEventListener( 'keyup', valideteYear );
      currency.addEventListener('focusout', validateCurrency );
      validateInputsLength();
    }
  };
}());

Modal.initEvents();
Modal.validationEvents();
