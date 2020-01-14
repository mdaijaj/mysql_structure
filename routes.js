module.exports=(router, connection)=>{

    var Request = require("request");
    var data_list;
    var row_data;
    var api_url="https://api.datayuge.com/v6/rechargeplans/?apikey=kp723NHeCdvJvtZE24jnCTiUjRVgSNtG"
    let data=[];
    Request.get(api_url, (error, response, body) => {
        if(error){
            return console.dir(error);
        }
        console.log("done")
        data_list=JSON.parse(body)
        all_data=data_list.data
        data=all_data;

    //    console.log(data)
        console.log(JSON.parse(body))
        
        for (var index of all_data){
           var element=index

            // insert into databases;
            connection.query("INSERT INTO `redis_table` (operator_id, circle_id, recharge_amount, recharge_validity, recharge_short_desc, recharge_long_desc, recharge_type, updated_at) VALUES ('"+element.operator_id + "', '" + element.circle_id + "', '" + element.recharge_amount + "', '" + element.recharge_validity + "', '" + element.recharge_short_desc + "', '"+element.recharge_long_desc +"', '"+element.recharge_type+"', '"+element.updated_at +"')", (err, result)=>{
                if(!err){
                    console.log("inserted into databases success!")
                }else{
                    console.log("error while insert into database")
                }
            })
        }
    });
    console.log(data)

    // InsertToDatabase=(dataW)=>{
    //     console.log("asdfasd",dataW);
    // }

    //  // insert into databases;
    //  connection.query("INSERT INTO `redis_table` (operator_id, circle_id, recharge_amount, recharge_validity, recharge_short_desc, recharge_long_desc, recharge_type, updated_at) VALUES ('"+element.operator_id + "', '" + element.circle_id + "', '" + element.recharge_amount + "', '" + element.recharge_validity + "', '" + element.recharge_short_desc + "', '"+element.recharge_long_desc +"', '"+element.recharge_type+"', '"+element.updated_at +"')", (err, result)=>{
    //     if(!err){
    //         console.log("inserted into databases success!")
    //     }else{
    //         console.log("error while insert into database")
    //     }
    // })


    
    // //routes
    // router.post('/add_data', (req, res)=>{
    //     console.log("asfdasfdafd",req.body);
    //     var operator_id=req.body.operator_id
    //     var circle_id= req.body.circle_id
    //     var recharge_amount= req.body.recharge_amount
    //     var recharge_validity= req.body.recharge_validity
    //     var recharge_short_desc= req.body.recharge_short_desc
    //     var recharge_long_desc= req.body.recharge_long_desc
    //     var recharge_type= req.recharge_type
    //     var updated_at= req.body.updated_at

    //     connection.query("INSERT INTO `redis_table` (operator_id, circle_id, recharge_amount, recharge_validity, recharge_short_desc, recharge_long_desc, recharge_type, updated_at) VALUES ('"+operator_id + "', '" + circle_id + "', '" + recharge_amount + "', '" + recharge_validity + "', '" + recharge_short_desc + "', '"+recharge_long_desc +"', '"+recharge_type+"', '"+updated_at +"')", (err, result)=>{
    //         if(!err){
    //             console.log("inserted data success");
    //             res.send(result)
    //         }else{
    //             console.log("error while inserting data", err)
    //         }
    //     })
    // })


    router.get('/all_data', (req,res)=>{
        connection.query('select * from redis_table', (err, result)=>{
            if(!err){
                console.log("get data")
                res.send(result)
                // res.send(result)
            }else{
                console.log("error while get data", err)
            }
        })
    })
}
