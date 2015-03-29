        
        //submit the form and jump to the request form page
        function register() {
            alert("Be sure to register?");
            window.location.href = "RequestLeaveForm.html";
        };

        //check if the email user input is in the correct pattern
        function checkEmail() {
            var emailValue = document.getElementById("email").value;
            if (!isEmail(emailValue)) {
                alert("Wrong type of email address, please try again!");
                email.focus();
                return false;
            }
            alert("Congruatulations! The email address is correct.");
            return true;
        };

        function isEmail(str) {
            //RegExp for BRA company, whose email is like first.last@boston.gov or first.m.last@boston.gov
            var reg = /^[A-Za-z]+?\.([A-Za-z]+\.)?[A-Za-z]+?@boston.gov$/;
            return reg.test(str);
        };

        //Make sure that username can not be empty
        function username() {
            var nameValue = document.getElementById("userName").value;
            if (nameValue == '') {
                alert("User name can not be empty!");
                return false;
             }
        };

        //Make sure that password can not be empty
        function password() {
            var passwordValue = document.getElementById("passwordR").value;
            if (passwordValue == '') {
                alert("Password can not be empty!");
                return false;
            }
        };

        //Make sure that reinput password equals to the previous one
        function confirmPassword() {
            var passwordValue = document.getElementById("passwordR").value;
            var rePasswordValue = document.getElementById("re-password").value;
            if (passwordValue != rePasswordValue) {
                alert("Please make sure input the same password as above");
                return false;
            }
        };