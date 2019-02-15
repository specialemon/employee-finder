const compare = function (user, server) {
    let smallestDiff = 9999;
    let result;
    server.forEach(employee => {
        let currentDiff = 0;
        for (let i = 0; i < employee.scores.length; i++) {
            currentDiff += Math.abs(employee.scores[i] - user.scores[i]);
        }
        if (currentDiff <= smallestDiff) {
            smallestDiff = currentDiff;
            result = employee;
        }
    });

    return result;
}

$(function () {
    const surveyResult = function (event) {
        event.preventDefault();
        console.log("123");
        const userResult = {
            "name": $("#userName").val().trim(),
            "photo": $("#userImg").val().trim(),
            "scores": [                    
                $("#select1").val()[0], 
                $("#select2").val()[0],
                $("#select3").val()[0],
                $("#select4").val()[0],
                $("#select5").val()[0],
                $("#select6").val()[0],
                $("#select7").val()[0],
                $("#select8").val()[0],
                $("#select9").val()[0],
                $("#select10").val()[0],
            ]
        }

        console.log(userResult);


        $.ajax({
            url: "/api/employees",
            method: "GET",
            success: function (response) {
                console.log(compare(userResult, response));
                const fetchedResult = compare(userResult, response);
                $("#resultName").text(fetchedResult.name);
                $("#imageContainer").empty();
                $("#imageContainer").append(`<img class="w-75" src="${fetchedResult.photo}">`);

                $.ajax({
                    url: "/api/employees",
                    method: "POST",
                    data: userResult,
                    success: function (response) {
                        console.log(`Successfully push the following to server: ${response}`);
                    },
                    error: function () {
                        console.log("Failed to push the data to server");
                    }
                })
            },
            error: function(){
                console.log("failed to fetch data from the server");
            }
        })
    }

    $("#submitButton").click(surveyResult);
});

