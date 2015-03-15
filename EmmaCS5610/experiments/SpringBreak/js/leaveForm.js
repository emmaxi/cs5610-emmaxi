
            $(function () {
                //delete request form
                $(".cancel").click(function () {
                    alert("Be sure to delete this leave form?");
                    $(this).parents("#leave-form").remove();
                });

                //submit request form
                $(".submit_leave").click(function () {
                    alert("Be sure to submit this leave form?");
                });

                // add request form
                $(".add_leave").click(function () {
                    var $oneLeaveMore = "<table class='table table-bordered table-hover'><thead><tr><th>LEAVE</th><th>MONTH</th><th>DAY</th><th>YEAR</th><th>TOTAL#</th><th>HRS/DAYS</th></tr></thead><tbody><tr><td>BEGINNING</td><td><input type='month' class='form-control' /></td><td><input type='date' class='form-control' /></td><td><input type='text' class='form-control' /></td><td rowspan='2'></td><td rowspan='2'><div><label class='checkbox-inline'><input type='radio' name='dayOrHour' id='hours'> HOURS</label><br /><br /><label class='checkbox-inline'><input type='radio' name='dayOrHour' id='days'> DAYS</label></div></td></tr><tr><td>ENDING</td><td><input type='month' class='form-control' /></td><td><input type='date' class='form-control' /></td><td><input type='text' class='form-control' /></td></tr><tr><td colspan='6'><button type='button' class='btn btn-primary pull-right' onClick='submit()'><span class='glyphicon glyphicon-ok'></span></button></td></tr></tbody></table>"
                    $(this).parents("#leave-form").append($oneLeaveMore);
                });
            });

            //function for added leave form
            function submit() {
                alert("Be sure to submit this leave form?");
            };