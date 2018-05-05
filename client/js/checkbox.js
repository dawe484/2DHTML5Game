'use strict';

$('.toggle-password').click(function() {

  $(this).toggleClass('fa-eye fa-eye-slash');
  let input = $($(this).attr('toggle'));
  if (input.attr('type') == 'password') {
    input.attr('type', 'text');
  } else {
    input.attr('type', 'password');
  }

});

function allSameValue(array) {
  let first = array[0];
  if (first === -1) {
    return array.every(function(element) {
      return element === first;
    });
  }
}

$(document).ready(function() {
  $('.category_filters :checkbox').click(function() {
    let re = new RegExp($('.category_filters :checkbox:checked').map(function() {
      return this.value;
    }).get().join('|'));
    $('div .hero').each(function() {
      let $this = $(this);
      $this[re.source != '' && re.test($this.attr('class')) ? 'show' : 'hide']();
    });
  });

  $('.search').on('keyup', function() {
    // let numberOfHeroes = $('div .hero').length;
    // console.log(numberOfHeroes);
    let searchHero = $(this).val().toLowerCase();
    let arrayOfHeroes = [];
    $('div .hero').each(function() {
      let heroName = $(this)[0].innerText.toLowerCase();
      // console.log(heroName.indexOf(searchHero));
      arrayOfHeroes.push(heroName.indexOf(searchHero));
      if (heroName.indexOf(searchHero) === -1) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    // console.log('array: ' + arrayOfHeroes);
    // console.log(allSameValue(arrayOfHeroes));
    if (allSameValue(arrayOfHeroes)) {
      $('div .noHeroes').show();
    } else {
      $('div .noHeroes').hide();
    }
  });
});