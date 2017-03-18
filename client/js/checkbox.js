$(function() {
  $('#Tank').on("click", () => {
    $('.Fighter').toggle(this.checked);
    $('.Marksman').toggle(this.checked);
    $('.Mage').toggle(this.checked);
    $('.Support').toggle(this.checked);
  });
  $('#Fighter').on("click", () => {
    $('.Tank').toggle(this.checked);
    $('.Marksman').toggle(this.checked);
    $('.Mage').toggle(this.checked);
    $('.Support').toggle(this.checked);
  });
  $('#Marksman').on("click", () => {
    $('.Tank').toggle(this.checked);
    $('.Fighter').toggle(this.checked);
    $('.Mage').toggle(this.checked);
    $('.Support').toggle(this.checked);
  });
  $('#Mage').on("click", () => {
    $('.Tank').toggle(this.checked);
    $('.Fighter').toggle(this.checked);
    $('.Marksman').toggle(this.checked);
    $('.Support').toggle(this.checked);
  });
  $('#Support').on("click", () => {
    $('.Tank').toggle(this.checked);
    $('.Fighter').toggle(this.checked);
    $('.Marksman').toggle(this.checked);
    $('.Mage').toggle(this.checked);
  });
});
