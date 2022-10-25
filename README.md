# Getting Started with Create React App

[TS Reference](https://github.com/AnanthaKannan/JAVASCRIPT-BASIC/blob/master/typescript.js)



## [Cypress](./CYPRESS.md)

## Lint
```
npm run lint
```

<!-- storage local -->
hospitalName
hospitalMailId
_hospitalId

## Reference
### Theme reference

https://themes.themesbrand.com/velzon/react/minimal/dashboard-analytics

## API
## Dev
https://d3hqswl3knbb85.cloudfront.net/
https://4kzj8450nb.execute-api.us-east-1.amazonaws.com/dev/patient

### Used to project the value
```
http://localhost:3000/doctor?project=id,isDeleted,name,logoUrl 
```

### To add the skip and limit
```
http://localhost:3000/doctor?project=id,isDeleted,name,logoUrl&skip=0&limit=10
```

### Used to sort the values
```
http://localhost:3000/doctor?sort=name:asc 
http://localhost:3000/doctor?sort=name:desc 
```

### conditons
```
'eq', 'ne', 'lt', 'gt', 'le', 'ge'
http://localhost:3000/dev/feedback?filter=id:eq:2,name:eq:AnanthaKannan
```

<!-- const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } }); -->
