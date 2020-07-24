$(function(){
let interval;
let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
let board = document.getElementById("ChessBoard");
let map = [
  5,0,5,
  0,0,0,
  11,0,11,
];
let record = JSON.parse(localStorage.getItem("record"));

for (let i=0; i< 9; i++){
    let a=`${Math.floor(i/3)}`+`${i-Math.floor(i/3)*3}`;
    if(Math.floor(i/3)==0){
        a= `${i-Math.floor(i/3)*3}`;
    }
  let tile = document.createElement("div");
  tile.setAttribute('class', 'container');
  tile.setAttribute('id', `${a}`);
  tile.style.backgroundColor = parseInt(i % 2) == 0 ? 'white' : 'lightgray';
  tile.innerHTML = !map[i] ? "" : i<5 ? "<div class='rider white' style='cursor:grab;' >&#"+ (9811+map[i]) +";</div>" : "<div class='rider black' style='cursor:grab;'>&#"+ (9811+map[i]) +";</div>";
  board.appendChild(tile);
}
    if(record!=null){
      $("#description").append(`<br/> The record is ${record.seconds} seconds. it was carried out on ${record.date} by ${record.name} `)      
    }


    $(".trigger_popup_fricc").click(function(){
        $('.hover_bkgr_fricc').show();
     });
     $('.hover_bkgr_fricc').click(function(){
         $('.hover_bkgr_fricc').hide();
     });
     $('.popupCloseButton').click(function(){
         $('.hover_bkgr_fricc').hide();
         startTimer();
     });

    $('.rider').draggable({
        containment : '#ChessBoard',
        revert : "invalid",
        start: function( event, ui ) {
            this.id = $(this).closest(".container").attr('id');
            if($('.timer').text()=="Timer"){
                startTimer();
            }
        }
    });

    $('.container').droppable({
        accept: function(d) { 
            if((parseInt(d.attr("id"))==parseInt(this.id)+12 || parseInt(d.attr("id"))==parseInt(this.id)-12 || parseInt(d.attr("id"))==parseInt(this.id)+8 || parseInt(d.attr("id"))==parseInt(this.id)-8 || parseInt(d.attr("id"))==parseInt(this.id)+21 || d.attr("id")==parseInt(this.id)-21 || parseInt(d.attr("id"))==parseInt(this.id)+19 || parseInt(d.attr("id"))==parseInt(this.id)-19)&&($(this).children().length == 0)) { 
                return true;
            }
        },
        drop: function (event, ui) {
            $(this).append(ui.draggable);

            $(ui.draggable).css({
                position: 'relative',
                top: '0px',
                left: '0px' 
            }); 
            win();
        }
    });

    function win(){
            if($("#0").children().hasClass("black") && $("#2").children().hasClass("black") &&$("#22").children().hasClass("white") && $("#20").children().hasClass("white")){
            alert(`It's a slam-dunk you took ${$('.timer').text()} seconds.`);
            clearInterval(interval);
            if(record===null || (parseInt($('.timer').text())< parseInt(record.seconds))){
                const name = prompt("You've broken the old record, bravo. You have the right to enter your name in the record table.");
                const winner ={
                    name:name,
                    seconds:$('.timer').text(),
                    date:today.toString()
                };
                localStorage.setItem("record",JSON.stringify(winner));
            }
            }
            
        }
    

    function startTimer(){
        time=0;
        if($('.timer').text()=="Timer"){
        $('.timer').text('Go');
            interval = setInterval(function() {
            time+=1;
            $('.timer').text(`${time}s`);
          }, 1000);            
        }

    }


});




