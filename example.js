/*===========================================================================*\
  Rocket-store examples


\*===========================================================================*/

// Initialize
const rs = require('./rocket-store.js');



(async () => {

  // Change storage area from default ( <tempdir>/rsdb )
  const options = {
    data_storage_area : "./webapp",
    data_format       : rs._FORMAT_JSON,
  };
  await rs.options(options)

  console.log("POST a record:\n",
    await rs.post("cars", "Mercedes_Benz_GT_R", {owner: "Lisa Simpson"})
  );

  console.log("GET a record:\n",
    await rs.get("cars", "")
  );

  // Post 3 records
  rs.post("cars", "BMW_740li", { owner: "Greg Onslow" }, rs._ADD_AUTO_INC);
  rs.post("cars", "BMW_740li", { owner: "Sam Wise"    }, rs._ADD_AUTO_INC);
  rs.post("cars", "BMW_740li", { owner: "Bill Bo"     }, rs._ADD_AUTO_INC);

  console.log("Get all records:\n",
    await rs.get("cars", "*")
  );


  // Mass instert
  const dataset = {
      Gregs_BMW_740li           : { owner: "Greg Onslow"  },
      Lisas_Mercedes_Benz_GT_R  : { owner: "Lisa Simpson" },
      Bills_BMW_740li           : { owner: "Bill Bo"      },
  };

  var promises = [];
  var ii = 0;
  for(let i in dataset){
    ii++;
    promises[promises.length] = rs.post("cars", i, dataset[i]);
    if(ii >= 20){
      ii = 0;
      await Promise.all(promises);
    }
  }

  console.log("Get BMW's:\n",
    await rs.get("cars", "*BMW*")
  );


  console.log("Get list ordered by alphabetically decending keys:\n",
    await rs.get("cars", "", rs._ORDER_DESC)
  );


  console.log("Delete all Mercedes's:\n",
    await rs.delete("cars", "*Mercedes*")
  );
  console.log(
    await rs.get("cars", "*")
  );

  console.log(
    await rs.delete()
  );

})();
