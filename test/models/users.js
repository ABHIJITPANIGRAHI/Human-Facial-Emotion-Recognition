var mongoose=require('mongoose');
var schema= new mongoose.schema({username:{type:'string',unique:true,required:true},password:{type:'string'},firstname:{type:'string' unique:true required:true},lastname:{type'string'},password:{type:'string'}});
var users =mongoose.model('users',schema);

module.exports=users;