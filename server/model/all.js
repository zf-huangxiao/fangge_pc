function tm(){
	return this;	
}
var db = require(config.path.base + 'db/mongodb.js');
var Fns = {
    createProject : function(evt,name) {
        db.findOne(function(r){
            if (r ) return evt(false);
            db.insert(
                evt ,
                'projects',
                {'name' : name, 'status': 0}
                 );
              } , 
           'projects',
            {'name' : name, 'status': 0}
           );
        },
    selectProjects : function(evt) {
        db.find(
            evt,
            'projects'
            );
        
        },
    userlist : function(evt){
        db.find(
            evt,
            'users'
        );
        },
    addMarks : function(evt,uid,projectid,progress , note ,state) {
        db.insert(
                evt,
                'daymark',
                {'uid' : uid, 'projectid' : projectid, 'state' : state ,'progress' : progress , 'note':note , 'createon' :new Date()}
             );
        
        },
    myMarks : function (evt,uid ,createon) {
        if ('string' == typeof uid) {
            uid = db.convertId(uid);
            }
        var query = {'uid' : uid  };
        if (createon) {
            query.createon = createon;
            }

        db.find(
            evt,
            'daymark',
            query ,
            {'sort' :'createon'}
            );
        },
	checkUname : function(evt ,uname , pwd){
        db.findOne ( 
             evt,
             'users' ,
             {name : uname,pwd : base.md5(pwd)}

             );


	} ,
    newUser : function(evt,uname , pwd){
        db.count(function(exits){
            if (exits) {
                evt(false);
             } else {
                db.insert(
                    evt ,
                    'users' ,
                    {name : uname,pwd : base.md5(pwd)}
                    );
                }
            } ,
            'users' , 
            {name:uname}
            );
     }

}

exports.__create = mModel.__create(tm , Fns);


