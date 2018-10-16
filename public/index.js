$(document).ready(function(){
  console.log("prepare done");
  $("#search_student button").click(function(event) {
    event.preventDefault();
    $.ajax({
      method: "get",
      url: "./search_student_send",
      data: {
        student_id: $("#search_student input[name='student_id']").val()
      },
      success: function(data){
        $("#search_student #content").text(data);
    }})
  })
  $("#list_student button").click(function(event) {
    event.preventDefault();
    $.ajax({
      method: "get",
      url: "./list_student_req",
      success: function(data){
        console.log(`list successed `);
        $("#list_studnet #content").text(data);
      }
    })
  })
})

