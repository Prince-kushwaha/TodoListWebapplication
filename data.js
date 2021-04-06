
exports.getDate=getDate;


function getDate()
{
var d=new Date();
var x=d.toLocaleDateString('en-In');
return x;
}

exports.gettime=gettime;

function gettime()
{
    var d=new Date();
    var time=d.getTime();
    return time;

}