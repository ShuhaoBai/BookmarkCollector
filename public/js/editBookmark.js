$("#edit-bookmark").submit(function (event) {
    var genre = $("#editBookCategory").val().toLowerCase(),
        description = $("#editBookDes").val(),
        bookUrl = $("#editBookmarkURL").val();
    const redirect = window.location.href;
    $.ajax({
        type: "POST",
        url: "/editBookmark",
        data: {
            genre: genre,
            description: description,
            bookUrl: bookUrl
        },
        dataType: "json",
        success: function (result) {
            alert('Upload successfully!');
            window.location.href = redirect;
        },
        error: function (result) {
            console.log(result);
            alert("error");
        }
    });
});