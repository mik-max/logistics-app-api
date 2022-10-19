export function pagination(module, query){
     const page = parseInt(query.page)|| 1;
          const limit = parseInt(query.limit)|| 5;
          const search = query.search|| '';
          let sort = query.sort|| 'rating';

          let startIndex =(page - 1) * limit
          let endIndex = page * limit
          let pageCount = Math.ceil(module.length / limit)          

          const results = {}
          results.result = module.slice(startIndex, endIndex)
          if(endIndex < module.length){
               results.next ={
                    page: page + 1 ,
                    limit: limit,
                    Pages: pageCount,
               }
          }
          if(startIndex > 0){
               results.previous = {
                    page: page - 1,
                    limit: limit,
               }
          }
         return results
}