/**
 * Created by sandeep on 23/07/17.
 */
var x;
$(document).ready(function () {
   var x = '';

    $('#form').submit(function (e) {
        e.preventDefault();

        $.post({
            url : '/log',
            data : { "email" : $('#email').val(), "password" : $('#pass').val()},
            success : function (data) {



                if(data.key === 'thanks') {
                    x = data.email;
                    main(x);
                    window.location.href="/app.html";

                }
                else {
                    $('#valid').append(data);
                }
                $('#email').val('');
                $('#pass').val('');
            }
        });

    });


   function main(x) {
       window.name = x;

   }

   if(window.name !== "") {
//****************************************//


       getPassbook();



       $('#t-bill').submit(function (e) {
           e.preventDefault();
           var d = new Date();

           var transaction = {
               desp: $('#desp').val(),
               sign: $('#sign').val(),
               amt: $('#amt').val(),
               bank: $('#bank').val(),
               date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
           }; //Transaction object

           if(transaction.bank === 'Bank 1') {
               if(transaction.sign === '+') {
                   b1 += parseInt(transaction.amt);
               }
               else {
                   b1 -= parseInt(transaction.amt);
               }
           }
           else {

               if(transaction.sign === '+') {
                   b2 += parseInt(transaction.amt);
               }
               else {
                   b2 -= parseInt(transaction.amt);
               }

           }

           if(b1 < 0) {
               alert('Cannot Perform Transaction Bank1 Bal -ve');
           }
           else if(b2 < 0) {
               alert('Cannot Perform Transaction Bank1 Bal -ve');
           }
           else {

               $.post({
                   url: '/app/expenso/transaction',
                   data: {trns: transaction, user: window.name},
                   success: function (data) {
                       save();
                       console.log(data);
                       getPassbook();

                   }
               });

           }



           $('#desp').val('');
           $('#amt').val('');


       }); //TRANSACTION BILL FORM

       $('#p-bill').submit(function (e) {
           e.preventDefault();

           var pending = {
               desp: $('#per').val(),
               amt: $('#amnt').val(),
               d_date: $('#ddate').val()
           }

           $.post({
               url: '/app/expenso/pending',
               data: {pend: pending, user: window.name},
               success: function (data) {
                   console.log(data);
               }
           });
           $('#per').val('');
           $('#amnt').val('');
           $('#ddate').val('');

       }); //PENDING BILL FORM

       $('#fm').submit(function (e) {
           e.preventDefault();

           var settings = {
               name: $('#name').val(),
               email: $('#email').val(),
               tel: $('#tel').val(),
               dob: $('#date').val(),
               bill: $('#bill').val()
           }; //Settings object


           $.post({
               url: '/app/expenso/settings',
               data: {set: settings, user: window.name},
               success: function () {
                   getSetting();
               }
           });

           $.post({
               url: '/profile',
               data: { pic : file}

           })


       }); //SETTING FORM

       $('#full-pass').click(function () {

           printPass();

       }); //FULL PASSBOOK BUTTON

       $('#full-pend').click(function () {
           printPend();
       });

       function getPassbook() {
           $.get({
               url: '/app/expenso/get',
               data: {id: "2", user: window.name},
               success: function (data) {

                   if(data.length === 0) {
                       introJs().start();

                   }
                   if (data[0].passbook.length !== 0) {
                       var passbook = data[0].passbook;
                       var no = 1;
                       $('#pass-print').html('');
                       for (var i = passbook.length - 1; i >= 0; i--) {

                           if (passbook[i].sign === '+') {

                               $('#pass-print').append(
                                   '<tr class="true">' +
                                   '<td class="one"><div class="hide"><i class="ion-ios-trash ic1"></i></div>' + no++ + '.</td>' +
                                   '<td class="two">' + passbook[i].desp + '</td>' +
                                   '<td class="three">' + passbook[i].sign + passbook[i].amt + '/-</td>' +
                                   '</tr>'
                               );

                           }

                           else {
                               $('#pass-print').append(
                                   '<tr class="false">' +
                                   '<td class="one"><div class="hide"><i class="ion-ios-trash ic1"></i></div>' + no++ + '.</td>' +
                                   '<td class="two">' + passbook[i].desp + '</td>' +
                                   '<td class="three">' + passbook[i].sign + passbook[i].amt + '/-</td>' +
                                   '</tr>'
                               );
                           }

                           if (no === 11) {
                               break;
                           }

                       }

                       $('.ic1').click(function () {
                           var link = $(this).parent().parent();
                           var x = link.parent()[0].cells[1];
                           var query = $(x).html();
                           console.log(query);

                           $.post({
                               url: '/app/expenso/deletepass',
                               data: {up: query , user : window.name},
                               success: function (data) {
                                   console.log(data);
                                   getPassbook();
                                   save();
                               }
                           });
                       });





                   }
               }

           });

       } //GET PASSBOOK

       $('#link2').click(function () {
          getSetting();
       });

       function getSetting() {

           $.get({
               url: '/app/expenso/get',
               data: {id: "1", user : window.name },
               success: function (data) {
                   var set = data[0].settings;
                   console.log(set);

                       $('#name').val(set.name);
                       $('#email').val(window.name);
                       $('#tel').val(set.tel);
                       $('#date').val(set.dob);
                       $('#bill').val( set.bill);






               }

           });

       } //GET SETTINGS

       $('#find').click(function () {
           var f = $('#srch').val();

           $.get({
               url: '/app/expenso/get',
               data: {id: "2", user: window.name},
               success: function (data) {
                   $('#srch').val('');

                   var passbook = data[0].passbook;
                   var found = 1;
                   var book = [];
                   for (var i = 0; i < passbook.length; i++) {
                       if (passbook[i].date === f) {
                           book.push(passbook[i]);
                           found = 0;
                       }
                       if (passbook[i].desp === f) {
                           book.push(passbook[i]);
                           found = 0;
                       }
                       if (passbook[i].amt === f) {
                           book.push(passbook[i]);
                           found = 0;
                       }
                       if (passbook[i].bank === f) {
                           book.push(passbook[i]);
                           found = 0;
                       }
                   }
                   if (found === 1) {
                       console.log('not found');
                       $('#pf-p').html('');
                       $('#pf-p').append(
                           '<tr class="false">' +
                           '<td class="one"><button><i id="back" class="ion-android-arrow-back"></i> </button></td>' +
                           '<td class="two">:/</td>' +
                           '<td class="three">:(</td>' +
                           '<td class="four">No Results Found</td>' +
                           '<td class="five">:"(</td>' +
                           '</tr>'
                       );

                   }
                   else {
                       f1(book);

                   }

                   $('#back').click(function () {
                       printPass();

                   });


               }


           });


       });

       function printPass() {
           $.get({
               url: '/app/expenso/get',
               data: {id: "2", user: window.name},
               success: function (data) {


                   var passbook = data[0].passbook;
                   printPassLoop(passbook);

                   $('.ic1').click(function () {
                       var link = $(this).parent().parent();
                       var x = link.parent()[0].cells[3];
                       var query = $(x).html();
                       console.log(query);

                       $.post({
                           url: '/app/expenso/deletepass',
                           data: {up: query, user: window.name},
                           success: function (data) {
                               console.log(data);
                               getPassbook();
                               printPass();
                               save();

                           }
                       });
                   });

                   $('.ic2').click(function () {
                       $('.change').css('left','18px');
                       var link = $(this).parent().parent();

                       var x = $(link.parent()[0].cells[4]).html();
                       var a="";
                       for(var i=1; i<x.length-2; i++){
                           a += x.charAt(i);
                       }
                       console.log(a);

                       var prev = {
                           date : $(link.parent()[0].cells[1]).html(),
                           bank : $(link.parent()[0].cells[2]).html(),
                           desp : $(link.parent()[0].cells[3]).html(),
                           sign : ($(link.parent()[0].cells[4]).html()).charAt(0),
                           amt : a

                       };

                       $('#camt').val(parseInt(prev.amt));
                       $('#cbank').val(prev.bank);
                       $('#cdesp').val(prev.desp);
                       $('#csign').val(prev.sign);

                       $('#change-bill').submit(function (e) {

                           e.preventDefault();


                           var naya = {
                               bank : $('#cbank').val(),
                               desp : $('#cdesp').val(),
                               sign : $('#csign').val(),
                               amt : $('#camt').val()
                           };

                           console.log(naya);
                           console.log(prev);

                           $.post({
                               url : '/app/expenso/editpass',
                               data : {p : prev , n : naya},
                               success: function (data) {
                                   console.log(data);
                                   getPassbook();
                                   printPass();
                                   $('.change').css('left','1800px');
                                   save();

                               }
                           });



                       });





                   });


               }
           });
       }

       function f1(book) {

           printPassLoop(book);

           $('#pf-p').append('<button><i id="back" class="ion-android-arrow-back"></i> </button>');

           $('#back').click(function () {

               printPass();
           });

           $('.ic1').click(function () {
               var link = $(this).parent().parent();
               var x = link.parent()[0].cells[3];
               var query = $(x).html();
               var arr = [];
               for (var i = 0; i < book.length; i++) {
                   if (book[i].desp !== query) {
                       arr.push(book[i]);
                   }
               }
               console.log(query);

               $.post({
                   url: '/app/expenso/deletepass',
                   data: {up: query, user: window.name},
                   success: function (data) {
                       console.log(data);
                       getPassbook();
                       f1(arr);
                       save();

                   }
               });
           });

           $('.ic2').click(function () {
               $('.change').css('left','18px');
               var link = $(this).parent().parent();

               var x = $(link.parent()[0].cells[4]).html();
               var a="";
               for(var i=1; i<x.length-2; i++){
                   a += x.charAt(i);
               }
               console.log(a);

               var prev = {
                   date : $(link.parent()[0].cells[1]).html(),
                   bank : $(link.parent()[0].cells[2]).html(),
                   desp : $(link.parent()[0].cells[3]).html(),
                   sign : ($(link.parent()[0].cells[4]).html()).charAt(0),
                   amt : a

               };

               $('#camt').val(parseInt(prev.amt));
               $('#cbank').val(prev.bank);
               $('#cdesp').val(prev.desp);
               $('#csign').val(prev.sign);

               $('#change-bill').submit(function (e) {

                   e.preventDefault();


                   var naya = {
                       bank : $('#cbank').val(),
                       desp : $('#cdesp').val(),
                       sign : $('#csign').val(),
                       amt : $('#camt').val()
                   };

                   console.log(naya);
                   console.log(prev);

                   $.post({
                       url : '/app/expenso/editpass',
                       data : {p : prev , n : naya},
                       success: function (data) {
                           console.log(data);
                           getPassbook();
                           printPass();
                           $('.change').css('left','1800px');
                           save();

                       }
                   });



               });





           });





       }

       function printPassLoop(arr) {
           var no = 1;
           $('#pf-p').html('');


           for (var i = arr.length - 1; i >= 0; i--) {

               if (arr[i].sign === '+') {

                   $('#pf-p').append(
                       '<tr class="true">' +
                       '<td class="one"><div class="hide"><i class="ion-ios-trash ic1"></i>&nbsp;<i class="ion-edit ic2"></i> </div>' + no++ + '.</td>' +
                       '<td class="two">' + arr[i].date + '</td>' +
                       '<td class="three">' + arr[i].bank + '</td>' +
                       '<td class="four">' + arr[i].desp + '</td>' +
                       '<td class="five">' + arr[i].sign + arr[i].amt + '/-</td>' +
                       '</tr>'
                   );

               }

               else {
                   $('#pf-p').append(
                       '<tr class="false">' +
                       '<td class="one"><div class="hide"><i class="ion-ios-trash ic1"></i>&nbsp;<i class="ion-edit ic2"></i></div>' + no++ + '.</td>' +
                       '<td class="two">' + arr[i].date + '</td>' +
                       '<td class="three">' + arr[i].bank + '</td>' +
                       '<td class="four">' + arr[i].desp + '</td>' +
                       '<td class="five">' + arr[i].sign + arr[i].amt + '/-</td>' +
                       '</tr>'
                   );
               }


           }
       }


       function printPend() {
           $.get({
               url: '/app/expenso/get',
               data: {id: '3', user: window.name},
               success: function (data) {
                   console.log(data);
                   var pending = data[0].pending;
                   $('#pef-p').html('');
                   var no = 1;
                   for (var i = pending.length - 1; i >= 0; i--) {

                       $('#pef-p').append(
                           '<tr>' +
                           '<td class="one"><div class="hide"><i class="ion-ios-trash ic1"></i>&nbsp;<i class="ion-edit ic2"></i></div>' + no++ + '.</td>' +
                           '<td class="two">' + pending[i].desp + '</td>' +
                           '<td class="three">' + pending[i].amt + '/-</td>' +
                           '<td class="four">' + pending[i].d_date + '</td>' +
                           '</tr>'
                       );

                       $('.ic1').click(function () {
                           var link = $(this).parent().parent();
                           var x = link.parent()[0].cells[1];
                           var query = $(x).html();
                           console.log(query);

                           $.post({
                               url: '/app/expenso/deletepend',
                               data: {up: query, user: window.name},
                               success: function (data) {
                                   console.log(data);
                                   printPend();

                               }
                           });
                       });


                       $('.ic2').click(function () {
                           $('.change').css('left','18px');
                           var link = $(this).parent().parent();

                           var x = $(link.parent()[0].cells[2]).html();
                           var a="";
                           for(var i=0; i<x.length-2; i++){
                               a += x.charAt(i);
                           }


                           var prev = {
                               desp : $(link.parent()[0].cells[1]).html(),
                               ddate : $(link.parent()[0].cells[3]).html(),
                               amt : a


                           };

                           $('#camnt').val(parseInt(prev.amt));
                           $('#cper').val(prev.desp);
                           $('#cddate').val(prev.ddate);

                           $('#changep-bill').submit(function (e) {

                               e.preventDefault();


                               var naya = {
                                   desp : $('#cper').val(),
                                   ddate : $('#cddate').val(),
                                   amt : $('#camnt').val()
                               };

                               console.log(naya);
                               console.log(prev);

                               $.post({
                                   url : '/app/expenso/editpend',
                                   data : {p : prev , n : naya},
                                   success: function (data) {
                                       console.log(data);
                                       printPend();
                                       $('.change').css('left','1800px');

                                   }
                               });



                           });





                       });






                   }


               }
           });
       }

       $('#findf').click(function () {
           var f = $('#srchf').val();

           $.get({
               url: '/app/expenso/get',
               data: {id: "3", user: window.name},
               success: function (data) {
                   $('#srchf').val('');

                   var pending = data[0].pending;
                   var found = 1;
                   var pen = [];
                   for (var i = 0; i < pending.length; i++) {
                       if (pending[i].d_date === f) {
                           pen.push(pending[i]);
                           found = 0;
                       }
                       if (pending[i].desp === f) {
                           pen.push(pending[i]);
                           found = 0;
                       }
                       if (pending[i].amt === f) {
                           pen.push(pending[i]);
                           found = 0;
                       }
                   }
                   $('#pef-p').html('');
                   if (found === 1) {
                       $('#pef-p').append(
                           '<tr class="false">' +
                           '<td class="one"><button><i id="backf" class="ion-android-arrow-back"></i> </button></td>' +
                           '<td class="two">No Results Found</td>' +
                           '<td class="three">:(</td>' +
                           '<td class="four">:"(</td>' +
                           '</tr>'
                       );

                   }
                   else {
                       f2(pen);


                   }

                   $('#backf').click(function () {
                       printPend();

                   });


               }


           });


       });

       function f2(pen) {
           var no = 1;
           $('#pef-p').html('');
           for (var i = pen.length - 1; i >= 0; i--) {

               $('#pef-p').append(
                   '<tr>' +
                   '<td class="one"><div class="hide"><i class="ion-ios-trash ic1"></i>&nbsp;<i class="ion-edit ic2"></i> </div>' + no++ + '.</td>' +
                   '<td class="two">' + pen[i].desp + '</td>' +
                   '<td class="three">' + pen[i].amt + '/-</td>' +
                   '<td class="four">' + pen[i].d_date + '</td>' +
                   '</tr>'
               );

               $('#pef-p').append('<button><i id="backf" class="ion-android-arrow-back"></i> </button>');

               $('#backf').click(function () {

                   printPend();
               });

               $('.ic1').click(function () {
                   var link = $(this).parent().parent();
                   var x = link.parent()[0].cells[1];
                   var query = $(x).html();
                   console.log(query);
                   var arr = [];
                   for (var i = 0; i < pen.length; i++) {
                       if (pen[i].desp !== query) {
                           arr.push(pen[i]);
                       }
                   }
                   console.log(arr);

                   $.post({
                       url: '/app/expenso/deletepend',
                       data: {up: query, user : window.name},
                       success: function (data) {
                           console.log(data);
                           f2(arr);


                       }
                   });
               });

               $('.ic2').click(function () {
                   console.log('x');
                   $('.change').css('left','18px');
                   var link = $(this).parent().parent();

                   var x = $(link.parent()[0].cells[2]).html();
                   var a="";
                   for(var i=0; i<x.length-2; i++){
                       a += x.charAt(i);
                   }


                   var prev = {
                       desp : $(link.parent()[0].cells[1]).html(),
                       ddate : $(link.parent()[0].cells[3]).html(),
                       amt : a


                   };

                   $('#camnt').val(parseInt(prev.amt));
                   $('#cper').val(prev.desp);
                   $('#cddate').val(prev.ddate);

                   $('#changep-bill').submit(function (e) {

                       e.preventDefault();


                       var naya = {
                           desp : $('#cper').val(),
                           ddate : $('#cddate').val(),
                           amt : $('#camnt').val()
                       };

                       console.log(naya);
                       console.log(prev);

                       $.post({
                           url : '/app/expenso/editpend',
                           data : {p : prev , n : naya},
                           success: function (data) {
                               console.log(data);
                               printPend();
                               $('.change').css('left','1800px');

                           }
                       });



                   });





               });


           }
       }


       $('#logout').click(function () {
           window.name = "";
       });

       var b1=0 , b2=0;
       
       function save() {
           $.get({
               url: '/app/expenso/get',
               data : {id: '2', user : window.name},
               success: function (data) {

                   var s = data[0].passbook;

                   console.log(s);
                    b1 = 0; b2=0;
                   for(var i=0; i<s.length;i++) {
                       if(s[i].bank === 'Bank 1') {
                           if(s[i].sign === '+') {
                               b1 += parseInt(s[i].amt);
                           }
                           else {
                               b1 -= parseInt(s[i].amt);
                           }
                       }
                       else {

                           if(s[i].sign === '+') {
                               b2 += parseInt(s[i].amt);
                           }
                           else {
                               b2 -= parseInt(s[i].amt);
                           }

                       }
                   }

                   $('#b1').text(b1 + '/-');
                   $('#b2').text(b2 + '/-');

               }
           })
       }

       save();



        start();
       function start() {

           $.get({
               url: '/app/expenso/get',
               data: {id: "4", user: window.name},
               success: function (data) {
                   if(data.length !== 0) {
                   var path = data[0].picture;
                   $('.upload').html('<img src="/uploads/'+path+'">'); }
               }
           });

           $.get({
               url: '/app/expenso/name',
               data: {user :window.name},
               success: function (data) {
                   $('.proname').append('<h3>'+data+'</h3>');

               }
           });
       }


   }

});








