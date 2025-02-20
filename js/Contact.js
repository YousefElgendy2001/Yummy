

  // ✅ تحريك القائمة الجانبية
  $("#navBar").animate({ left: -$(".socials").innerWidth() }, 0);
  $(".nav i").click(function () {
      if ($("#navBar").css("left") == "0px") {
          $("#navBar").animate({ left: -$(".socials").innerWidth() }, 1000);
          $(".open").removeClass("d-none");
          $(".close").addClass("d-none");
      } else {
          $("#navBar").animate({ left: "0px" }, 1000);
          $(".open").addClass("d-none");
          $(".close").removeClass("d-none");
      }
  });

  $(document).ready(function () {
    function validateName(name) {
        return /^[A-Za-z ]+$/.test(name);
    }
    function validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
    function validatePassword(password) {
        return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
    }
    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }
    function validateForm() {
        let name = $("#name").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let confirmPassword = $("#confirmPassword").val();
        
        let isNameValid = validateName(name);
        let isEmailValid = validateEmail(email);
        let isPasswordValid = validatePassword(password);
        let isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
        
        $("#nameError").toggle(!isNameValid);
        $("#emailError").toggle(!isEmailValid);
        $("#passwordError").toggle(!isPasswordValid);
        $("#confirmPasswordError").toggle(!isConfirmPasswordValid);
        
        let isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
        $("#submitBtn").prop("disabled", !isFormValid);
    }
    $("input").on("input", validateForm);
});