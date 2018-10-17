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
        $("#search_student #content").html(data);
    }})
  })
  $("#list_student button").click(function(event) {
    event.preventDefault();
    $.ajax({
      method: "get",
      url: "./list_student_req",
      success: function(data){
        $("#list_student #content").html(data);
        $("#list_student #contentDiv").css({height: "0em", overflow:"hidden"});
        $("#list_student #contentDiv").animate({
          height: "25em",
          overflow: "scroll",
          opacity: 1
        }, 1000);
      }
    })
  })
  $("#add_student button").click(function(event) {
    event.preventDefault();
    $.ajax({
      method: "get",
      url: "./add_student_req",
      data: {
        student_id: $("#add_student input[name='student_id']").val(),
        student_name: $("#add_student input[name='student_name']").val()
      },
      success: function(data){
        $("#message").html(data);
      }
    })
  })
  $("#del_student button").click(function(event) {
    event.preventDefault();
    $.ajax({
      method: "get",
      url: "./del_student_req",
      data: {
        student_id: $("#del_student input[name='student_id']").val(),
      },
      success: function(data){
        $("#message").html(data);
      }
    })
  })
})

