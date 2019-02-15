const compare = function (user, server) {
    let result = 0;
    let smallestDiff = 9999;
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


const surveyResult = function (event) {
    event.preventDefault();
    const userResult = {
        "name": $("#userName").val().trim(),
        "photo": $("#userImg").val().trim(),
        "scores": [
            $("#select1").val(),
            $("#select2").val(),
            $("#select3").val(),
            $("#select4").val(),
            $("#select5").val(),
            $("#select6").val(),
            $("#select7").val(),
            $("#select8").val(),
            $("#select9").val(),
            $("#select10").val(),
        ]
    }


    $.ajax({
        url: "/api/employees",
        method: "GET",
        success: function (response) {
            const fetchedResult = response[compare(userResult, response)];
            $("#resultName").text(fetchedResult.name);
            $("#imageContainer").html(`<img src="${fetchedResult.photo}`);

            $.ajax({
                url: "/api/employees",
                method: "POST",
                data: userResult,
                success: function (response) {
                    console.log(`Successfully push the following to server: ${resoibse}`);
                },
                error: function () {
                    console.log("Failed to push the data to server");
                }
            })
        }
    })
}

$("#submitButton").click(surveyResult);

